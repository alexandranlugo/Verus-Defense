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
        source: "VerusDefense-AI",
        priority: Math.random() > 0.5 ? "medium" : "low"
      };
      
      setFeedItems(prev => [newItem, ...prev.slice(0, 9)]);
    }, 8000);

    return () => clearInterval(interval);
  }, []);

  const getIcon = (type: FeedItem["type"]) => {
    switch (type) {
      case "threat": return <AlertTriangle className="h-3 w-3 text-gotham-alert" />;
      case "analysis": return <TrendingUp className="h-3 w-3 text-gotham-accent" />;
      case "update": return <CheckCircle className="h-3 w-3 text-gotham-ok" />;
      case "alert": return <AlertTriangle className="h-3 w-3 text-gotham-warn" />;
    }
  };

  const getPriorityColor = (priority: FeedItem["priority"]) => {
    switch (priority) {
      case "high": return "feed-item-severity-high";
      case "medium": return "feed-item-severity-medium";
      case "low": return "feed-item-severity-low";
    }
  };

  return (
    <div className="h-full flex flex-col overflow-x-hidden">
      <div className="border-b border-gotham-line-1 p-3">
        <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1 truncate">
          REAL-TIME ANALYSIS FEED
        </h3>
        <p className="text-label font-mono text-gotham-text-2 truncate">
          LIVE INTELLIGENCE PROCESSING
        </p>
      </div>

      <div className="flex-1 overflow-y-auto p-3 space-y-1">
        {feedItems.map((item) => (
          <div
            key={item.id}
            className={`feed-item ${getPriorityColor(item.priority)} p-2 space-y-1 min-w-0`}
          >
            <div className="flex items-center justify-between min-w-0">
              <div className="flex items-center gap-2 min-w-0">
                {getIcon(item.type)}
                <span className="text-mono text-gotham-text-2 truncate">
                  {item.timestamp}
                </span>
              </div>
              <span className="text-mono text-gotham-text-2 text-right truncate flex-shrink-0 break-words">
                {item.source}
              </span>
            </div>
            
            <p className="text-feed font-mono text-gotham-text-1 leading-relaxed line-clamp-2 min-w-0">
              {item.message}
            </p>
          </div>
        ))}
      </div>

      <div className="border-t border-gotham-line-1 p-2">
        <div className="flex items-center gap-2 text-label font-mono text-gotham-text-2">
          <div className="h-2 w-2 bg-gotham-ok animate-pulse"></div>
          <span>LIVE MONITORING ACTIVE</span>
        </div>
      </div>
    </div>
  );
};
