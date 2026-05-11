# PRD — Strona WWW PUMA Research Group

## 1. Cel produktu

Stworzenie i utrzymanie nowoczesnej, dwujęzycznej strony internetowej grupy badawczej PUMA, która:

- prezentuje zespół, projekty, publikacje i modele badawcze,
- umożliwia szybki kontakt i obsługę zgłoszeń rekrutacyjnych/współpracy,
- pozwala na łatwą edycję treści przez CMS,
- wspiera rozwój SEO i wiarygodność naukową zespołu.

## 2. Kontekst biznesowy

Strona pełni funkcję:

- wizytówki naukowej i rekrutacyjnej,
- kanału pozyskiwania partnerów do współpracy,
- miejsca publikacji aktualnych informacji o dorobku zespołu.

Sukces produktu mierzymy jakością prezentacji treści, czytelnością na urządzeniach mobilnych oraz niezawodnością formularzy kontaktowych.

## 3. Użytkownicy i persony

### 3.1 Kandydat / kandydatka do zespołu

- Chce szybko zrozumieć profil badań, wymagania i sposób aplikowania.
- Oczekuje prostego formularza i potwierdzenia działania.

### 3.2 Potencjalny partner naukowy / biznesowy

- Szuka obszarów kompetencji, przykładów projektów i danych kontaktowych.
- Potrzebuje jasnego CTA do współpracy.

### 3.3 Członek społeczności akademickiej

- Przegląda publikacje i modele,
- oczekuje wiarygodnej, aktualnej i uporządkowanej prezentacji.

### 3.4 Administrator treści

- Potrzebuje prostego procesu aktualizacji treści w CMS,
- oczekuje bezpiecznej i przewidywalnej publikacji.

## 4. Zakres funkcjonalny (MVP+)

### 4.1 Routing i i18n

- Dwa języki: `pl` (domyślny) i `en`.
- Routing lokalizowany (`/projekty`, `/en/projects` itp.) dzięki `next-intl`.
- Domyślny język bez prefiksu, angielski z prefiksem `/en`.

### 4.2 Strony publiczne

- Home
- Team
- Projects
- Publications
- Models
- Recruitment
- Cooperation
- Contact

### 4.3 Formularze i API

- Endpointy Next.js:
  - `POST /api/recruitment`
  - `POST /api/cooperation`
- Walidacje antyspamowe:
  - token CSRF,
  - minimalny czas wypełnienia formularza,
  - Google reCAPTCHA v3.
- Wysyłka maili przez SMTP (`nodemailer`).

### 4.4 Zarządzanie treścią

- Integracja z Sanity CMS (`@sanity/client`, Studio w osobnym pakiecie `studio/`).
- Treści dynamiczne obsługiwane po stronie frontendu.

### 4.5 Tłumaczenia

- Słowniki JSON w `frontend/src/messages/pl` i `frontend/src/messages/en`.
- Skrypt `scripts/translate.mjs` (DeepL) do automatycznego tłumaczenia kluczy.

## 5. Wymagania niefunkcjonalne

### 5.1 Jakość i utrzymanie

- TypeScript + ESLint + Prettier.
- Spójny styl komponentów i SCSS Modules.

### 5.2 UX/UI

- Layout responsywny (mobile-first).
- Czytelna hierarchia treści i nawigacja dwujęzyczna.

### 5.3 Bezpieczeństwo

- Ochrona formularzy przez `reCAPTCHA` i walidacje serwerowe.
- Sekrety i klucze trzymane w `.env.local`.

### 5.4 SEO

- Metadane stron i dobre praktyki semantyczne.

## 6. Kluczowe ograniczenia

- Projekt jest monorepo z rozdzieleniem na `frontend/` i `studio/`.
- Aktualnie `studio/schemaTypes/index.ts` ma pustą listę schematów (`schemaTypes = []`) — wymaga uzupełnienia w kolejnych iteracjach.
- Część danych nadal jest statyczna (`src/data`), część dynamiczna (Sanity).

## 7. KPI / metryki sukcesu

- Wzrost liczby poprawnie wysłanych formularzy.
- Stabilny czas ładowania kluczowych stron.
- Brak błędów krytycznych w ścieżkach kontakt/rekrutacja/współpraca.
- Utrzymanie spójności tłumaczeń PL/EN.

## 8. Poza zakresem (na teraz)

- Rozbudowane workflow CMS (role, custom approvals).
- Zaawansowana analityka produktowa i eksperymenty A/B.
- Wielojęzyczność większa niż PL/EN.

## 9. Definicja ukończenia (DoD)

- Wszystkie główne strony działają w `pl` i `en`.
- Formularze API działają poprawnie i bezpiecznie.
- Dokumentacja techniczna i organizacyjna projektu jest aktualna.
- Zmiany przechodzą `lint` i standardowy review.
