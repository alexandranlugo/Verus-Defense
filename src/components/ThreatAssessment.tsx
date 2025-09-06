import { useState, useEffect } from "react";
import { Brain, Shield, AlertTriangle, TrendingUp, Database } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface ThreatMetric {
  label: string;
  value: number;
  trend: "up" | "down" | "stable";
  status: "critical" | "elevated" | "normal";
}

export const ThreatAssessment = () => {
  const [metrics, setMetrics] = useState<ThreatMetric[]>([
    { label: "THREAT LEVEL", value: 67, trend: "up", status: "elevated" },
    { label: "ANOMALY DETECTION", value: 82, trend: "up", status: "critical" },
    { label: "BEHAVIORAL PATTERN", value: 45, trend: "down", status: "normal" },
    { label: "SIGNAL INTELLIGENCE", value: 73, trend: "stable", status: "elevated" },
  ]);

  const [aiInsights] = useState([
    "High probability of covert operation based on vessel movement patterns",
    "Behavioral analysis indicates coordinated activity between 3+ entities",
    "Communication patterns suggest operational security protocols in use",
    "Temporal analysis shows activity spikes during off-peak hours"
  ]);

  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics(prev => prev.map(metric => ({
        ...metric,
        value: Math.max(0, Math.min(100, metric.value + (Math.random() - 0.5) * 10)),
        trend: Math.random() > 0.7 ? (Math.random() > 0.5 ? "up" : "down") : metric.trend
      })));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: ThreatMetric["status"]) => {
    switch (status) {
      case "critical": return "text-threat-high";
      case "elevated": return "text-warning";
      case "normal": return "text-terminal-green";
    }
  };

  const getProgressColor = (status: ThreatMetric["status"]) => {
    switch (status) {
      case "critical": return "bg-threat-high";
      case "elevated": return "bg-warning";
      case "normal": return "bg-terminal-green";
    }
  };

  const getTrendIcon = (trend: ThreatMetric["trend"]) => {
    switch (trend) {
      case "up": return "↗";
      case "down": return "↘";
      case "stable": return "→";
    }
  };

  return (
    <div className="h-full flex flex-col">
      <div className="border-b border-foreground/20 p-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-scanner-blue" />
          <h3 className="text-sm font-mono uppercase tracking-wider text-foreground">
            AI THREAT ASSESSMENT
          </h3>
        </div>
        <p className="text-xs font-mono text-foreground/60">
          CLEARSIGNAL AI - BEHAVIORAL ANALYSIS
        </p>
      </div>

      <div className="flex-1 p-3 space-y-6">
        {/* Threat Metrics */}
        <div className="space-y-3">
          <h4 className="text-xs font-mono uppercase text-foreground/80 border-b border-foreground/10 pb-1">
            THREAT METRICS
          </h4>
          
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-foreground/70">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-xs font-mono ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                  <span className="text-xs text-foreground/60">
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
              </div>
              <Progress 
                value={metric.value} 
                className="h-1 bg-muted"
                // Note: Progress component would need custom styling for colors
              />
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Database className="h-3 w-3 text-scanner-blue" />
            <h4 className="text-xs font-mono uppercase text-foreground/80 border-b border-foreground/10 pb-1 flex-1">
              AI BEHAVIORAL INSIGHTS
            </h4>
          </div>
          
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex gap-2">
                <div className="text-xs font-mono text-scanner-blue mt-0.5">•</div>
                <p className="text-xs font-mono text-foreground/80 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="border border-warning/30 bg-warning/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-3 w-3 text-warning" />
            <span className="text-xs font-mono text-warning uppercase">
              ASSESSMENT SUMMARY
            </span>
          </div>
          <p className="text-xs font-mono text-foreground/80 leading-relaxed">
            ELEVATED THREAT DETECTED: Coordinated suspicious activity with high confidence indicators. 
            Recommend immediate escalation to operations center.
          </p>
        </div>
      </div>

      <div className="border-t border-foreground/20 p-2">
        <div className="flex items-center justify-between text-xs font-mono text-foreground/60">
          <span>LAST UPDATE: {new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-scanner-blue rounded-full animate-pulse"></div>
            <span>AI ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};