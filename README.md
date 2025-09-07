# Verus Defense 

> **AI-powered intelligence verification system for defense and intelligence applications.**
> 
> **EasyA x Harvard Algorand Hackathon 2025**

Verus Defense AI is a web-based dashboard that combines deepfake/manipulation detection, metadata analysis, cryptographic verification, and anomaly detection into a single intelligence console. The system uses AI scoring, blockchain-style integrity logs, and modern UI/UX to help defense teams rapidly authenticate sensitive media such as satellite imagery or drone footage.

--- 

## Software Demo Video

https://github.com/user-attachments/assets/58384b61-b365-4fe3-a2be-601530593456

This video shows:
- How the dashboard is structured
- Uploading files and seeing AI-driven integrity checks
  
---

## Full Demo Video 

This video goes through:
- Project description
- How the dashboard is structured
- How the Github repo is structured
  
---

## Images

### Dashboard Overview
<img width="1511" height="820" alt="PNG image" src="https://github.com/user-attachments/assets/bd1be602-9743-49ac-ba58-3c1a0699fee7" />
<img width="1498" height="824" alt="PNG image" src="https://github.com/user-attachments/assets/92479782-c0bc-4093-99c7-5823f371c76b" />

---

## Features

- **Deepfake / Manipulation Detection**  
  AI models analyze images and video for artifacts, compression irregularities, and manipulations.

- **Metadata & Integrity Verification**  
  Cryptographic hash logging, EXIF/metadata parsing, and integrity scoring.

- **Content Authentication Score**  
  Each media file is scored 0–100% for authenticity confidence.

- **Anomaly Detection**  
  AI flags suspicious submission patterns.

- **Tab-based Views**  
  Switch seamlessly between the nuclear-site satellite image and a drone reconnaissance feed.

---

## System Interaction Flow

1. **Analyst Uploads File**  
   → `FileDropZone` triggers AI pipeline.  
2. **AI Analysis**  
   → Deepfake detection, metadata checks, anomaly detection.  
3. **Cryptographic Integrity**  
   → Hashes and logs recorded.  
4. **Results Displayed**  
   → `AnalysisFeed` + `ThreatAssessment` updated.   
5. **Final Classification**  
   → Analyst applies classification tags.

---

## Link to presentation slides: 

https://www.canva.com/design/DAGyPOzn2-w/WR8cUn2ilrmqzsBoRQBWfg/edit?utm_content=DAGyPOzn2-w&utm_campaign=designshare&utm_medium=link2&utm_source=sharebutton 

---

## Project Structure

```bash
Verus-Defense/
│
├─ src/                          # Frontend (React/Next.js Intelligence Dashboard)
│   ├─ AnalysisFeed.tsx          # Real-time AI analysis updates
│   ├─ ClassificationPanel.tsx   # Manage intelligence classification levels
│   ├─ CryptographicIntegrity.tsx# Cryptographic hashing & verification display
│   ├─ DroneVideo.tsx            # Drone reconnaissance video player
│   ├─ FileDropZone.tsx          # Secure drag-and-drop file uploader
│   ├─ IntelligenceDashboard.tsx # Main dashboard UI with tab switching
│   ├─ IntelligenceTagging.tsx   # Analyst tagging & metadata labeling
│   ├─ SatelliteDisplay.tsx      # Nuclear site satellite imagery view
│   └─ ThreatAssessment.tsx      # Risk scoring & anomaly alerts
│
├─ algorand-backend/             # Backend (Algorand Smart Contract Layer)
│   ├─ contracts/                # Smart contracts for logging hashes & scores
│   ├─ scripts/                  # Deployment and interaction scripts
│   ├─ utils/                    # Helper functions (hashing, transactions)
│   ├─ package.json              # Backend dependencies
│   └─ README.md                 # Backend-specific documentation
│
├─ public/                       # Static assets (images, demo video, etc.)
│   ├─ iran-nuclear-site.jpg
│   └─ drone.mp4
│
├─ README.md                     # Full project overview (this file)
└─ package.json                  # Frontend dependencies
