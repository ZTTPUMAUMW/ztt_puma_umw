# Research vitality media — review update, 2026-10-22

This update implements the manager's annotated screenshot: the site Hero with Research materials subtitle, the same grey introduction section used by Team, a single vitality-scale tab styled like Publications, the table in a rounded image frame like Models, and four parameter columns. Attachments and the obsolete section description are removed from this view.

## Supplied material and optimization

The original 1920×1080 TIFF is preserved as a lossless PNG (6,224,590 → 167,942 bytes). Its source wording is unchanged. A bilingual accessible text table mirrors all 13 scores; the lab should review the manually prepared Polish terminology before release.

Nine videos are grouped Mobility 0–3, Turgor 0–2 and Reaction to stimuli 0–1, sorted numerically. No melanization video was supplied; that column refers to the table. Original durations of approximately 2.6–10.35 seconds are retained rather than cutting observations to fit an earlier 3–5 second estimate.

Original H.264 video packets are copied without re-encoding. Audio remains present, re-encoded as AAC at 96 kbit/s, and MP4 metadata is moved to the front for streaming. Total video size is 6,117,516 → 2,806,887 bytes (54% smaller). All nine decoded-frame hashes match the originals. Poster previews and preload=none avoid downloading all videos on page load; playback is user initiated, with native fullscreen controls.

## CMS editing

Research / Badania now includes Table image and Vitality parameters. Each parameter has bilingual title/note, accessible scale descriptions, and scored videos with bilingual captions, optional MP4 replacement and preview image. Supplied assets remain until replaced. Empty published parameter/video lists remain empty; scores are shown lowest first. Existing legacy placeholder fields remain hidden for compatibility.

The supplied media are stored in the private Git review branch and served through the protected Vercel preview. No source file was uploaded to Sanity's public CDN. Optional CMS replacement uploads are public Sanity assets; upload only files approved for that sharing scope. Production release remains a separate approval.

Checks: 35 unit tests, frontend lint and TypeScript, Studio TypeScript, both production builds, decoded-frame integrity, native browser playback, accessible 13-row table, PL/EN page rendering and mobile layout without horizontal overflow. See the PR for hosted review details.
