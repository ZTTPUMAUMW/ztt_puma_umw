PUMA Research Group — Website

Monorepo for the PUMA Research Group website.

Purpose
- Public-facing website for the research group (biography, team, projects, publications, recruitment, contact).
- Frontend is built with Next.js (App Router), TypeScript and SCSS modules; dynamic content is served from Sanity CMS.

Repository layout
```
/ (root)
├── frontend/    # Next.js application (App Router, i18n, styles)
├── studio/      # Sanity Studio (content schemas and studio config)
└── README.md    # This file
```

Quick start (developer)
1. Clone the repo

```bash
git clone <repo-url>
cd next_puma_website
```

2. Frontend (development)

```bash
cd frontend
npm install
npm run dev       # starts Next.js dev server (localhost:3000)
```

3. Sanity Studio (development)

```bash
cd studio
npm install
npm run dev       # starts Sanity Studio
```

Environment variables
- See `frontend/README.md` for the frontend-specific `.env.local` keys (Sanity, SMTP, reCAPTCHA, DeepL).
- See `studio/README.md` for Studio-specific env and credentials.

Where to look next
- `frontend/README.md` — detailed dev instructions, scripts, env variables.
- `studio/README.md` — Sanity Studio setup and schemas.
- `frontend/docs/` — project docs (i18n guide, translation naming, component migration examples).

Contributing
- Follow TypeScript strict mode and existing code style.
- Add tests for any significant logic change and run linters before push: `npm run lint` (frontend).

License
- Proprietary — PUMA Research Group

Contact
- For repo access or deployment, contact the project maintainer or repo owner.