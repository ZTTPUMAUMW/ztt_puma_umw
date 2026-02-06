# PUMA Research Group Website

Next.js 16 application with TypeScript, Sanity CMS, and i18n support (Polish/English).

## Tech Stack

- **Framework**: Next.js 16.0.7 (App Router, React 19)
- **Language**: TypeScript 5
- **CMS**: Sanity Studio
- **Styling**: SCSS Modules + Tailwind CSS 4
- **i18n**: next-intl 4.7.0
- **Email**: Nodemailer
- **Translation**: DeepL API

## Project Structure

```
frontend/
├── src/
│   ├── app/[locale]/          # Next.js App Router with locale prefix
│   │   ├── page.tsx           # Homepage
│   │   ├── team/              # Team page
│   │   ├── projects/          # Projects page (Sanity)
│   │   ├── publications/      # Publications page (Sanity)
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
- npm/pnpm

### Environment Variables

Create `.env.local`:

```bash
# Sanity
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_token

# Email (SMTP)
SMTP_HOST=smtp.example.com
SMTP_PORT=587
SMTP_USER=your_email
SMTP_PASS=your_password
EMAIL_FROM=noreply@example.com
EMAIL_TO=contact@example.com

# Google reCAPTCHA
NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
RECAPTCHA_SECRET_KEY=your_secret_key

# DeepL (optional - for translations)
DEEPL_API_KEY=your_deepl_key
```

### Installation

```bash
# Install dependencies
npm install

# Development server
npm run dev

# Production build
npm run build
npm start

# Run Sanity Studio (in separate terminal)
cd studio
npm run dev
```

## Development

### Adding Translations

1. Edit JSON files in `src/messages/[locale]/`
2. Use `useTranslations` hook in components
3. Run translation script (optional): `npm run translate`

### CSS Variables

All design tokens in `src/styles/variables.module.scss`:

```scss
--font-size-xl: 2.5rem;
--spacing-lg: 2rem;
--container-max-width: 1200px;
--icon-size-md: 24px;
--radius-circle: 999px;
```

### Sanity Content

Content schemas in `studio/schemaTypes/`:
- `project.ts` - Research projects
- `publication.ts` - Scientific publications  
- `model.ts` - Research models

Query examples in `src/lib/sanity.ts`

### Email Forms

Contact form configuration in `src/lib/email.ts` using Nodemailer.

## Scripts

```bash
npm run dev           # Start dev server (localhost:3000)
npm run build         # Production build
npm run start         # Start production server
npm run lint          # Run ESLint
npm run translate     # DeepL translation helper
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
- **CMS Integration**: Sanity for dynamic content
- **Responsive**: Mobile-first design
- **SEO Optimized**: Metadata, OpenGraph, sitemap
- **Type-safe**: Full TypeScript coverage
- **CSS Variables**: Centralized design system
- **Form Handling**: Contact forms with reCAPTCHA

## Deployment

Optimized for Vercel:
- ISR for Sanity content
- Edge middleware for i18n
- Automatic builds on push

## Documentation

- `docs/I18N_IMPLEMENTATION_GUIDE.md` - i18n setup
- `docs/NPM_SCRIPTS.md` - Script documentation
- `docs/COMPONENT_MIGRATION_EXAMPLES.md` - Migration patterns

## License

Proprietary - PUMA Research Group
