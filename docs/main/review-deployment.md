# Development review deployment

The review branch is feature/cms-foundation, tracked in draft PR #18. The existing Vercel project next-puma-website keeps main as its production branch and frontend as its root directory.

Branch-specific Preview variables select project s2jrzn3b, dataset development, and NEXT_PUBLIC_REVIEW_MODE=true. Both email endpoints reject requests in Vercel Preview; the UI disables submit buttons and marks the site as a development review. Preview metadata disables indexing. Production configuration was not changed.

The stable branch URL is https://next-puma-website-git-feature-cms-f-326bca-zttpumaumws-projects.vercel.app . It is protected by Vercel Authentication. A separate 30-day share link is supplied privately in the review handover, not committed to Git. Opening that link stores the access cookie, then normal navigation works without repeating the query parameter. Anyone holding that link can view the preview.

The development Studio is hosted at https://puma-development-s2jrzn3b.sanity.studio and targets project s2jrzn3b / development. It was deployed using a local scoped deployment token; the token is not included in browser bundles or Git. Reviewers use their own existing Sanity membership; this setup does not invite users or change roles. Sanity Free editing membership is Administrator-level and is not technically restricted to development by a Studio's dataset setting.

Reviewer workflow: sign into the development Studio, edit both language versions, publish, then refresh the review website. Unpublished drafts are not displayed. Do not assume experimental content will be copied into production.

Validation: 31 unit tests, lint, frontend build and hosted 18-route checks. The hosted Research page is available and both email POST endpoints return 503 in review mode. Published-content reads are wired to development; the reviewer should verify their first edit by publishing and refreshing the preview.
