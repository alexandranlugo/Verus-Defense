import dataclasses
import importlib
import inspect
import logging
import subprocess
import sys
from collections.abc import Callable
from pathlib import Path
from shutil import rmtree

from algokit_utils.config import config
from dotenv import load_dotenv

# Configure AlgoKit and logging
config.configure(debug=True, trace_all=False)
logging.basicConfig(level=logging.DEBUG, format="%(asctime)s %(levelname)-10s: %(message)s")
logger = logging.getLogger(__name__)
logger.info("Loading .env")
load_dotenv()

root_path = Path(__file__).parent

# ----------------------- Contract Discovery ----------------------- #

@dataclasses.dataclass
class SmartContract:
    path: Path
    name: str
    deploy: Callable[[], None] | None = None

def import_contract(folder: Path) -> Path:
    contract_path = folder / "contract.py"
    if not contract_path.exists():
        raise FileNotFoundError(f"Contract not found in {folder}")
    return contract_path

def import_deploy_if_exists(folder: Path) -> Callable[[], None] | None:
    try:
        module_name = f"{folder.parent.name}.{folder.name}.deploy_config"
        deploy_module = importlib.import_module(module_name)
        return getattr(deploy_module, "deploy")
    except Exception:
        return None

def has_contract_file(directory: Path) -> bool:
    return (directory / "contract.py").exists()

contracts: list[SmartContract] = [
    SmartContract(
        path=import_contract(folder),
        name=folder.name,
        deploy=import_deploy_if_exists(folder),
    )
    for folder in root_path.iterdir()
    if folder.is_dir() and has_contract_file(folder) and not folder.name.startswith("_")
]

# -------------------------- Build -------------------------- #

deployment_extension = "py"

def _get_output_path(output_dir: Path, deployment_extension: str) -> Path:
    return output_dir / Path(
        "{contract_name}" + ("_client" if deployment_extension == "py" else "Client") + f".{deployment_extension}"
    )

def build(output_dir: Path, contract_path: Path) -> Path:
    output_dir = output_dir.resolve()
    if output_dir.exists():
        rmtree(output_dir)
    output_dir.mkdir(exist_ok=True, parents=True)
    logger.info(f"Exporting {contract_path} to {output_dir}")

    build_result = subprocess.run(
        [
            "algokit", "--no-color", "compile", "python",
            str(contract_path.resolve()),
            f"--out-dir={output_dir}",
            "--no-output-arc32",
            "--output-arc56",
            "--output-source-map",
        ],
        stdout=subprocess.PIPE,
        stderr=subprocess.STDOUT,
        text=True,
    )
    if build_result.returncode:
        raise RuntimeError(f"Could not build contract:\n{build_result.stdout}")

    app_spec_file_names = [file.name for file in output_dir.glob("*.arc56.json")]
    client_file: str | None = None

    if not app_spec_file_names:
        logger.warning("No '*.arc56.json' file found; skipping client generation.")
    else:
        for file_name in app_spec_file_names:
            client_file = file_name
            generate_result = subprocess.run(
                [
                    "algokit", "generate", "client",
                    str(output_dir),
                    "--output",
                    str(_get_output_path(output_dir, deployment_extension)),
                ],
                stdout=subprocess.PIPE,
                stderr=subprocess.STDOUT,
                text=True,
            )
            if generate_result.returncode:
                if "No such command" in generate_result.stdout:
                    raise RuntimeError("AlgoKit >= 2.0.0 required for client generation. Please update AlgoKit.")
                raise RuntimeError(f"Could not generate typed client:\n{generate_result.stdout}")

    if client_file:
        return output_dir / client_file
    return output_dir

# -------------------------- Default Deploy -------------------------- #

def default_deploy(artifact_dir: Path, contract_name: str) -> None:
    """
    Try to dynamically import the generated typed client and deploy the app.
    Priority: .deploy() -> .create()
    """
    # Locate generated client file (e.g., artifacts/<name>/<name>_client.py)
    candidate_clients = list(artifact_dir.glob("*_client.py")) + list(artifact_dir.glob("*Client.py"))
    if not candidate_clients:
        raise FileNotFoundError(f"No generated client found in {artifact_dir}. Did build succeed?")

    # Import the first matching client module
    client_path = candidate_clients[0]
    spec_name = f"artifact_{contract_name}_client"
    import importlib.util
    spec = importlib.util.spec_from_file_location(spec_name, client_path)
    if spec is None or spec.loader is None:
        raise ImportError(f"Unable to load client module from {client_path}")
    module = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(module)  # type: ignore[attr-defined]

    # Find a class ending with 'Client'
    client_cls = None
    for _, cls in inspect.getmembers(module, inspect.isclass):
        if cls.__module__ == module.__name__ and cls.__name__.endswith("Client"):
            client_cls = cls
            break
    if client_cls is None:
        raise RuntimeError(f"No client class found in {client_path}")

    # Instantiate with sensible defaults; adjust kwargs if your client expects more
    try:
        client = client_cls()
    except TypeError:
        # If constructor requires kwargs, try a no-arg factory if present
        if hasattr(client_cls, "from_env"):
            client = client_cls.from_env()  # type: ignore[attr-defined]
        else:
            raise

    # Deploy using available API
    if hasattr(client, "deploy"):
        logger.info(f"Deploying {contract_name} via typed client .deploy()")
        client.deploy()  # type: ignore[attr-defined]
    elif hasattr(client, "create"):
        logger.info(f"Creating {contract_name} via typed client .create()")
        client.create()  # type: ignore[attr-defined]
    else:
        raise RuntimeError("Typed client has neither .deploy() nor .create(). Provide a deploy_config.py.")

# --------------------------- Main --------------------------- #

def main(action: str, contract_name: str | None = None) -> None:
    artifact_path = root_path / "artifacts"
    filtered_contracts = [
        c for c in contracts
        if contract_name is None or c.name == contract_name
    ]
    if not filtered_contracts:
        raise SystemExit(f"No contracts found matching '{contract_name}'")

    if action == "build":
        for c in filtered_contracts:
            logger.info(f"Building app at {c.path}")
            build(artifact_path / c.name, c.path)
    elif action == "deploy":
        for c in filtered_contracts:
            out_dir = artifact_path / c.name
            if not any(out_dir.glob("*.arc56.json")):
                raise RuntimeError(f"Could not deploy {c.name}; .arc56.json not found. Run 'build' first.")
            if c.deploy:
                logger.info(f"Deploying app {c.name} via deploy_config")
                c.deploy()
            else:
                default_deploy(out_dir, c.name)
    elif action == "all":
        for c in filtered_contracts:
            logger.info(f"Building app at {c.path}")
            out_dir = build(artifact_path / c.name, c.path)
            if c.deploy:
                logger.info(f"Deploying {c.name} via deploy_config")
                c.deploy()
            else:
                default_deploy(artifact_path / c.name, c.name)
    else:
        raise SystemExit(f"Unknown action: {action}")

if __name__ == "__main__":
    if len(sys.argv) > 2:
        main(sys.argv[1], sys.argv[2])
    elif len(sys.argv) > 1:
        main(sys.argv[1])
    else:
        main("all")