import { useState } from "react";
import { FileDropZone } from "./FileDropZone";
import { IntelligenceTagging } from "./IntelligenceTagging";
import { SatelliteDisplay } from "./SatelliteDisplay";
import { ClassificationPanel } from "./ClassificationPanel";
import { AnalysisFeed } from "./AnalysisFeed";
import { ThreatAssessment } from "./ThreatAssessment";
import { CryptographicIntegrity } from "./CryptographicIntegrity";
import { useToast } from "@/hooks/use-toast";
import { Terminal, Eye } from "lucide-react";
import { DroneVideo } from "./DroneVideo"; // NEW

export const IntelligenceDashboard = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // NEW: which center view is active? "site" (default) or "drone"
  const [centerView, setCenterView] = useState<"site" | "drone">("site");

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(prev => [...prev, ...files]);
    toast({
      title: "FILES PROCESSED",
      description: `${files.length} file(s) added to analysis queue`,
      duration: 3000,
    });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="gotham-panel border-b">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-gotham-accent" />
              <h1 className="text-section font-mono font-medium uppercase tracking-wider">
                Verus Defense AI
              </h1>
            </div>
            <div className="text-label font-mono text-gotham-text-2 uppercase">
              INTELLIGENCE VERIFICATION SYSTEM
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gotham-ok" />
              <span className="text-label font-mono text-gotham-ok">
                SCIF AUTHORIZED
              </span>
            </div>
            <div className="classification-badge secret relative px-3 py-1">
              <span className="text-label font-mono font-medium text-gotham-text-1">
                SECRET//NOFORN
              </span>
            </div>
          </div>
        </div>

        {/* NEW: Tab bar under header */}
        <div
          className="flex items-center gap-2 border-t border-gotham-line-1 px-4 py-2"
          role="tablist"
          aria-label="Primary Views"
        >
          <button
            onClick={() => setCenterView("site")}
            className={`px-3 py-1 text-label font-mono uppercase tracking-wider border ${
              centerView === "site"
                ? "bg-gotham-bg-2 border-gotham-line-2"
                : "bg-gotham-bg-0 border-transparent hover:border-gotham-line-1"
            }`}
            aria-selected={centerView === "site"}
            aria-controls="nuke-panel"
            id="nuke-tab"
            role="tab"
          >
            Nuclear Site
          </button>

          <button
            onClick={() => setCenterView("drone")}
            className={`px-3 py-1 text-label font-mono uppercase tracking-wider border ${
              centerView === "drone"
                ? "bg-gotham-bg-2 border-gotham-line-2"
                : "bg-gotham-bg-0 border-transparent hover:border-gotham-line-1"
            }`}
            aria-selected={centerView === "drone"}
            aria-controls="drone-panel"
            id="drone-tab"
            role="tab"
          >
            Drone Video
          </button>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div
        className="grid h-[calc(100vh-73px)]"
        style={{ gridTemplateColumns: "340px 1fr 360px" }}
      >
        {/* Left Sidebar - Intelligence Tools */}
        <div className="gotham-panel border-r">
          <div className="h-full flex flex-col">
            {/* Cryptographic Integrity */}
            <div className="border-b border-gotham-line-1 p-4">
              <CryptographicIntegrity />
            </div>

            {/* File Upload */}
            <div className="border-b border-gotham-line-1 p-4">
              <FileDropZone onFileUpload={handleFileUpload} />
            </div>

            {/* Intelligence Tagging */}
            <div className="border-b border-gotham-line-1 p-4 flex-1">
              <IntelligenceTagging />
            </div>

            {/* Classification Panel */}
            <div className="p-4">
              <ClassificationPanel />
            </div>
          </div>
        </div>

        {/* Center - Satellite Display or Drone */}
        <div className="bg-gotham-bg-0 relative">
          {centerView === "site" ? (
            <section
              role="tabpanel"
              id="nuke-panel"
              aria-labelledby="nuke-tab"
              className="h-full"
            >
              <SatelliteDisplay />
            </section>
          ) : (
            <section
              role="tabpanel"
              id="drone-panel"
              aria-labelledby="drone-tab"
              className="h-full"
            >
              <DroneVideo />
            </section>
          )}
        </div>

        {/* Right Sidebar - Analysis & Assessment */}
        <div className="gotham-panel border-l">
          <div className="h-full flex flex-col">
            {/* Analysis Feed */}
            <div className="flex-1 border-b border-gotham-line-1">
              <AnalysisFeed />
            </div>

            {/* Threat Assessment */}
            <div className="flex-1">
              <ThreatAssessment />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
