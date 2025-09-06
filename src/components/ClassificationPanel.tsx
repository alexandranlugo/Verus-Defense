import { Shield, Clock, User, Database } from "lucide-react";

export const ClassificationPanel = () => {
  const metadata = [
    { label: "CLASSIFICATION", value: "SECRET//NOFORN", level: "secret" },
    { label: "ORIGINATOR", value: "NSA/CSS", level: "normal" },
    { label: "CREATED", value: "2024-01-15 17:55:15Z", level: "normal" },
    { label: "MODIFIED", value: "2024-01-15 18:23:42Z", level: "normal" },
    { label: "SOURCE", value: "KEYHOLE-12", level: "classified" },
    { label: "RELIABILITY", value: "A1 - CONFIRMED", level: "normal" },
    { label: "HANDLING", value: "ORCON/NOCONTRACT", level: "warning" },
  ];

  const getValueColor = (level: string) => {
    switch (level) {
      case "secret": return "text-classification-secret";
      case "classified": return "text-classification-classified";
      case "warning": return "text-warning";
      default: return "text-foreground";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-foreground/20 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-classification-secret" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">
            CLASSIFICATION & METADATA
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {metadata.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-xs font-mono text-foreground/60 uppercase">
              {item.label}:
            </div>
            <div className={`text-xs font-mono ${getValueColor(item.level)}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-foreground/20 pt-3">
        <div className="text-xs font-mono text-foreground/60 uppercase mb-2">
          ACCESS CONTROL:
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-xs font-mono">
            <User className="h-3 w-3 text-terminal-green" />
            <span className="text-terminal-green">ANALYST_CLEARANCE_L5</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Database className="h-3 w-3 text-scanner-blue" />
            <span className="text-scanner-blue">INTEL_DATABASE_WRITE</span>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono">
            <Clock className="h-3 w-3 text-warning" />
            <span className="text-warning">SESSION_EXPIRES_14:35</span>
          </div>
        </div>
      </div>
    </div>
  );
};