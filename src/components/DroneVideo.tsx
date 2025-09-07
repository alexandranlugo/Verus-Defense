import React from "react";

export const DroneVideo: React.FC = () => {
  return (
    <div className="flex h-full flex-col">
      {/* Toolbar */}
      <div className="flex items-center justify-between gotham-panel border-b bg-gotham-bg-2 p-3">
        <div>
          <h3 className="text-section font-mono uppercase tracking-wider text-gotham-text-1">
            UAV RECONNAISSANCE
          </h3>
          <p className="text-label font-mono text-gotham-text-2">
            DRONE FEED — LIVE/RECORDED
          </p>
        </div>
      </div>

      {/* Video Surface */}
      <div className="relative flex-1 overflow-hidden bg-gotham-bg-0 p-4">
        <video
          className="h-full w-full rounded-md border border-gotham-line-1"
          src={require("@/assets/drone.mp4")}
          // Optional poster image (drop a JPG/PNG as poster if you like)
          // poster={require("@/assets/drone-poster.jpg")}
          controls
          playsInline
        />
        <div className="absolute bottom-3 left-3 space-y-1">
          <div className="text-mono text-gotham-text-2">UAV: 12A</div>
          <div className="text-mono text-gotham-text-2">ALT: 410M • HD</div>
        </div>
      </div>
    </div>
  );
};
