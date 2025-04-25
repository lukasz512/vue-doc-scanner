# 📄 Document Scanner PWA

**Data ostatniej aktualizacji:** 2025-04-25

## 🎯 Cel aplikacji

Aplikacja umożliwia użytkownikowi skanowanie dokumentów przez aparat telefonu i ich automatyczne:
- przesyłanie na **Google Drive**,
- analizowanie zawartości przez AI (Claude/OpenRouter),
- tworzenie wpisu w **Notion** z opisem, typem i datą,
- oraz obsługę działania **offline-first** z kolejką.

---

## ⚙️ Technologie

- **Frontend:** Vue 3, TypeScript, Vue Router, SCSS, PWA
- **Backend:** Google Apps Script (doPost), integracja z Claude (OpenRouter), Google Drive i Notion
- **Hosting:** GitHub Pages (z auto-deploy przez GitHub Actions)

---

## 📱 Funkcje

### ✅ MVP:
- Tryb mobilny (RWA) z PWA
- Robienie zdjęć i ich podgląd
- Przycisk `Wyślij` – wysyła do API (Google Apps Script)
- Przycisk `Usuń` – resetuje widok
- Przycisk `Powtórz` – nowy skan
- Alert o statusie wysyłki
- Menu hamburgerowe z animacją
- Ciemny/jasny motyw automatycznie + przechowywany w localStorage

### 🔜 Planowane:
- **SyncBox** – widok kolejki offline + możliwość retry/delete
- **Historia** – lista wysłanych dokumentów z linkami do Notion
- **Ustawienia** – preferencje, konfiguracja API, diagnostyka

---

## 🗂️ Struktura folderów

src/
├── assets/             # Ikony, favicon
├── components/         # Menu, alerty, layouty
├── views/
│   ├── Home.vue        # Skanowanie dokumentów
│   ├── SyncBox.vue     # Widok kolejki offline
│   └── History.vue     # [W planie] Historia plików
├── router.ts
├── main.ts
├── App.vue
└── style.scss


---

## 🔌 Integracje

- **Google Apps Script**
  - Endpoint `doPost` – odbiera obraz jako `base64`, zapisuje na Drive, analizuje Claude, tworzy wpis w Notion
- **Claude / OpenRouter**
  - Wysyłka promptu z treścią dokumentu, analiza `invoice/other`
- **Notion**
  - API token + ID bazy w `code.gs`
  - Tworzenie wpisów z kategorią, opisem, linkiem

---

## 🧠 Pomysły na przyszłość

- Logowanie przez Google
- Własne API do historii (zamiast tylko Notion)
- Wsparcie dla wielu użytkowników
- Powiadomienia push
- OCR i analiza zdjęć jeszcze przed wysyłką

---

## 🛠️ Autor

Projekt prowadzony przez [lukasz512](https://github.com/lukasz512)

Jeśli chcesz się dołączyć lub masz pomysł – zapraszam do kontaktu! 🚀