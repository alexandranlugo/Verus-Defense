# Verus Defense AI

> **AI-powered intelligence verification system for defense and intelligence applications.**

Verus Defense AI is a web-based dashboard that combines deepfake/manipulation detection, metadata analysis, cryptographic verification, and anomaly detection into a single intelligence console. The system uses AI scoring, blockchain-style integrity logs, and modern UI/UX to help defense teams rapidly authenticate sensitive media such as satellite imagery or drone footage.

--- 

## Demo Video

INSERT VIDEO

This video walks through:
- How the dashboard is structured
- Uploading files and seeing AI-driven integrity checks
- Switching between **Nuclear Site** and **Drone Video** tabs
- The underlying GitHub repo structure and how requirements were satisfied

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

## 📂 Project Structure

```bash
src/
 ├─ AnalysisFeed.tsx          # Real-time analysis updates
 ├─ ClassificationPanel.tsx   # Classification controls
 ├─ CryptographicIntegrity.tsx# Hash & metadata verification
 ├─ FileDropZone.tsx          # Secure drag-and-drop uploads
 ├─ IntelligenceDashboard.tsx # Main dashboard with tabs
 ├─ IntelligenceTagging.tsx   # Analyst tagging interface
 ├─ SatelliteDisplay.tsx      # Nuclear site image view
 ├─ DroneVideo.tsx            # Drone video playback
 ├─ ThreatAssessment.tsx      # Risk scoring & alerts
