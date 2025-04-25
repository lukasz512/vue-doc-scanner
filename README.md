📄 Dokumentacja techniczna — Document Scanner PWA

🧠 Cel aplikacji

Stworzenie lekkiej, progresywnej aplikacji webowej (PWA), umożliwiającej:
	•	Wykonywanie zdjęć dokumentów (np. faktur).
	•	Wysyłanie ich do Google Apps Script jako plików PDF.
	•	Analizę treści (Claude/OpenAI przez OpenRouter).
	•	Automatyczne tworzenie wpisu w Notion (opis, typ, link).
	•	Przenoszenie pliku do odpowiedniego folderu na Google Drive.
	•	Działanie offline z kolejką synchronizacji.
	•	Możliwość prostego rozwoju interfejsu w Vue 3 + Tailwind.

⚙️ Technologie
Warstwa
Stack
Frontend
Vue 3, Vue Router, TypeScript, SCSS, TailwindCSS (z shadcn/ui)
Backend
Google Apps Script (GAS), Google Drive, Notion API, OpenRouter
Deployment
GitHub Pages (dla frontu), Web App URL (dla GAS)
Dev Tools
Vite, GitHub Actions (build + deploy)


📁 Struktura projektu

src/
├── assets/
├── components/       // Komponenty UI (np. przyciski, dialogi)
├── views/            // Widoki: Home.vue, SyncBox.vue
├── router.ts         // Vue Router (2 widoki)
├── main.ts           // Setup aplikacji i motywu
├── App.vue           // Główny layout + menu
├── style.scss        // Globalne style
public/
└── manifest.webmanifest
vite.config.ts        // Konfiguracja Vite + PWA



🧩 Kluczowe funkcje
	•	📷 Widok Home
	•	Placeholder na zdjęcie
	•	Obsługa kamery
	•	Przycisk: Powtórz, Usuń, Wyślij
	•	Powiadomienia o statusie
	•	🔁 Widok SyncBox
	•	Kolejka offline (IndexedDB)
	•	Retry, usuń, stan synchronizacji
	•	🧭 Nawigacja
	•	Mobilne menu (hamburger)
	•	Dolny Sheet z animacją (shadcn/ui)
	•	🎨 Motyw
	•	Light/dark z preferencją systemową
	•	Lokalny zapis w localStorage

⸻

📡 Integracja z backendem

Google Apps Script:
	•	Endpoint: doPost(e)
	•	Odbiera base64 PDF
	•	Tworzy plik na Drive
	•	Analizuje tekst przez Claude/OpenRouter
	•	Wysyła dane do Notion
	•	Przenosi plik do folderu wg typu i daty

Notion:
	•	Nowy wpis w bazie
	•	Tytuł, kategoria, opis + link

⸻

🔜 Planowane funkcje
	•	🕘 Historia przesłanych dokumentów (z linkiem do Notion)
	•	📋 Panel ustawień (tokeny, preferencje)
	•	📤 Eksport do CSV
	•	🔒 Autoryzacja użytkownika (opcjonalnie)

⸻

🛠️ Dev
	•	npm install — instalacja zależności
	•	npm run dev — lokalny serwer
	•	npm run build — build na GitHub Pages
	•	gh-pages branch zawiera dist/
