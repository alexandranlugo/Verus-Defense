import { useState } from "react";
import { FileDropZone } from "./FileDropZone";
import { IntelligenceTagging } from "./IntelligenceTagging";
import { SatelliteDisplay } from "./SatelliteDisplay";
import { ClassificationPanel } from "./ClassificationPanel";
import { AnalysisFeed } from "./AnalysisFeed";
import { ThreatAssessment } from "./ThreatAssessment";
import { CryptographicIntegrity } from "./CryptographicIntegrity";
import { useToast } from "@/hooks/use-toast";
import { Shield, Terminal, Eye } from "lucide-react";
import { DroneVideo } from "./DroneVideo"; // <-- NEW

export const IntelligenceDashboard = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

  // NEW: which center view is active?
  const [centerView, setCenterView] = useState<"site" | "drone">("site");

  const handleFileUpload = (files: File[]) => {
    setUploadedFiles(files);
    toast({
      title: "Files received",
      description: `${files.length} file(s) queued for analysis.`,
    });
  };

  return (
    <div className="min-h-screen bg-gotham-bg-0 text-gotham-text-1">
      {/* Top Header */}
      <div className="gotham-panel border-b">
        <div className="flex items-center justify-between p-4">
          {/* Brand + System Name */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-gotham-accent" />
              <h1 className="text-section font-mono font-medium uppercase tracking-wider">
                VERUS DEFENSE AI
              </h1>
            </div>
            <div className="text-label font-mono text-gotham-text-2 uppercase">
              Intelligence Verification System
            </div>
          </div>

          {/* Status Pills */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-gotham-ok" />
              <span className="text-label font-mono text-gotham-ok">
                SCIF Authorized
              </span>
            </div>
            <div className="classification-badge secret relative px-3 py-1">
              <span className="text-label font-mono font-medium text-gotham-text-1">
                SECRET//NOFORN
              </span>
            </div>
          </div>
        </div>

        {/* NEW: Tab Bar */}
        <div className="flex items-center gap-2 border-t border-gotham-line-1 px-4 py-2">
          <button
            onClick={() => setCenterView("site")}
            role="tab"
            aria-selected={centerView === "site"}
            className={`px-3 py-1 text-label font-mono uppercase tracking-wider border ${
              centerView === "site"
                ? "bg-gotham-bg-2 border-gotham-line-2"
                : "bg-gotham-bg-0 border-transparent hover:border-gotham-line-1"
            }`}
          >
            Nuclear Site
          </button>
          <button
            onClick={() => setCenterView("drone")}
            role="tab"
            aria-selected={centerView === "drone"}
            className={`px-3 py-1 text-label font-mono uppercase tracking-wider border ${
              centerView === "drone"
                ? "bg-gotham-bg-2 border-gotham-line-2"
                : "bg-gotham-bg-0 border-transparent hover:border-gotham-line-1"
            }`}
          >
            Drone Video
          </button>
        </div>
      </div>

      {/* Main Layout */}
      <div className="mx-auto max-w-[1600px] p-4">
        <div className="grid grid-cols-12 gap-4">
          {/* Left Column */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            {/* Integrity / Hashing */}
            <div className="gotham-panel">
              <div className="flex items-center gap-2 border-b p-3">
                <Shield className="h-4 w-4 text-gotham-accent" />
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Cryptographic Integrity
                </h2>
              </div>
              <div className="p-3">
                <CryptographicIntegrity />
              </div>
            </div>

            {/* Upload */}
            <div className="gotham-panel">
              <div className="border-b p-3">
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Upload Evidence
                </h2>
              </div>
              <div className="p-3">
                <FileDropZone onFilesSelected={handleFileUpload} />
              </div>
            </div>

            {/* Tagging */}
            <div className="gotham-panel">
              <div className="border-b p-3">
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Intelligence Tagging
                </h2>
              </div>
              <div className="p-3">
                <IntelligenceTagging />
              </div>
            </div>

            {/* Classification */}
            <div className="gotham-panel">
              <div className="border-b p-3">
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Classification
                </h2>
              </div>
              <div className="p-3">
                <ClassificationPanel />
              </div>
            </div>
          </div>

          {/* Center Column (switches via tabs) */}
          <div className="col-span-12 lg:col-span-6">
            <div className="gotham-panel h-[720px]">
              {centerView === "site" ? <SatelliteDisplay /> : <DroneVideo />}
            </div>
          </div>

          {/* Right Column */}
          <div className="col-span-12 lg:col-span-3 flex flex-col gap-4">
            {/* Analysis Feed */}
            <div className="gotham-panel">
              <div className="border-b p-3">
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Analysis Feed
                </h2>
              </div>
              <div className="p-3">
                <AnalysisFeed />
              </div>
            </div>

            {/* Threat Assessment */}
            <div className="gotham-panel flex-1">
              <div className="border-b p-3">
                <h2 className="text-section font-mono uppercase tracking-wider">
                  Threat Assessment
                </h2>
              </div>
              <div className="p-3">
                <ThreatAssessment />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Status Bar */}
      <div className="gotham-panel border-t px-4 py-2">
        <div classNam

