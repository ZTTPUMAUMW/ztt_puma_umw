# PUMA Website Studio

Lab project: s2jrzn3b. Organization: op2a7psgf.

Copy .env.example to .env.local and confirm that the development dataset exists in Sanity Manage. Both the Studio and CLI require explicit project/dataset configuration; neither falls back to the old starter project or production.

Run from the repository root with pnpm installed:

    pnpm --dir studio dev --host localhost

Open http://localhost:3333 and sign in with your own invited account. If Sanity requests an allowed origin, add exactly http://localhost:3333 under the project's API/CORS settings with credentials enabled. Do not use wildcard origins. The project owner must configure this in Sanity Manage.

The Contact and Site settings schemas are available; the remaining page schemas are pending. Starting or building Studio does not migrate content or deploy it. Dataset existence, project membership and authenticated editing still require verification.

For a production Studio build/deployment, explicitly set SANITY_STUDIO_DATASET=production in that environment. The public website's variables are separate, under frontend/.env.local. A production website build does not automatically imply a production CMS dataset.

Never put secrets in SANITY_STUDIO_ or NEXT_PUBLIC_ variables: those prefixes expose values to browser bundles. Studio uses the signed-in person's account; no write token is needed in the browser configuration.

Before production, configure authenticated draft previews, content schemas, data migration and backup exports. Files uploaded to public asset storage must be approved for public access.

## Contact pilot

Contact / Kontakt and Site settings / Ustawienia strony now appear as singleton editors. Open each to initialize current public copy and publish only in development. Both languages must be complete. See ../docs/main/cms-contact-guide.md. Draft preview, other pages and full migration remain pending.
