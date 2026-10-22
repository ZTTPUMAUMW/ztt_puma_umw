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

## CMS environment setup — 2026-10-20

Project s2jrzn3b (organization op2a7psgf) replaces the unused starter configuration. Studio and CLI read SANITY_STUDIO_PROJECT_ID / SANITY_STUDIO_DATASET; frontend client reads NEXT_PUBLIC_SANITY_PROJECT_ID / NEXT_PUBLIC_SANITY_DATASET. Both require explicit values. Local examples select development. Production deployments must explicitly select production. Studio schemas and frontend content migration remain pending; public pages still use their current local content.

Secrets remain only in ignored local files or deployment settings. Email and reCAPTCHA secret values are blank locally; no forms should be submitted until safe test credentials/recipients are configured. See studio/README.md.

## Contact CMS runtime — 2026-10-20

No new dependencies. Server-side @sanity/client uses exact published document IDs, no token, no CDN and no-store reads; React cache deduplicates each render. CMS-enabled pages render dynamically because shared footer content is fetched at request time. This favors freshness in the pilot; revisit caching/performance before production. Missing/unavailable content temporarily falls back to checked-in copy.

## Collection CMS runtime — 2026-10-20

No new dependencies. Collection loaders perform server-side published/no-store reads and project-restricted image projection. Components receive normalized serializable data. Scientific text and model rich text render as escaped React content; unsafe legacy HTML injection was removed from these item components. Funding totals use numeric values grouped by currency.

## Marketing CMS migration — 2026-10-20

Marketing pages use server-only published GROQ reads with request-time freshness and temporary migration defaults. Pure normalization validates links, routes and interpolation placeholders; no new dependencies or browser secrets are introduced.

## Navigation and Research — 2026-10-21

Shared layout and Research use the existing Sanity client for server-only published reads; no new dependencies. Internal destinations use a fixed route allowlist; external destinations require credential-free HTTPS; original logos remain fallback assets.

## Research review feedback — 2026-10-22

Research uses native HTML video with preload=none, posters and fast-start MP4. Supplied clips are cropped to their bright recording surface and encoded as H.264 CRF 18, retaining the video frames and frame rates; audio tracks are removed. No frontend dependency was added. The scientific table uses lossless PNG plus an accessible bilingual HTML equivalent.
