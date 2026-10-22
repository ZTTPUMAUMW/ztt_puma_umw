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

## Contact CMS pilot — 2026-10-20

Contact page and shared contact/footer organization text are now implemented as bilingual singleton schemas. Existing content prepopulates newly created documents; a member publishes them in development. Public rendering uses only published content with temporary local-copy fallbacks. Draft preview, other pages, media management, backups and production migration remain pending. Translations are manually supplied.

## CMS collections — 2026-10-20

Team, Projects, Publications and Models now have bilingual page editors with embedded ordered lists, page labels and SEO fields. Initial values retain existing public content. Images support replacement uploads. Publication titles remain original bibliographic text; model descriptions use controlled rich text. Manual development publishing tests precede production migration.

## Marketing CMS migration — 2026-10-20

Home, Recruitment and Cooperation now have bilingual singleton editors with ordered arrays, safe links, editable form labels and SEO. Existing copy and media are preserved as initial values. Models shares the editable Home closing section. Shared navigation/branding and Research remain pending.

## Navigation and Research — 2026-10-21

Added bilingual Research (/badania, /en/research) with explicit description, spreadsheet, vitality table and short-video placeholders. No real download or upload is exposed pending the lab file-access decision. Navigation/branding now has a dedicated singleton editor controlling links, order, logos and accessibility labels.

## Research review feedback — 2026-10-22

Research now follows the manager’s annotated layout: shared grey intro, Publications-style single vitality tab, supplied lossless table and nine scored clips grouped under four parameters. No attachments section is shown. Melanization has table descriptions but no supplied clip. Polish terminology/text is included for lab review.


## 2026-10-22 — Mock Excel download

Research now includes an Excel download with explicitly fictional bilingual mock observations for review. The real file and its sharing policy remain pending. The editor can replace the workbook, update both language labels and hide the download.


## 2026-10-22 — Files draft review

Visible navigation, page title and Studio editor now use Files / Pliki (working title). The subtitle is Supplementary materials and additional files, with a Polish translation. Existing /en/research and /badania URLs and CMS IDs are retained. The editable HTML scale table is always visible; the image table is no longer rendered, and its legacy upload field is hidden. The four parameter headings and their section heading are centered. Melanization images are pending from the lab; no substitute scientific images were invented.


## 2026-10-22 — Production CMS preparation

Added a separate production Studio and production-only Vercel CMS configuration. Initialized eleven production singleton documents from reviewed repository defaults, with no development drafts or experiment assets copied. Main remains pending review. See production-cms-setup.md for environment separation, editor workflow, initial snapshots and post-merge checks.


## 2026-10-22 — Melanization images and download removal

Removed the Downloads section and mock XLSX from public website assets. Added the four lab-supplied melanization images in score order 0–3, converting TIFF to PNG with identical decoded pixels. Images have bilingual grade descriptions, natural aspect ratios and links to full size. CMS parameter editors support scored images, optional replacements and bilingual captions; obsolete download fields are hidden for compatibility. No source image was uploaded to the public Sanity CDN.
