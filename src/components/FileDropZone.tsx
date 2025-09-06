import { useState } from "react";
import { Upload, File, AlertTriangle } from "lucide-react";

interface FileDropZoneProps {
  onFileUpload: (files: File[]) => void;
}

export const FileDropZone = ({ onFileUpload }: FileDropZoneProps) => {
  const [isDragOver, setIsDragOver] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = Array.from(e.dataTransfer.files);
    onFileUpload(files);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const files = Array.from(e.target.files);
      onFileUpload(files);
    }
  };

  return (
    <div className="h-64 w-full border border-foreground/20 bg-background">
      <div
        className={`h-full w-full border-2 border-dashed transition-colors ${
          isDragOver
            ? "border-terminal-green bg-terminal-green/5"
            : "border-foreground/30"
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div className="flex h-full flex-col items-center justify-center gap-4 px-6 text-center">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-4 w-4 text-warning" />
            <span className="text-xs font-mono text-warning uppercase tracking-wider">
              CLASSIFIED MATERIAL UPLOAD
            </span>
          </div>
          
          <Upload className="h-12 w-12 text-foreground/60" />
          
          <div className="space-y-2">
            <p className="text-sm font-mono text-foreground/80">
              DROP FILES FOR ANALYSIS
            </p>
            <p className="text-xs font-mono text-foreground/60">
              SUPPORTED: IMG, PDF, DOC, VIDEO
            </p>
          </div>

          <input
            type="file"
            multiple
            onChange={handleFileSelect}
            className="sr-only"
            id="file-upload"
            accept=".jpg,.jpeg,.png,.pdf,.doc,.docx,.mp4,.mov"
          />
          <label
            htmlFor="file-upload"
            className="cursor-pointer border border-foreground/30 bg-accent px-4 py-2 text-xs font-mono uppercase tracking-wider text-accent-foreground hover:bg-accent/80"
          >
            SELECT FILES
          </label>
        </div>
      </div>
    </div>
  );
};