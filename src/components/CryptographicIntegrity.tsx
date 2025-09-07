import { useState } from "react";
import { RefreshCw, ExternalLink, Copy, Shield, Info } from "lucide-react";
import { Button } from "./ui/button";
import { useToast } from "@/hooks/use-toast";

export const CryptographicIntegrity = () => {
  const { toast } = useToast();
  const [status, setStatus] = useState<'verified' | 'mismatch' | 'pending' | 'no-anchor'>('verified');
  const [isVerifying, setIsVerifying] = useState(false);

  const handleRehashVerify = async () => {
    setIsVerifying(true);
    // Simulate verification process
    setTimeout(() => {
      setStatus(Math.random() > 0.8 ? 'mismatch' : 'verified');
      setIsVerifying(false);
      toast({
        title: "VERIFICATION COMPLETE",
        description: "File integrity check completed",
        duration: 3000,
      });
    }, 2000);
  };

  const handleCopyHash = () => {
    navigator.clipboard.writeText("24C7E8F3A92B1D4567890ABCDEF12345678901234567890ABCDEF1234567B9F1");
    toast({
      title: "HASH COPIED",
      description: "SHA-256 hash copied to clipboard",
      duration: 2000,
    });
  };

  const getStatusBadge = () => {
    switch (status) {
      case 'verified':
        return {
          text: "HASH MATCH — AUTHENTIC",
          class: "bg-gotham-ok/10 border-gotham-ok text-gotham-ok",
          line: "Anchor ALG-TX: 3F8…A91 • 17:32Z • Source: UAV-12A"
        };
      case 'mismatch':
        return {
          text: "HASH MISMATCH — DO NOT USE",
          class: "bg-gotham-alert/10 border-gotham-alert text-gotham-alert",
          line: "Local SHA-256 ≠ On-chain record • Quarantine recommended"
        };
      case 'pending':
        return {
          text: "ANCHORING…",
          class: "bg-gotham-accent/10 border-gotham-accent text-gotham-accent",
          line: "Awaiting ledger confirmation • Est. <60s"
        };
      case 'no-anchor':
        return {
          text: "NO LEDGER ANCHOR",
          class: "bg-gotham-warn/10 border-gotham-warn text-gotham-warn",
          line: "Run \"ANCHOR NOW\" to register hash + metadata"
        };
    }
  };

  const statusInfo = getStatusBadge();

  return (
    <div className="space-y-4 overflow-x-hidden">
      <div className="border-b border-gotham-line-1 pb-3">
        <div className="flex items-center gap-2 mb-1 min-w-0">
          <Shield className="h-4 w-4 text-gotham-text-2 flex-shrink-0" />
          <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1 truncate">
            CRYPTOGRAPHIC INTEGRITY
          </h3>
        </div>
        <div className="text-label font-mono text-gotham-text-2 uppercase truncate">
          SHA-256 • ALGORAND ANCHOR
        </div>
      </div>

      <div className="text-xs font-mono text-gotham-text-2 leading-relaxed line-clamp-2">
        At ingest, each file is SHA-256 hashed and anchored to Algorand; on access, it's re-hashed and checked against the ledger to confirm authenticity.
      </div>

      {/* Primary Controls */}
      <div className="space-y-3">
        <Button
          onClick={handleRehashVerify}
          disabled={isVerifying}
          className="w-full gotham-button text-label font-mono uppercase tracking-wider"
          variant="outline"
        >
          {isVerifying ? (
            <>
              <RefreshCw className="h-3 w-3 animate-spin" />
              VERIFYING...
            </>
          ) : (
            <>
              <RefreshCw className="h-3 w-3" />
              RE-HASH & VERIFY
            </>
          )}
        </Button>

        <div className="flex items-center justify-between min-w-0">
          <button className="gotham-ghost-link text-label font-mono uppercase tracking-wider truncate">
            <ExternalLink className="h-3 w-3 flex-shrink-0" />
            VIEW LEDGER
          </button>
          <button 
            onClick={handleCopyHash}
            className="gotham-ghost-icon p-1 flex-shrink-0"
            title="Copy Hash"
          >
            <Copy className="h-3 w-3" />
          </button>
        </div>
      </div>

      {/* Status Badge */}
      <div className="space-y-2 min-w-0">
        <div className={`px-3 py-1 border text-xs font-mono uppercase tracking-wider ${statusInfo.class} truncate`}>
          {statusInfo.text}
        </div>
        <div className="text-xs font-mono text-gotham-text-2 line-clamp-2">
          {statusInfo.line}
        </div>
      </div>

      {/* Metadata */}
      <div className="border-t border-gotham-line-1 pt-3 space-y-2 overflow-x-hidden">
        <div className="space-y-2 text-xs font-mono">
          <div className="flex justify-between min-w-0">
            <div className="text-gotham-text-2 flex-shrink-0">Hash:</div>
            <div className="text-gotham-text-1 truncate break-all min-w-0 text-right">24C7…B9F1</div>
          </div>
          
          <div className="flex justify-between min-w-0">
            <div className="text-gotham-text-2 flex-shrink-0">Anchored:</div>
            <div className="text-gotham-text-1 truncate min-w-0 text-right">2025-09-06 17:32Z</div>
          </div>
          
          <div className="flex justify-between min-w-0">
            <div className="text-gotham-text-2 flex-shrink-0">Source:</div>
            <div className="text-gotham-text-1 truncate break-words min-w-0 text-right">UAV-12A</div>
          </div>
          
          <div className="flex justify-between min-w-0">
            <div className="text-gotham-text-2 flex-shrink-0">Uploader:</div>
            <div className="text-gotham-text-1 truncate break-words min-w-0 text-right">CLR-091</div>
          </div>
        </div>
      </div>

      {/* Help Tooltip */}
      <div className="border-t border-gotham-line-1 pt-3">
        <div className="flex items-start gap-2 min-w-0">
          <Info className="h-3 w-3 text-gotham-text-2 mt-0.5 flex-shrink-0" />
          <div className="text-xs font-mono text-gotham-text-2 leading-relaxed line-clamp-2 min-w-0">
            Digital fingerprint = SHA-256 digest. Any bit change ⇒ different hash.<br/>
            Anchor includes: hash, timestamp (UTC), source ID, uploader.
          </div>
        </div>
      </div>
    </div>
  );
};