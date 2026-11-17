# CMS collection pages: editor guide

## First publication in development

1. Refresh http://localhost:3333 and confirm the header says development.
2. Open Team / Zespół, Projects / Projekty, Publications / Publikacje, or Models / Modele.
3. A new page starts with existing website content: 10 team members, 3 projects, 44 publications and 7 models. Nothing overwrites an existing document automatically.
4. Entries are under the Entries tab. Open an entry to edit it. Drag entries to reorder; use the array controls to add or remove an entry. The entire page is published together.
5. Page labels and Search engines contain headings, filter labels and localized metadata. Polish and English text are entered manually.
6. Publish the page, then reload its local website route. Drafts are not shown on public pages. Authenticated draft preview is still pending.

| Editor       | Polish URL                       | English URL                           |
| ------------ | -------------------------------- | ------------------------------------- |
| Team         | http://localhost:3001/zespol     | http://localhost:3001/en/team         |
| Projects     | http://localhost:3001/projekty   | http://localhost:3001/en/projects     |
| Publications | http://localhost:3001/publikacje | http://localhost:3001/en/publications |
| Models       | http://localhost:3001/modele     | http://localhost:3001/en/models       |

If the site redirects to your previously selected language, use its PL/EN switcher.

## Content conventions

- Team members have a shared name/category, paired position/biography/title fields, optional profile links and a photo. The list order controls order within each category.
- Projects have manual bilingual text, numeric funding amounts, an ISO currency code, a logo and ordered team roles. Totals are calculated separately for each currency; no currency conversion is implied. The legacy partners label displays funder acronyms and can be renamed by the editor.
- Publications retain the original bibliographic title, authors, journal, DOI, year/month and HTTPS article link. Author names use the existing " and " separator. Publication year filters are generated from entries, and results sort by year/month. Drag order breaks ties within the same year/month.
- Model descriptions are rich text in both languages, supporting numbered/bulleted lists, bold and italics. Scientific names remain italicized safely on the website.
- Existing image files remain in Git. Upload a new raster image to replace a photo, logo or model image. Image descriptions are bilingual where applicable. Uploads go to the selected dataset; they are intended for public website assets. Original TIFF/research file access rules remain a separate undecided topic.

## Expected behavior and limits

Each page is a single document with an embedded ordered list, appropriate to the current small collections. This provides atomic publishing and simple initial population; entries are not yet separate reusable Sanity documents. Lists are limited to 1,000 entries. Separate documents/search/pagination can be introduced if the collection grows substantially.

Only exact published page IDs are queried. Shared Contact/site settings remain independent. Removing all entries from a published page leaves its list empty; old entries are not restored from fallback data. Missing/unavailable page documents temporarily use existing checked-in content while migration is incomplete. This fallback is not a backup or last-successful-content store.

Images are limited by the website to this Sanity project's image CDN; local legacy paths are checked. External content links require HTTPS. User-authored text is escaped by React; arbitrary HTML is not rendered. Rich text uses a small supported set of marks/lists. Browser credentialed draft preview and production publishing are not part of this change.

## Review before production

- Publish each page in development and test one PL/EN edit, reorder, removal and image replacement where applicable.
- Verify the authoritative text with the lab: source translations were preserved rather than rewritten.
- Review the runtime cache/outage strategy: CMS reads bypass the CDN and persistent cache for immediate reload freshness.
- Preserve separate backups/exports before migrating final content. Do not merge to main until review; main deploys live.
