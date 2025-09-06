import { useState, useEffect } from "react";
import { AlertTriangle, CheckCircle, Clock, TrendingUp } from "lucide-react";

interface FeedItem {
  id: string;
  timestamp: string;
  type: "alert" | "analysis" | "update" | "threat";
  message: string;
  source: string;
  priority: "high" | "medium" | "low";
}

export const AnalysisFeed = () => {
  const [feedItems, setFeedItems] = useState<FeedItem[]>([
    {
      id: "1",
      timestamp: "18:23:42",
      type: "threat",
      message: "VESSEL MOVEMENT PATTERN ANOMALY DETECTED",
      source: "AI-BEHAVIORAL",
      priority: "high"
    },
    {
      id: "2", 
      timestamp: "18:22:15",
      type: "analysis",
      message: "CARGO MANIFEST ANALYSIS COMPLETE - 94% CONFIDENCE",
      source: "DOCUMENT-AI",
      priority: "medium"
    },
    {
      id: "3",
      timestamp: "18:21:33",
      type: "update",
      message: "SATELLITE FEED SYNCHRONIZED WITH GROUND INTEL",
      source: "KEYHOLE-12",
      priority: "low"
    },
    {
      id: "4",
      timestamp: "18:20:58",
      type: "alert",
      message: "NEW FACIAL RECOGNITION MATCH: 89% CONFIDENCE",
      source: "BIOMETRIC-AI",
      priority: "high"
    }
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      const newItem: FeedItem = {
        id: Date.now().toString(),
        timestamp: new Date().toLocaleTimeString('en-US', { hour12: false }),
        type: Math.random() > 0.7 ? "threat" : "analysis",
        message: "REAL-TIME PATTERN ANALYSIS UPDATED",
        source: "CLEARsignal-AI",
        priority: Math.random() > 0.5 ? "medium" : "low"
      };
      
      setFeedItems(prev => [newItem, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: FeedItem["type"]) => {
    switch (type) {
      case "threat": return <AlertTriangle className="h-3 w-3 text-threat-high" />;
      case "analysis": return <TrendingUp className="h-3 w-3 text-scanner-blue" />;
      case "update": return <CheckCircle className="h-3 w-3 text-terminal-green" />;
      case "alert": return <AlertTriangle className="h-3 w-3 text-warning" />;
    }
  };

  const getPriorityColor = (priority: FeedItem["priority"]) => {
    switch (priority) {
      case "high": return "border-l-threat-high";
      case "medium": return "border-l-warning";
      case "low": return "border-l-terminal-green";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-foreground/20 p-3">
        <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">
          REAL-TIME ANALYSIS FEED
        </h3>
        <p className="text-xs font-mono text-foreground/60">
          LIVE INTELLIGENCE PROCESSING
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-2">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className={`border-l-2 ${getPriorityColor(item.priority)} bg-card/50 p-2 space-y-1`}
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {getIcon(item.type)}
                <span className="text-xs font-mono text-foreground/60">
                  {item.timestamp}
                </span>
              </div>
              <span className="text-xs font-mono text-foreground/40">
                {item.source}
              </span>
            </div>
            
            <p className="text-xs font-mono text-foreground leading-relaxed">
              {item.message}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-foreground/20 p-2">
        <div className="flex items-center gap-2 text-xs font-mono text-foreground/60">
          <div className="h-2 w-2 bg-terminal-green rounded-full animate-pulse"></div>
          <span>LIVE MONITORING ACTIVE</span>
        </div>
      </div>
    </div>
  );
};