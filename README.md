# 📄 Document Scanner PWA

A sleek, fast, and modern Progressive Web App (PWA) for scanning and organizing documents using your phone. Designed to feel as intuitive as Notion — with built-in AI processing and seamless integration with Google Drive and Notion.

---

## ✨ Features

- 📸 **Camera-first UI** – Scan or upload directly from your device
- 📡 **Offline queue + auto sync** – Uploads even when offline, with retry
- 🔄 **SyncBox view** – Manage document queue, status, retry or delete
- 🌙 **Dark/light mode** – Based on system + toggle in UI
- 🌐 **Multi-language support** – Polish 🇵🇱 & English 🇬🇧 (more coming!)
- 🧠 **AI classification (Claude/OpenRouter)** – Detects invoice vs other
- 🗂️ **Organizes in Google Drive** – Auto folders per month/year
- 🧾 **Logs in Notion** – With category, summary, and file link

---

## 🚀 Live Demo

**🔗 [https://<your-username>.github.io/document-scanner-pwa](https://<your-username>.github.io/document-scanner-pwa)**

Replace `<your-username>` with your actual GitHub username.

---

## 🧠 Tech Stack

- [Vue 3](https://vuejs.org/) + [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [Tailwind CSS](https://tailwindcss.com/) + [shadcn/ui](https://ui.shadcn.com/)
- [Pinia](https://pinia.vuejs.org/) – state management
- [Google Apps Script](https://script.google.com/) – backend
- [Notion API](https://developers.notion.com/), [OpenRouter](https://openrouter.ai/)

---

## 🛠️ Local Development

```bash
# 1. Install dependencies
npm install

# 2. Run dev server
npm run dev

# 3. Build for production
npm run build

# 4. Preview production build
npm run preview
```

> Make sure to update `vite.config.ts` base path when building for GitHub Pages:
> 
> ```ts
> base: '/document-scanner-pwa/',
> ```

---

## 🔄 Auto Deployment (GitHub Pages)

- Push to `MVP` branch → triggers GitHub Actions
- Builds app with Vite
- Publishes `/dist` folder to `gh-pages` branch
- GitHub Pages serves the app from there

Workflow: `.github/workflows/deploy.yml`

---

## 📁 Project Structure (key parts)

```
src/
├── components/ui/      # Shared UI elements (Button, Card, Toast...)
├── views/              # HomeView.vue, SyncBox.vue, etc.
├── router/             # Vue Router
├── stores/             # Pinia store (queue, theme)
├── assets/             # Styles, icons, scss
├── App.vue             # Root component
├── main.ts             # Entry point
```

---

## ✅ Todo / Roadmap

- [x] Auto retry + spinner feedback
- [x] Theme toggle + context menu
- [x] Language switcher
- [x] Upload with base64 compression
- [ ] Firebase / Supabase variant
- [ ] Animations / transitions like Notion
- [ ] Client-ready installer modal (add to homescreen)

---

## 👨‍💻 Author

Created with ❤️ by [@lukasz512](https://github.com/lukasz512) – built for speed, clarity, and elegance.

