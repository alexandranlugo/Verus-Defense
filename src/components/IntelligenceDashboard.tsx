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

export const IntelligenceDashboard = () => {
  const { toast } = useToast();
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);

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
      <div className="gotham-panel border-b overflow-x-hidden">
        <div className="flex items-center justify-between p-4 min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <Terminal className="h-6 w-6 text-gotham-accent flex-shrink-0" />
              <h1 className="text-section font-mono font-medium uppercase tracking-wider truncate">
                VERUSDEFENSE AI
              </h1>
            </div>
            <div className="text-label font-mono text-gotham-text-2 uppercase truncate min-w-0">
              INTELLIGENCE VERIFICATION SYSTEM
            </div>
          </div>
          
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <div className="flex items-center gap-2 min-w-0">
              <Eye className="h-4 w-4 text-gotham-ok flex-shrink-0" />
              <span className="text-label font-mono text-gotham-ok truncate">
                SCIF AUTHORIZED
              </span>
            </div>
            <div className="classification-badge secret relative px-3 py-1 flex-shrink-0">
              <span className="text-label font-mono font-medium text-gotham-text-1 break-words">
                SECRET//NOFORN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid h-[calc(100vh-73px)]" style={{gridTemplateColumns: '340px 1fr 360px'}}>
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

        {/* Center - Satellite Display */}
        <div className="bg-gotham-bg-0 relative">
          <SatelliteDisplay />
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

      {/* Bottom Status Bar */}
      <div className="gotham-panel border-t px-4 py-2 overflow-x-hidden">
        <div className="flex items-center justify-between text-[clamp(10px,0.9vw,12px)] font-mono min-w-0">
          <div className="flex items-center gap-4 min-w-0">
            <div className="flex items-center gap-2 min-w-0">
              <div className="h-2 w-2 bg-gotham-ok animate-pulse flex-shrink-0"></div>
              <span className="text-gotham-ok truncate">SYSTEM OPERATIONAL</span>
            </div>
            <div className="text-gotham-text-2 truncate min-w-0">
              UPTIME: 127:42:15
            </div>
            <div className="text-gotham-text-2 truncate min-w-0">
              FILES PROCESSED: {uploadedFiles.length}
            </div>
          </div>
          
          <div className="flex items-center gap-4 min-w-0 flex-shrink-0">
            <div className="text-gotham-text-2 break-words min-w-0">
              SESSION: ANALYST_001@SCIF_ALPHA
            </div>
            <div className="text-gotham-warn truncate">
              AUTO-LOGOUT: 14:35
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
