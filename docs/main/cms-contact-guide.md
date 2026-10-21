# Contact CMS — first editable slice

## Editing locally

1. Open http://localhost:3333 and confirm the title says PUMA Website (development).
2. Open Site settings / Ustawienia strony. Existing public contact details and footer wording are prefilled for a new document. Verify the details, then Publish.
3. Open Contact / Kontakt. Existing page copy and metadata are prefilled for a new document. Verify both languages, then Publish.
4. Open http://localhost:3001/kontakt and http://localhost:3001/en/contact. Reload after publishing. For this initial slice, published content is read at request time without a CMS CDN or persistent page/data cache. Client navigation may reuse its existing view; reload to verify the latest publication.
5. To test editing, change an introductory line in both languages, publish, and reload both pages. Change it back and publish when finished.

Documents have fixed IDs contactPage and siteSettings; duplicates, deletion and unpublishing are hidden in Studio. Both language fields are required, with bounded lengths. Studio UI constraints are not server access controls: an administrator/API client can still modify documents directly.

New documents are prefilled from existing public copy. Opening an editor may create a draft; there is no automatic remote import or overwrite. Draft changes do not appear publicly until Publish. Authenticated draft preview has not been implemented yet.

## Covered content

Contact page: heading, introduction, address/phone/email headings, accessible map title, SEO title and description.

Site settings: department, lab, faculty, university, street and floor; phone number/display; public email; map search address; footer department, lab, description and copyright organization. Contact and footer labels can differ intentionally, preserving current copy. Website email is independent from SMTP/form delivery recipients.

Logos, footer link lists, shared UI labels and global metadata are outside this first slice and remain part of the full-site migration backlog.

## Fetching and fallback

Server-side queries request only exact published IDs with perspective published. No write token is used. React cache deduplicates the combined query within one render; no-store reads bypass persistent caching. Shared footer content means CMS-enabled page rendering is dynamic, an initial simplicity/freshness tradeoff to review before production.

When configuration or documents are missing, individual fields are invalid, or CMS access fails, the pre-migration website copy is used. This is explicitly a temporary migration fallback, not an outage backup or last-successful-content store. An outage can show older copy. Remove/replace this fallback before declaring migration complete. No confidential response bodies or credentials are logged.

Text renders as escaped React content. Telephone/email values are validated; email links are encoded. Maps are constructed from an encoded plain address on a fixed Google origin, not arbitrary embed HTML. Public datasets and asset storage must not contain confidential data.

## Deployment boundaries

All work is on feature/cms-foundation. Local environment files select the development dataset and remain ignored. Nothing should merge to main until reviewed; main deploys live. Production requires explicit CMS environment settings and completed production content initialization. Do not change Vercel production settings merely to test this slice.

## Validation

Run frontend lint, Vitest tests, frontend production build and Studio build/type checks. Check both Contact routes, unaffected pages and footer. Verify publishing with an invited project member; unauthenticated API reads cannot create the starter documents. No SMTP/reCAPTCHA submission is needed for this workflow.
