# PUMA Research Group Website

Next.js 16 application with TypeScript and i18n support (Polish/English). The repository also contains a Sanity Studio; the current frontend content is primarily stored in local source files.

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router, React 19)
- **Language**: TypeScript 5
- **CMS tooling**: Sanity Studio (project configured; frontend does not currently fetch content from Sanity)
- **Styling**: SCSS Modules + Tailwind CSS 4
- **i18n**: next-intl 4.7.0
- **Email**: Nodemailer
- **Translation**: DeepL API
- **Linting**: ESLint (eslint-config-next + typescript-eslint)
- **Formatting**: Prettier 3

## Project Structure

```
frontend/
├── src/
│   ├── app/[locale]/          # Next.js App Router with locale prefix
│   │   ├── page.tsx           # Homepage
│   │   ├── team/              # Team page
│   │   ├── projects/          # Projects page
│   │   ├── publications/      # Publications page
│   │   ├── models/            # Models page
│   │   ├── recruitment/       # Recruitment page
│   │   ├── cooperation/       # Cooperation page
│   │   └── contact/           # Contact page
│   ├── components/            # React components
│   ├── styles/                # SCSS modules
│   │   ├── variables.module.scss  # CSS variables
│   │   ├── components/        # Component styles
│   │   └── pages/             # Page-specific styles
│   ├── messages/              # i18n JSON files
│   │   ├── pl/                # Polish translations
│   │   └── en/                # English translations
│   ├── data/                  # Static data (teamMembers.ts)
│   ├── lib/                   # Utilities (email, recaptcha, sanity)
│   └── i18n/                  # i18n configuration
│
└── studio/                    # Sanity Studio CMS
    └── schemaTypes/           # Content schemas
```

## Setup

### Prerequisites

- Node.js 20+
- Corepack and pnpm (the repository pins pnpm in the root `package.json`)

### Environment variables

The basic frontend can be installed and started without a `.env.local` file. To configure form submissions, create `frontend/.env.local` using the tracked example:

```bash
cp frontend/.env.example frontend/.env.local
```

Set the following values in `frontend/.env.local` for the cooperation and recruitment forms:

- `EMAIL_USER` and `EMAIL_PASSWORD` — Gmail account and app password used for SMTP.
- `EMAIL_FROM` and `EMAIL_TO` — sender and recipient email addresses.
- `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` — Google reCAPTCHA v3 keys configured for the deployed/local domains.

These credentials are not included in the repository. Without valid SMTP and reCAPTCHA values, the site can still start, but form submissions will not work.

The translation scripts require `DEEPL_API_KEY` in `frontend/.env.local`; add it only if you need to run those scripts. Sanity's project ID (`6gulcr1j`) and dataset (`production`) are configured in source. The current frontend does not use a Sanity API token to fetch page content. Access to edit content in the Studio requires a Sanity account with permissions for the project.

### Installation

From the repository root:

```bash
corepack enable
pnpm install
```

### Run the frontend

From the repository root:

```bash
pnpm --dir frontend dev
```

The development server runs at `http://localhost:3000`. Other useful commands, run from the repository root:

```bash
pnpm --dir frontend build
pnpm --dir frontend start
pnpm --dir frontend lint
pnpm --dir frontend test:unit
```

### Run Sanity Studio (optional)

In a separate terminal, from the repository root:

```bash
pnpm --dir studio dev
```

The Studio is configured for project `6gulcr1j` and dataset `production`; sign in with an authorized Sanity account to edit content.

## Development

### Adding Translations

Translation files are located in `src/messages/pl/` (Polish) and `src/messages/en/` (English).
Each file corresponds to a specific page or section (e.g. `home.json`, `team.json`).

**Manual workflow:**

1. Edit the Polish source file in `src/messages/pl/`
2. Run the translation script to auto-translate changed keys to English
3. Review the output in `src/messages/en/`

**DeepL Translation Script** (`scripts/translate.mjs`):

```bash
pnpm --dir frontend translate          # Translate only changed files (PL → EN)
pnpm --dir frontend translate:all      # Force re-translate all files (PL → EN)
pnpm --dir frontend translate:check    # Dry run — show missing/extra keys without changes
pnpm --dir frontend translate:reverse  # Translate EN → PL
```

**How it works:**

- Detects changed `.json` files via `git diff`
- Only translates **missing keys** in the destination file (preserves manual edits)
- Skips URLs, technical strings, and empty values
- Requires `DEEPL_API_KEY` in `.env.local`

**Adding a new translation file:**

1. Create `src/messages/pl/newpage.json` with Polish content
2. Run `pnpm --dir frontend translate` — the EN file will be created automatically

### CSS Variables

All design tokens in `src/styles/variables.module.scss`:

```scss
--font-size-xl: 2.5rem;
--spacing-lg: 2rem;
--container-max-width: 1200px;
--icon-size-md: 24px;
--radius-circle: 999px;
```

### Sanity Studio

The Studio is configured for project `6gulcr1j` and dataset `production`. No custom content schemas are currently defined, and the frontend does not currently query Sanity.

### Email Forms

Contact form configuration in `src/lib/email.ts` using Nodemailer.

### Code Quality

The project uses **ESLint** and **Prettier** to enforce consistent code style.

**Configuration files:**

- `eslint.config.mjs` – ESLint rules (Next.js + TypeScript + Prettier integration)
- `prettier.config.mjs` – Prettier formatting rules
- `.prettierignore` – files excluded from formatting

**Rules summary (Prettier):**

- Double quotes (`"`)
- Semicolons: yes
- Tab width: 2 spaces
- Trailing commas: ES5
- Print width: 100 chars
- End of line: LF

**VS Code integration:**
The `.vscode/settings.json` file configures automatic formatting on save for all developers.
Required extensions:

- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [Prettier – Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)

## Scripts

```bash
pnpm --dir frontend dev
pnpm --dir frontend build
pnpm --dir frontend start
pnpm --dir frontend test:unit
pnpm --dir frontend test:unit:watch
pnpm --dir frontend test:unit:coverage
pnpm --dir frontend lint
pnpm --dir frontend lint:fix
pnpm --dir frontend format
pnpm --dir frontend format:check
pnpm --dir frontend translate
pnpm --dir frontend translate:all
pnpm --dir frontend translate:check
pnpm --dir frontend translate:reverse
```

## Testing

### Unit tests (Vitest)

```bash
pnpm --dir frontend test:unit
```

Coverage report (terminal + HTML):

```bash
pnpm --dir frontend test:unit:coverage
```

## Routing

- `/` - Homepage (PL - default)
- `/en` - Homepage (EN)
- `/en/team` - Team page (EN)
- `/projekty` - Projects (PL)
- `/en/projects` - Projects (EN)

Locale detection via `next-intl` middleware.

## Key Features

- **Bilingual**: Polish (default) + English
- **Content**: Primarily maintained in local frontend source files; Sanity Studio is included separately
- **Responsive**: Mobile-first design
- **SEO Optimized**: Metadata, OpenGraph, sitemap
- **Type-safe**: Full TypeScript coverage
- **CSS Variables**: Centralized design system
- **Form Handling**: Contact forms with reCAPTCHA

## Deployment

The app can be deployed to a compatible Next.js host such as Vercel. Configure the SMTP and reCAPTCHA environment variables in the deployment environment if form submissions should work. DeepL is only needed for translation scripts. Deployment settings and access to external service accounts are not stored in this repository.


## Documentation

- `docs/I18N_IMPLEMENTATION_GUIDE.md` - i18n setup
- `docs/NPM_SCRIPTS.md` - Script documentation
- `docs/COMPONENT_MIGRATION_EXAMPLES.md` - Migration patterns

## License

Proprietary - PUMA Research Group
