# Production CMS setup

Production and development use the same Sanity project, s2jrzn3b, with separate datasets and Studios:

| Environment | Dataset | Studio |
| --- | --- | --- |
| Production | production | https://puma-production-s2jrzn3b.sanity.studio/ |
| Review | development | https://puma-development-s2jrzn3b.sanity.studio/ |

Production Vercel settings are NEXT_PUBLIC_SANITY_PROJECT_ID=s2jrzn3b, NEXT_PUBLIC_SANITY_DATASET=production and NEXT_PUBLIC_REVIEW_MODE=false. These are public configuration values, not credentials. Existing SMTP and reCAPTCHA settings are retained. Setting variables does not redeploy an existing deployment; the next successful main deployment will use them.

Eleven singleton documents were initialized in production from the reviewed repository defaults: Contact, Site settings, Team, Projects, Publications, Models, Home, Recruitment, Cooperation, Navigation/branding and Files. Development experiments, uploaded assets and drafts were not copied. Original website assets remain served from the repository. The Files page displays four supplied melanization images and nine cropped, silent clips. The Downloads section and bundled mock workbook have been removed from the current review.

The initialization uses createIfNotExists and an empty-content check; Sanity internal system documents are excluded. Pre-import and post-import NDJSON snapshots and an exact-content manifest are stored outside Git in the task's production-cms output folder. They are initial content snapshots, not a recurring backup service. Existing repository media and code remain in Git. Future Sanity uploads need asset-inclusive backups.

## Editor workflow

Sign into the production Studio with the existing invited Sanity account, confirm the title says production, edit both language versions and click Publish. After the CMS-enabled main deployment, refresh the public website to see the published content. Published-content queries use no-store and bypass the API CDN; no code push, deployment webhook or browser write token is required. Unpublished drafts do not appear.

Use the development Studio for experiments and the protected feature-branch review URL to inspect its published development content. Publishing in development does not promote content to production. Until a dedicated draft-preview/promotion workflow is implemented, apply approved edits separately in production. Membership is project-level on the present plan; a separate Studio is an environment distinction, not an access restriction.

## Launch and validation

PR #18 remains unmerged pending review. Merge to main triggers Vercel Production. After its successful deployment, verify pumadott.com in PL/EN, confirm the review banner is absent, confirm a published production edit appears and a development edit does not, and check existing form integrations without sending unsolicited messages. The pre-merge production-configured local build checks CMS integration, but cannot establish the outcome of a future live deployment.

Before launch, retain the content snapshot and choose whether the visible mock download and supplied clips are approved for public release. The temporary import token is not used by the website or Studio; revoke it after the integration check. No token belongs in NEXT_PUBLIC_ or SANITY_STUDIO_ variables.

Security/dependency review, recurring backups, and the proposed code cleanup are separate work. The production setup does not claim those are complete.
