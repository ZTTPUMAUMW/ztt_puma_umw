PUMA Research Group — Website

Monorepo for the PUMA Research Group website.

Purpose

- Public-facing website for the research group (biography, team, projects, publications, recruitment, contact).
- Frontend is built with Next.js (App Router), TypeScript and SCSS modules. A Sanity Studio is included, although the current frontend content is primarily stored in local source files.

Repository layout

```
/ (root)
├── frontend/    # Next.js application (App Router, i18n, styles)
├── studio/      # Sanity Studio (content schemas and studio config)
└── README.md    # This file
```

Quick start (developer)

Requirements: Node.js 20+ and Corepack (the repository pins pnpm in `package.json`).

1. Clone the repo and install the workspace dependencies

```bash
git clone <repo-url>
cd next_puma_website
corepack enable
pnpm install
```

2. Start the frontend

```bash
pnpm --dir frontend dev
```

The site is available at `http://localhost:3000`. The basic pages can be run without a `.env.local` file. Email form submissions and reCAPTCHA require the corresponding credentials; see `frontend/README.md`.

3. Sanity Studio (optional, in a separate terminal)

```bash
pnpm --dir studio dev
```

The Studio is configured for Sanity project `6gulcr1j` and dataset `production`. Sign in with a Sanity account that has access to that project. Project access is managed in Sanity, not by copying local environment files.

Testing

- Frontend unit tests use Vitest (for example, `frontend/src/lib/seo.test.ts`).

Run tests from repo root:

```bash
pnpm --dir frontend test:unit
```

Run the frontend linter:

```bash
pnpm --dir frontend lint
```

Environment variables

- `frontend/.env.example` documents the Gmail SMTP and Google reCAPTCHA variables used by the forms.
- DeepL translation commands additionally require `DEEPL_API_KEY` in `frontend/.env.local`.
- The frontend's Sanity project ID and dataset are currently configured in source; no Sanity API token is required by the current frontend code.
- See `frontend/README.md` for setup details and feature-specific requirements.

Where to look next

- `frontend/README.md` — detailed dev instructions, scripts, env variables.
- `studio/README.md` — Sanity Studio setup and schemas.
- `frontend/docs/` — project docs (i18n guide, translation naming, component migration examples).

Contributing

- Follow TypeScript strict mode and existing code style.
- Add tests for significant logic changes and run the frontend linter before pushing: `pnpm --dir frontend lint`.

License

- Proprietary — PUMA Research Group

Contact

- For repo access or deployment, contact the project maintainer or repo owner.
