# Home, Recruitment and Cooperation CMS guide

Local Studio: http://localhost:3333 — choose **PUMA Website (development)**.
Local website: http://localhost:3001/en (English) or http://localhost:3001/ (Polish; use the language switcher if your saved preference redirects you).

## First publication

1. Refresh Studio. Open Home / Strona główna, Recruitment / Rekrutacja and Cooperation / Współpraca in the sidebar.
2. Each new page starts with the existing website content in both languages. Check Cards and lists, Page and form labels, and Search engines.
3. Publish each document in development. This does not change the live website.
4. Change a short sentence in both languages, publish, then refresh the matching local page. Restore the original sentence after testing if desired.

## What editors control

- Home: hero buttons, news banners and images, information cards, research areas, feature cards, quick links, funder logos, closing buttons, headings and SEO. The closing section is shared with Models.
- Recruitment: benefits, recruitment paths, descriptions and preparation requirements, form labels and SEO. Each path also becomes an application form subject. Names must be 5–200 characters in both languages. Removing every path disables recruitment form access.
- Cooperation: offer cards, scope topics, page text, form labels and SEO.
- Drag array items to reorder them; add or remove items without code. Empty published lists stay empty. Existing images remain until an upload replaces them.
- Internal buttons choose from known website pages, preserving translated URLs. External banner/funder links require HTTPS. Upload raster images; original SVG funder logos remain available.
- Enter plain text. Keep parameters such as {number}, {min}, {max} and {count} exactly as shown in form and accessibility labels. Studio validates these; the website falls back to the original label if malformed data bypasses validation.

## Boundaries

This is published-content testing against development. Drafts are not yet shown on the website; authenticated draft preview/staging is a later step. The frontend reads published documents without a browser API token. Public datasets and assets must not hold confidential material. Gmail SMTP recipients, credentials and reCAPTCHA secrets remain environment configuration, outside editorial CMS fields.

The full-site migration still needs shared navigation/footer links and branding, Research placeholders, preview/staging, backups and a security review before production release. Form submissions were not tested against Gmail because local credentials are intentionally blank.

Changes remain local on feature/cms-foundation, with no main push or deployment.
