# Project Stack — next_puma_website

## 1. Architektura

- **Typ repo:** monorepo
- **Aplikacje:**
  - `frontend/` — Next.js App Router (publiczna strona WWW)
  - `studio/` — Sanity Studio (CMS)

## 2. Frontend (`frontend/`)

### 2.1 Core

- **Framework:** `next@^16.0.7`
- **UI runtime:** `react@19.2.0`, `react-dom@19.2.0`
- **Język:** `typescript@^5`
- **Moduły:** ESM (`"type": "module"`)

### 2.2 Styling

- **SCSS Modules:** `sass`
- **Tailwind CSS:** `tailwindcss@^4`, `@tailwindcss/postcss@^4`
- **PostCSS + Autoprefixer:** `autoprefixer`

### 2.3 i18n i routing

- **Biblioteka:** `next-intl@^4.7.0`
- **Lokale:** `pl`, `en`
- **Prefix locale:** `as-needed`
- **Default locale:** `pl`

### 2.4 Integracje

- **CMS client:** `@sanity/client`, `@sanity/image-url`
- **Mail:** `nodemailer`
- **Tłumaczenia automatyczne:** `deepl-node`
- **Antyspam:** Google reCAPTCHA (weryfikacja po stronie API)

### 2.5 Jakość kodu

- **Linting:** `eslint@^9`, `eslint-config-next`, `@typescript-eslint/*`
- **Formatowanie:** `prettier@^3`
- **Testy unit:** `vitest`, `@vitest/coverage-v8`
- **Testy E2E:** `@playwright/test` (Chromium)

### 2.6 Najważniejsze skrypty

- `npm run dev` — dev server
- `npm run build` — build produkcyjny
- `npm run start` — uruchomienie builda
- `npm run lint` / `npm run lint:fix`
- `npm run format` / `npm run format:check`
- `npm run test`, `test:unit`, `test:unit:watch`, `test:unit:coverage`
- `npm run test:e2e`, `test:e2e:ui`, `test:e2e:headed`, `test:e2e:report`
- `npm run translate`, `translate:all`, `translate:check`, `translate:reverse`, `translate:force`

## 3. CMS Studio (`studio/`)

### 3.1 Core

- **Sanity:** `sanity@^4.20.0`
- **Pluginy:** `sanity/structure`, `@sanity/vision`
- **UI runtime:** React 19

### 3.2 Tooling

- **TypeScript**
- **ESLint:** `@sanity/eslint-config-studio`
- **Prettier**

### 3.3 Skrypty

- `npm run dev`
- `npm run start`
- `npm run build`
- `npm run deploy`
- `npm run deploy-graphql`

## 4. Środowisko i operacje

- **Node.js:** 20+ (rekomendowane)
- **Package manager:** npm
- **Env files:**
  - `frontend/.env.local` (Sanity, SMTP, reCAPTCHA, DeepL)
  - Studio zgodnie z `studio/README.md`

## 5. Obszary do uporządkowania

- Ujednolicenie źródeł prawdy dla treści (statyczne `src/data` vs CMS).
- Uzupełnienie i podpięcie schematów w `studio/schemaTypes/index.ts`.
