# Navigation, branding and Research — development guide

Studio: http://localhost:3333. Verify PUMA Website (development) before publishing.
Research: http://localhost:3001/en/research (English), http://localhost:3001/badania (Polish). Use the language switcher if a saved language preference redirects you.

## Publish and test

1. Refresh Studio. Open Navigation and branding. It starts with the existing menus and footer links plus Research.
2. Reorder or rename links in both languages. Choose an internal page from the list, or leave it blank and supply HTTPS external URLs in both languages. Empty lists stay empty. Logo uploads are optional; the originals remain until replaced.
3. Publish in development, refresh the local website and check desktop/mobile menus and footer links. Research uses /badania in Polish and /en/research in English.
4. Open Research / Badania. Check both language versions of every description, heading, SEO field and clip placeholder. Publish and verify the local Research page. Reorder/add/remove placeholder clips as needed.

Research contains a description, an Excel attachment placeholder, a vitality-scale description/table placeholder and three short-video placeholders. There is no active download, real image or video upload yet: file access remains an open decision. This avoids uploading research material to a public dataset before its sharing policy is agreed. Real content and translations remain the lab's responsibility.

Navigation/branding is a separate singleton from Site settings; Site settings continues to own contact details and footer organization wording. New documents are prefilled from the current website. Publishing development content has no effect on the live site. Publishing drafts to a staging preview remains the next integration phase.

Remaining before production: agree public/restricted file access; implement real Research media; authenticated draft preview/staging; CMS backups; security/dependency review; reviewed production migration. Nothing has been pushed to main.
