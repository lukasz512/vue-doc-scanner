# 📄 Document Scanner PWA

A modern, minimalistic **Progressive Web App** for scanning documents and syncing them to a smart backend powered by AI and Notion. Designed for mobile-first use, smooth offline uploads, and seamless integration with Google Drive and Claude/OpenAI.

---

## 🚀 Features

- 📸 Scan documents with phone camera
- 🌙 Light/Dark mode with auto detection
- 📴 Offline-first sync queue
- 🧠 AI classification (invoice or not)
- 📒 Notion entry generation
- ☁️ File storage in Google Drive
- 🔁 Deploy via GitHub Pages
- ✅ Clean architecture and modular design

---

## 🛠 Tech Stack

- **Frontend:** Vue 3 + TypeScript + Tailwind + shadcn/ui
- **Routing:** Vue Router
- **State:** Pinia
- **PWA:** Vite + Service Worker + Manifest
- **Backend:** Google Apps Script (Drive, Notion, OpenRouter)
- **CI/CD:** GitHub Actions (`gh-pages` branch)

---

## 📦 Project Setup

```bash
npm install
npm run dev

Build for production:
npm run build

Preview the build:
npm run preview

🚢 Deploy to GitHub Pages
npm run deploy

Make sure vite.config.ts has the correct base path for GitHub Pages:

base: '/document-scanner-pwa/'
Live URL: https://yourusername.github.io/document-scanner-pwa/


📁 Project Structure

src/
├── assets/              # SCSS, images
├── components/ui/       # shadcn-style components
├── router/              # Vue Router setup
├── stores/              # Pinia stores
├── views/               # Main app views (Home, SyncBox)
├── App.vue              # Root component
├── main.ts              # Entry point
├── service-worker.ts    # Offline support
public/
├── icons/               # PWA icons
├── robots.txt


🔌 Backend Info

The backend is built with Google Apps Script:
	•	Upload endpoint (doPost) handles image & base64
	•	AI classification via OpenRouter → Claude
	•	Logs data into Notion with rich metadata
	•	File storage organized by date/type in Google Drive

Backend repo / script URL: (add yours here)

⸻

📋 Roadmap
	•	Sync progress bar
	•	Claude debug panel (dev only)
	•	Upload modal with preview
	•	Tagging system based on AI result
	•	Folder filtering (optional, if more inputs exist)
	•	Fancy page transitions
	•	Better error handling / retry logic

⸻

🧠 Creator

Made by @lukasz512 with love for simplicity, speed, and good design.
This app is designed to feel like a native part of your workflow.

⸻

💡 Polish UI. English codebase. Clean. Powerful. Focused.