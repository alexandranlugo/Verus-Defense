import { useState } from "react";
import { ZoomIn, ZoomOut, Crosshair, Layers, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Annotation {
  id: string;
  x: number;
  y: number;
  label: string;
  type: "target" | "poi" | "threat";
}

export const SatelliteDisplay = () => {
  const [zoom, setZoom] = useState(1);
  const [annotations] = useState<Annotation[]>([
    { id: "1", x: 45, y: 35, label: "TRANSLOADING FACILITY", type: "target" },
    { id: "2", x: 25, y: 60, label: "SECURITY CHECKPOINT", type: "poi" },
    { id: "3", x: 70, y: 20, label: "UNKNOWN VESSEL", type: "threat" },
  ]);

  const getAnnotationColor = (type: Annotation["type"]) => {
    switch (type) {
      case "target": return "border-threat-high bg-threat-high/20";
      case "poi": return "border-terminal-green bg-terminal-green/20";
      case "threat": return "border-warning bg-warning/20";
    }
  };

  return (
    <div className="flex h-full flex-col">
      <div className="flex items-center justify-between border-b border-foreground/20 p-3">
        <div>
          <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">
            SATELLITE IMAGERY
          </h3>
          <p className="text-xs font-mono text-foreground/60">
            KHORRAMSHAHR PORT - LIVE FEED
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}>
            <ZoomOut className="h-3 w-3" />
          </Button>
          <span className="text-xs font-mono text-foreground/60">
            {Math.round(zoom * 100)}%
          </span>
          <Button variant="outline" size="sm" onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
            <ZoomIn className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Layers className="h-3 w-3" />
          </Button>
          <Button variant="outline" size="sm">
            <Crosshair className="h-3 w-3" />
          </Button>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-background">
        <div 
          className="h-full w-full bg-gradient-to-br from-muted/20 to-muted/40"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center'
          }}
        >
          {/* Satellite imagery placeholder with overlay grid */}
          <div className="h-full w-full relative">
            <div 
              className="absolute inset-0 opacity-30"
              style={{
                backgroundImage: `
                  linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                  linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
                `,
                backgroundSize: '50px 50px'
              }}
            />
            
            {/* Annotations */}
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`absolute border-2 ${getAnnotationColor(annotation.type)}`}
                style={{
                  left: `${annotation.x}%`,
                  top: `${annotation.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '80px',
                }}
              >
                <div className="absolute -top-6 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className={`flex items-center gap-1 px-2 py-1 text-xs font-mono ${getAnnotationColor(annotation.type)}`}>
                    {annotation.type === "threat" && <AlertTriangle className="h-3 w-3" />}
                    <span className="uppercase">{annotation.label}</span>
                  </div>
                </div>
                
                {/* Crosshair center */}
                <div className="absolute left-1/2 top-1/2 h-4 w-4 -translate-x-1/2 -translate-y-1/2">
                  <div className="h-full w-0.5 bg-current opacity-60"></div>
                  <div className="absolute top-1/2 h-0.5 w-full -translate-y-1/2 bg-current opacity-60"></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Coordinates overlay */}
        <div className="absolute bottom-3 left-3 space-y-1">
          <div className="text-xs font-mono text-foreground/60">
            LAT: 30.4392°N
          </div>
          <div className="text-xs font-mono text-foreground/60">
            LON: 48.1619°E
          </div>
          <div className="text-xs font-mono text-foreground/60">
            ALT: 387M
          </div>
        </div>

        {/* Classification */}
        <div className="absolute top-3 right-3">
          <div className="bg-classification-secret px-2 py-1 text-xs font-mono font-bold text-white">
            SECRET//NOFORN
          </div>
        </div>
      </div>
    </div>
  );
};