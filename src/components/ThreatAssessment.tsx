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
      case "critical": return "text-gotham-alert";
      case "elevated": return "text-gotham-warn";
      case "normal": return "text-gotham-ok";
    }
  };

  const getProgressColor = (status: ThreatMetric["status"]) => {
    switch (status) {
      case "critical": return "bg-gotham-alert";
      case "elevated": return "bg-gotham-warn";
      case "normal": return "bg-gotham-ok";
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
      <div className="border-b border-gotham-line-1 p-3">
        <div className="flex items-center gap-2">
          <Brain className="h-4 w-4 text-gotham-accent" />
          <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1">
            AI THREAT ASSESSMENT
          </h3>
        </div>
        <p className="text-label font-mono text-gotham-text-2">
          CLEARSIGNAL AI - BEHAVIORAL ANALYSIS
        </p>
      </div>

      <div className="flex-1 p-3 space-y-6">
        {/* Threat Metrics */}
        <div className="space-y-3">
          <h4 className="text-label font-mono uppercase text-gotham-text-1 border-b border-gotham-line-1 pb-1">
            THREAT METRICS
          </h4>
          
          {metrics.map((metric, index) => (
            <div key={index} className="space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-label font-mono text-gotham-text-2">
                  {metric.label}
                </span>
                <div className="flex items-center gap-2">
                  <span className={`text-label font-mono ${getStatusColor(metric.status)}`}>
                    {metric.value}%
                  </span>
                  <span className="text-label text-gotham-text-2">
                    {getTrendIcon(metric.trend)}
                  </span>
                </div>
              </div>
              <div className="h-1 bg-gotham-bg-2 border border-gotham-line-1">
                <div 
                  className={`h-full transition-all duration-300 ${getProgressColor(metric.status)}`}
                  style={{ width: `${metric.value}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        {/* AI Insights */}
        <div className="space-y-3">
          <div className="flex items-center gap-2">
            <Database className="h-3 w-3 text-gotham-accent" />
            <h4 className="text-label font-mono uppercase text-gotham-text-1 border-b border-gotham-line-1 pb-1 flex-1">
              AI BEHAVIORAL INSIGHTS
            </h4>
          </div>
          
          <div className="space-y-2">
            {aiInsights.map((insight, index) => (
              <div key={index} className="flex gap-2">
                <div className="text-label font-mono text-gotham-accent mt-0.5">•</div>
                <p className="text-label font-mono text-gotham-text-1 leading-relaxed">
                  {insight}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Overall Assessment */}
        <div className="border border-gotham-warn/30 bg-gotham-warn/5 p-3">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-3 w-3 text-gotham-warn" />
            <span className="text-label font-mono text-gotham-warn uppercase">
              ASSESSMENT SUMMARY
            </span>
          </div>
          <p className="text-label font-mono text-gotham-text-1 leading-relaxed">
            ELEVATED THREAT DETECTED: Coordinated suspicious activity with high confidence indicators. 
            Recommend immediate escalation to operations center.
          </p>
        </div>
      </div>

      <div className="border-t border-gotham-line-1 p-2">
        <div className="flex items-center justify-between text-label font-mono text-gotham-text-2">
          <span>LAST UPDATE: {new Date().toLocaleTimeString('en-US', { hour12: false })}</span>
          <div className="flex items-center gap-1">
            <div className="h-2 w-2 bg-gotham-accent animate-pulse"></div>
            <span>AI ACTIVE</span>
          </div>
        </div>
      </div>
    </div>
  );
};