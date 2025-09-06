import { useState } from "react";
import { FileDropZone } from "./FileDropZone";
import { IntelligenceTagging } from "./IntelligenceTagging";
import { SatelliteDisplay } from "./SatelliteDisplay";
import { ClassificationPanel } from "./ClassificationPanel";
import { AnalysisFeed } from "./AnalysisFeed";
import { ThreatAssessment } from "./ThreatAssessment";
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
      <div className="border-b border-foreground/20 bg-card">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Terminal className="h-6 w-6 text-scanner-blue" />
              <h1 className="text-lg font-mono font-bold uppercase tracking-wider">
                CLEARSIGNAL AI
              </h1>
            </div>
            <div className="text-xs font-mono text-foreground/60 uppercase">
              INTELLIGENCE VERIFICATION SYSTEM
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Eye className="h-4 w-4 text-terminal-green" />
              <span className="text-xs font-mono text-terminal-green">
                SCIF AUTHORIZED
              </span>
            </div>
            <div className="bg-classification-secret px-3 py-1">
              <span className="text-xs font-mono font-bold text-white">
                SECRET//NOFORN
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Main Dashboard Grid */}
      <div className="grid grid-cols-12 gap-1 h-[calc(100vh-73px)]">
        {/* Left Sidebar - Intelligence Tools */}
        <div className="col-span-3 border-r border-foreground/20 bg-card">
          <div className="h-full flex flex-col">
            {/* File Upload */}
            <div className="border-b border-foreground/20 p-4">
              <FileDropZone onFileUpload={handleFileUpload} />
            </div>
            
            {/* Intelligence Tagging */}
            <div className="border-b border-foreground/20 p-4 flex-1">
              <IntelligenceTagging />
            </div>
            
            {/* Classification Panel */}
            <div className="p-4">
              <ClassificationPanel />
            </div>
          </div>
        </div>

        {/* Center - Satellite Display */}
        <div className="col-span-6 bg-background">
          <SatelliteDisplay />
        </div>

        {/* Right Sidebar - Analysis & Assessment */}
        <div className="col-span-3 border-l border-foreground/20 bg-card">
          <div className="h-full flex flex-col">
            {/* Analysis Feed */}
            <div className="flex-1 border-b border-foreground/20">
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
      <div className="border-t border-foreground/20 bg-card px-4 py-2">
        <div className="flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="h-2 w-2 bg-terminal-green rounded-full animate-pulse"></div>
              <span className="text-terminal-green">SYSTEM OPERATIONAL</span>
            </div>
            <div className="text-foreground/60">
              UPTIME: 127:42:15
            </div>
            <div className="text-foreground/60">
              FILES PROCESSED: {uploadedFiles.length}
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <div className="text-foreground/60">
              SESSION: ANALYST_001@SCIF_ALPHA
            </div>
            <div className="text-warning">
              AUTO-LOGOUT: 14:35
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};