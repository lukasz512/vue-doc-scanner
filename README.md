📄 Document Scanner PWA

A modern, mobile-first PWA built with Vue 3, TypeScript, SCSS, and Vue Router.
It allows users to scan documents with their camera, preview, sync offline, and upload them to a Google Apps Script backend for processing, categorization, and export to Notion and Google Drive.

⸻

🚀 Features
	•	✅ Vue 3 + TypeScript + SCSS
	•	✅ Modern mobile-first UI
	•	✅ Light/Dark mode with system preference and local override
	•	✅ Camera capture and preview before upload
	•	✅ Offline mode with local sync queue
	•	✅ SyncBox view to manage pending uploads
	•	✅ Upload to Google Drive via Apps Script
	•	✅ Trigger Claude/OpenAI via OpenRouter to analyze document
	•	✅ Create entry in Notion with extracted metadata
	•	✅ Auto-move files into categorized Drive folders
	•	✅ PWA with service worker and manifest support
	•	✅ Built-in GitHub Pages deployment pipeline

⸻

🧱 Tech Stack
	•	Vue 3 with Composition API
	•	TypeScript
	•	SCSS (modular)
	•	Vue Router
	•	Vite (dev/build tool)
	•	vite-plugin-pwa for offline support
	•	Google Apps Script as backend API
	•	Notion API for logging entries
	•	OpenRouter (Claude/OpenAI) for AI document classification

⸻

📁 Project Structure

vue-doc-scanner/
├── public/
│   └── manifest.webmanifest, icons, ...
├── src/
│   ├── views/
│   │   ├── Home.vue         ← Camera & upload UI
│   │   └── SyncBox.vue      ← Offline queue view
│   ├── components/          ← Shared UI (alerts, menu, etc.)
│   ├── composables/         ← Camera, sync queue, upload logic
│   ├── router.ts
│   ├── App.vue
│   ├── main.ts
│   └── style.scss
├── vite.config.ts
└── package.json

📸 User Flow
	1.	User opens Home view
	2.	Captures a photo using device camera
	3.	Preview is shown with options to:
	•	Retake
	•	Delete
	•	Upload
	4.	Upload sends file (base64 JPEG) to Google Apps Script
	5.	Apps Script:
	•	Saves to Google Drive
	•	Sends text to Claude/OpenAI (OpenRouter)
	•	Generates summary, type, date
	•	Creates Notion entry
	•	Moves file to correct Drive folder
	6.	User sees a status alert
	7.	If offline → queued in SyncBox

⸻

🌐 Deployment
	•	Development: npm install && npm run dev
	•	Production: npm run build
	•	Hosted via GitHub Pages (gh-pages branch via Actions)
