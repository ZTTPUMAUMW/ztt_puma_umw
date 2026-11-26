# Browser publishing acceptance

Use development for all edit tests. Sign in as the designated lab editor. Record the document revision, current values, phone/laptop viewport, and result. Prefer an unpublished draft and discard it after testing. For a publish rehearsal, use an approved development change and restore the previous values afterwards.

| Check | Expected result |
| --- | --- |
| Edit one Team bio and replace a portrait | Both languages, card and modal render the correct draft; an anonymous visitor still sees the previous version. |
| Replace one model image and one home banner, adjust crop, edit alt text and localized links | Saved draft reflects the chosen file, crop and language across desktop and phone. Clear the replacement to restore a bundled original. |
| Edit each remaining page, header, footer, contact details and social image | Preview the correct localized route. Check publications sorting, project totals, recruitment tracks and collaboration labels. Shared links resolve to known routes. |
| Edit repository image, video, poster and caption | Score alignment, square framing, silent approved clips and GAME-ViS citation remain correct. |
| Open an invalid/expired preview link or exit a valid session | Invalid grants never enable draft mode. Exit restores published-only rendering. Separate private browsers never inherit draft content. |
| Preview both forms | No CAPTCHA script or outgoing mail; both POST endpoints reject delivery. |
| Publish in development, refresh within 30 seconds | Both public sandbox translations update. Production content and URLs match baseline. Check all nine routes in PL/EN. |
| Editor handover | Zuzanna can find a page, replace media, preview, discard a draft, publish a sandbox edit and correct it independently using only a browser. |

Use Chrome, Firefox and Safari for the new-tab session. After explicit production release approval, repeat the approved editorial smoke test with Zuzanna and record live publication time. Capture backup and rollback locations before rollout. Roll back code and Studio independently; reverting code does not revert CMS edits.

## Environment and recovery

The website uses a server-only Viewer token (SANITY_API_READ_TOKEN) for draft reads. Scope Vercel settings per environment. Configure SANITY_STUDIO_PREVIEW_ORIGIN in development Studio to the exact branch preview origin; production targets pumadott.com. Draft links are short-lived bearer credentials: keep them within the editor session. Ordinary navigation in that session can preview other saved drafts in the same dataset. Use the normal review website for sharing.

Public production and development datasets expose published content; drafts require authorization. Uploaded assets have public CDN URLs. Free human editors need full project Administrator permission; viewers cannot publish. Use named lab accounts. Verify the user's effective role in Manage. Restrict review access in Vercel; no shared editor password.

Git stores source and bundled media. Vercel deployments restore code only. Keep private, asset-inclusive dataset exports in lab-owned restricted storage, record cadence/owner, verify the archive contents, and test restoration in an isolated disposable project with approval. Do not restore into either active dataset. Preserve current document IDs, keys and media paths; this change requires no bulk import.
