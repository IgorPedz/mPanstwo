<div align="center">

<img src="https://img.shields.io/badge/version-0.9.5-blue?style=for-the-badge" alt="version"/>
<img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=black" alt="React"/>
<img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white" alt="Node.js"/>
<img src="https://img.shields.io/badge/MySQL-2-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL"/>
<img src="https://img.shields.io/badge/i18n-PL%20%7C%20EN%20%7C%20DE-orange?style=for-the-badge" alt="i18n"/>

# 🏛️ mPaństwo

**Aplikacja webowa do edukacji obywatelskiej – przejrzyste dane o polskich instytucjach państwowych w jednym miejscu.**

[Demo](#) · [Dokumentacja](#dokumentacja) · [Zgłoś błąd](https://github.com/IgorPedz/mPanstwo/issues)

</div>

---

## 📋 O projekcie

**mPaństwo** to aplikacja edukacyjna agregująca publicznie dostępne dane o polskich instytucjach państwowych. Łączy dane z API Sejmu RP, oficjalnych stron instytucji i własnej bazy danych, prezentując je w czytelnej, interaktywnej formie – bez konieczności posiadania wiedzy technicznej.

Projekt powstał z myślą o obywatelach, uczniach i studentach, którzy chcą lepiej rozumieć działanie państwa.

---

## ✨ Funkcjonalności

### 🏗️ Instytucje państwowe

| Moduł | Opis |
|-------|------|
| **Sejm RP** | Dane o posłach, klubach parlamentarnych i komisjach |
| **Senat RP** | Skład i aktywność Senatu |
| **Rada Ministrów** | Aktualny skład rządu i ministerstwa |
| **Prezydent RP** | Informacje o KPRP i działalności prezydenta |
| **Inne instytucje** | TK, SN, KRS, NSA, UOKiK, KRRiT — podstawowe informacje i linki do oficjalnych stron |

### 📜 Legislacja

- Przeglądanie projektów ustaw z API Sejmu RP (kadencja X)
- Filtrowanie wg typu: rządowe, poselskie, senackie, obywatelskie, prezydenckie
- Szczegółowy widok projektu: historia, etapy, komisje, wyniki głosowań
- Opinie użytkowników i ekspertów pod każdym projektem
- Podgląd PDF druku sejmowego bezpośrednio w przeglądarce

### 📊 Personalny pulpit (Dashboard)

- Konfigurowalny dashboard z kafelkami (drag & drop via `@dnd-kit`)
- Wybór wyświetlanych modułów i danych
- Ustawienia zapisywane między sesjami

### 🎓 Moduł edukacyjny

- Kursy podzielone na lekcje z treścią i quizami
- Mapa postępu kursu
- Odznaki edukacyjne za ukończenie modułów

### 🏅 System osiągnięć

- Odznaki i rangi za aktywność w aplikacji
- Wizualizacja poziomu i punktów w profilu
- Rangi wyświetlane przy opiniach i ankietach

### 📣 Ankiety

- Skrytka ankiet: aktywne, archiwalne, wygasłe
- Tworzenie ankiet przez ekspertów i administratorów
- Wizualizacja wyników w czasie rzeczywistym (Socket.IO)

### 🔔 Powiadomienia

- System powiadomień w czasie rzeczywistym
- Badge z liczbą nieprzeczytanych powiadomień

### 👤 Profil i bezpieczeństwo

- Zmiana nazwy użytkownika, e-maila i hasła
- Weryfikacja adresu e-mail
- Usuwanie konta
- Wskaźnik siły hasła

### 🌍 Internacjonalizacja

- Obsługa trzech języków: **Polski**, **English**, **Deutsch**
- Przełącznik języka dostępny globalnie

### 🎨 UI / UX

- Tryb jasny i ciemny
- W pełni responsywny (mobile, tablet, desktop)
- Animacje Framer Motion
- Skeleton loading states

---

## 🛠️ Stos technologiczny

### Frontend

| Technologia | Zastosowanie |
|-------------|-------------|
| **React 18** | Biblioteka UI |
| **Tailwind CSS** | Stylowanie |
| **Framer Motion** | Animacje |
| **@dnd-kit** | Drag & drop (dashboard) |
| **React Hook Form + Yup** | Walidacja formularzy |
| **Zustand** | Zarządzanie stanem |
| **react-i18next** | Internacjonalizacja |
| **Axios** | Komunikacja z API |
| **Socket.IO Client** | Powiadomienia real-time |
| **React Router** | Routing |

### Backend

| Technologia | Zastosowanie |
|-------------|-------------|
| **Node.js + Express** | Serwer i REST API |
| **MySQL 2** | Baza danych |
| **JWT** | Autoryzacja sesji |
| **bcrypt** | Hashowanie haseł |
| **Nodemailer / Resend** | Wysyłka e-maili |
| **Socket.IO** | WebSocket (powiadomienia) |
| **Playwright + Cheerio** | Scraping danych instytucji |
| **node-cron** | Zadania cykliczne (cache API) |
| **rss-parser** | Parsowanie aktualności |

### Zewnętrzne API

- **API Sejmu RP** — projekty ustaw, posłowie, głosowania (`api.sejm.gov.pl`)

---

## 🚀 Uruchomienie lokalne

### Wymagania

- Node.js ≥ 18
- MySQL ≥ 8
- npm

### 1. Klonowanie repozytorium

```bash
git clone https://github.com/IgorPedz/mPanstwo.git
cd mPanstwo
```

### 2. Konfiguracja backendu

```bash
cd backend
npm install
```

Utwórz plik `.env` w katalogu `backend/`:

```env
# Baza danych
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=twoje_haslo
DB_NAME=mpanstwo

# JWT
JWT_SECRET=tajny_klucz_jwt
JWT_REFRESH_SECRET=tajny_klucz_refresh

# E-mail
RESEND_API_KEY=twoj_klucz_resend
FROM_EMAIL=noreply@twojadomema.pl

# App
CLIENT_URL=http://localhost:5173
PORT=3000
```

### 3. Konfiguracja frontendu

```bash
cd ../frontend
npm install
```

Utwórz plik `.env` w katalogu `frontend/`:

```env
VITE_API_URL=http://localhost:3000
```

### 4. Uruchomienie

```bash
# Terminal 1 – backend
cd backend && npm run dev

# Terminal 2 – frontend
cd frontend && npm run dev
```

Aplikacja dostępna pod: **http://localhost:5173**

---

## 📁 Struktura projektu

```
mPanstwo/
├── backend/
│   ├── controllers/       # Logika obsługi żądań HTTP
│   ├── routes/            # Definicje tras API
│   ├── services/          # Logika biznesowa (events, cron)
│   ├── db.js              # Połączenie z MySQL
│   └── server.js          # Punkt wejścia serwera
│
└── frontend/
    └── src/
        ├── components/    # Komponenty UI (globalne, modułowe)
        ├── pages/         # Widoki stron
        │   ├── AuthPages/         # Logowanie, reset hasła
        │   ├── InstitutionPages/  # Sejm, Senat, legislacja, posłowie...
        │   ├── EducationPages/    # Kursy, lekcje, mapa kursu
        │   ├── ProfilPages/       # Profil, osiągnięcia, ankiety
        │   ├── MainPages/         # Dashboard
        │   └── InfoPages/         # FAQ, dokumenty, kontakt
        ├── Hooks/          # Custom React hooks
        ├── Contexts/       # React Context (user, theme)
        ├── locales/        # Tłumaczenia (pl / en / de)
        └── Utils/          # Helpers, animacje
```

---

## 🔐 Role użytkowników

| Rola | Możliwości |
|------|------------|
| **Gość** | Przeglądanie danych publicznych, legislacji, instytucji |
| **Użytkownik** | Dashboard, profil, osiągnięcia, ankiety, opinie, kursy |
| **Ekspert** | Tworzenie ankiet, opinie z wyróżnionym oznaczeniem |
| **Moderator** | Moderacja treści użytkowników |
| **Administrator** | Pełne zarządzanie kontami i systemem |

---

## 📚 Dokumentacja

Dokumenty projektowe dostępne w zakładce **Dokumenty** w aplikacji:

- `DZW-GrA_v1` — Dokument Założeń Wstępnych
- `SWS-GrA_v2` — Specyfikacja Wymagań Systemowych

---

## 👤 Autor

**Igor Pędziwilk**
- GitHub: [@IgorPedz](https://github.com/IgorPedz)

---

<div align="center">

Made with ❤️ for Polish civic education

</div>
