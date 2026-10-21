# PUMA Website Studio

Lab project: s2jrzn3b. Organization: op2a7psgf.

Copy .env.example to .env.local and confirm that the development dataset exists in Sanity Manage. Both the Studio and CLI require explicit project/dataset configuration; neither falls back to the old starter project or production.

Run from the repository root with pnpm installed:

    pnpm --dir studio dev --host localhost

Open http://localhost:3333 and sign in with your own invited account. If Sanity requests an allowed origin, add exactly http://localhost:3333 under the project's API/CORS settings with credentials enabled. Do not use wildcard origins. The project owner must configure this in Sanity Manage.

All current page, collection, navigation/branding and Research placeholder schemas are available. Starting or building Studio does not migrate content or deploy it. Dataset existence, project membership and authenticated editing still require verification.

For a production Studio build/deployment, explicitly set SANITY_STUDIO_DATASET=production in that environment. The public website's variables are separate, under frontend/.env.local. A production website build does not automatically imply a production CMS dataset.

Never put secrets in SANITY_STUDIO_ or NEXT_PUBLIC_ variables: those prefixes expose values to browser bundles. Studio uses the signed-in person's account; no write token is needed in the browser configuration.

Before production, complete the security/dependency review, approved content migration and initial backup export. Authenticated draft previews are a separate integration from the published-content review playground. Files uploaded to public asset storage must be approved for public access.

## Contact pilot

Contact / Kontakt and Site settings / Ustawienia strony now appear as singleton editors. Open each to initialize current public copy and publish only in development. Both languages must be complete. See ../docs/main/cms-contact-guide.md. See the related collection, marketing and Research guides for the other editors. Authenticated draft preview and production migration remain pending.

## Hosted development review

Studio: https://puma-development-s2jrzn3b.sanity.studio . Select PUMA Website (development), sign in with your invited account, edit both languages, publish and refresh the reviewer website. SANITY_STUDIO_HOST can override the deployment hostname; set an explicit separate hostname for any future production Studio. A scoped Deploy Studio token may be supplied to the CLI through SANITY_AUTH_TOKEN. It must remain local and must never use a SANITY_STUDIO_ or NEXT_PUBLIC_ prefix. See ../docs/main/review-deployment.md.
