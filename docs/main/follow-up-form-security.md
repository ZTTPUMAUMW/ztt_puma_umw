# Follow-up: harden recruitment and cooperation forms

Owner: website maintainers. Track independently of the CMS release.

Both server endpoints currently accept a client-generated CSRF string after a length check; submission throttling is primarily browser-local. Validate request origin and session as appropriate, rate limit server-side, enforce attachment type, count and total size before buffering, escape user text in HTML email, and verify expected CAPTCHA hostname and action. Keep recipients and credentials server-only. Add defensive regression tests using a mock mail transport, with preview delivery always disabled. Acceptance requires valid submissions still work in PL/EN and rejected requests never trigger email.
