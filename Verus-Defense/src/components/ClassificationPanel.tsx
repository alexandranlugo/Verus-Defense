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
      case "secret": return "text-gotham-text-2";
      case "classified": return "text-gotham-text-2";
      case "warning": return "text-gotham-warn";
      default: return "text-gotham-text-1";
    }
  };

  return (
    <div className="space-y-4">
      <div className="border-b border-gotham-line-1 pb-2">
        <div className="flex items-center gap-2">
          <Shield className="h-4 w-4 text-gotham-text-2" />
          <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1">
            CLASSIFICATION & METADATA
          </h3>
        </div>
      </div>

      <div className="space-y-3">
        {metadata.map((item, index) => (
          <div key={index} className="flex justify-between">
            <div className="text-label font-mono text-gotham-text-2 uppercase">
              {item.label}:
            </div>
            <div className={`text-label font-mono ${getValueColor(item.level)}`}>
              {item.value}
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gotham-line-1 pt-3">
        <div className="text-label font-mono text-gotham-text-2 uppercase mb-2">
          ACCESS CONTROL:
        </div>
        <div className="space-y-1">
          <div className="flex items-center gap-2 text-label font-mono">
            <User className="h-3 w-3 text-gotham-ok" />
            <span className="text-gotham-ok">ANALYST_CLEARANCE_L5</span>
          </div>
          <div className="flex items-center gap-2 text-label font-mono">
            <Database className="h-3 w-3 text-gotham-accent" />
            <span className="text-gotham-accent">INTEL_DATABASE_WRITE</span>
          </div>
          <div className="flex items-center gap-2 text-label font-mono">
            <Clock className="h-3 w-3 text-gotham-warn" />
            <span className="text-gotham-warn">SESSION_EXPIRES_14:35</span>
          </div>
        </div>
      </div>
    </div>
  );
};