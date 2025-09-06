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
      case "target": return "border-gotham-alert text-gotham-alert";
      case "poi": return "border-gotham-ok text-gotham-ok";
      case "threat": return "border-gotham-warn text-gotham-warn";
    }
  };

  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gotham-panel border-b bg-gotham-bg-2 p-3">
        <div>
          <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1">
            SATELLITE IMAGERY
          </h3>
          <p className="text-label font-mono text-gotham-text-2">
            KHORRAMSHAHR PORT - LIVE FEED
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <button className="gotham-button px-2 py-1" onClick={() => setZoom(Math.max(0.5, zoom - 0.25))}>
            <ZoomOut className="h-3 w-3" />
          </button>
          <span className="text-label font-mono text-gotham-text-2">
            {Math.round(zoom * 100)}%
          </span>
          <button className="gotham-button px-2 py-1" onClick={() => setZoom(Math.min(3, zoom + 0.25))}>
            <ZoomIn className="h-3 w-3" />
          </button>
          <button className="gotham-button px-2 py-1">
            <Layers className="h-3 w-3" />
          </button>
          <button className="gotham-button px-2 py-1">
            <Crosshair className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Coordinate ticks */}
      <div className="relative">
        <div className="absolute top-0 left-0 right-0 h-4 border-b border-gotham-line-1 flex justify-between items-center px-4 text-mono text-gotham-text-2 bg-gotham-bg-1">
          <span>0°</span><span>15°</span><span>30°</span><span>45°</span><span>60°</span>
        </div>
        <div className="absolute top-4 left-0 bottom-0 w-12 border-r border-gotham-line-1 flex flex-col justify-between items-center py-4 text-mono text-gotham-text-2 bg-gotham-bg-1">
          <span className="rotate-90 text-xs">60°</span>
          <span className="rotate-90 text-xs">30°</span>
          <span className="rotate-90 text-xs">0°</span>
        </div>
      </div>

      <div className="relative flex-1 overflow-hidden bg-gotham-bg-0">
        <div 
          className="h-full w-full bg-gradient-to-br from-gotham-bg-1/20 to-gotham-bg-2/40 map-grid-overlay"
          style={{ 
            transform: `scale(${zoom})`,
            transformOrigin: 'center center',
            marginTop: '16px',
            marginLeft: '48px'
          }}
        >
          {/* Satellite imagery placeholder */}
          <div className="h-full w-full relative">
            {/* Annotations */}
            {annotations.map((annotation) => (
              <div
                key={annotation.id}
                className={`absolute border-2 hover:shadow-[0_0_0_2px_hsl(var(--accent)/0.3)] transition-all duration-150 ${getAnnotationColor(annotation.type)}`}
                style={{
                  left: `${annotation.x}%`,
                  top: `${annotation.y}%`,
                  transform: 'translate(-50%, -50%)',
                  width: '120px',
                  height: '80px',
                }}
              >
                <div className="absolute -top-8 left-1/2 -translate-x-1/2 whitespace-nowrap">
                  <div className="intelligence-tag px-2 py-1 bg-gotham-bg-2 border border-gotham-line-2">
                    {annotation.type === "threat" && <AlertTriangle className="h-3 w-3 inline mr-1" />}
                    <span className="text-label font-mono uppercase">{annotation.label}</span>
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
          <div className="text-mono text-gotham-text-2">
            LAT: 30.4392°N
          </div>
          <div className="text-mono text-gotham-text-2">
            LON: 48.1619°E
          </div>
          <div className="text-mono text-gotham-text-2">
            ALT: 387M
          </div>
        </div>

        {/* Classification */}
        <div className="absolute top-3 right-3">
          <div className="classification-badge secret relative px-2 py-1">
            <span className="text-label font-mono font-medium text-gotham-text-1">
              SECRET//NOFORN
            </span>
          </div>
        </div>
      </div>

      {/* Timeline Bar */}
      <div className="h-14 gotham-panel border-t bg-gotham-bg-1 flex items-center px-4">
        <div className="flex-1 h-6 bg-gotham-bg-2 border border-gotham-line-1 relative">
          <div className="absolute left-1/4 top-0 bottom-0 w-0.5 bg-gotham-accent"></div>
          <div className="absolute left-1/2 top-0 bottom-0 w-1 bg-gotham-warn"></div>
          <div className="absolute left-3/4 top-0 bottom-0 w-0.5 bg-gotham-accent"></div>
          <div className="absolute inset-0 flex items-center justify-center text-mono text-gotham-text-2 text-xs">
            TIMELINE: 18:00 - 19:00 UTC
          </div>
        </div>
      </div>
    </div>
  );
};