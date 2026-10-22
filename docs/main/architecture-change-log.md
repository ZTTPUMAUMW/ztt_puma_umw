# Architecture Change Log — `next_puma_website`

Krótki dziennik zmian architektonicznych, który ułatwia śledzenie decyzji i ich wpływu.

## Jak dodawać wpis

Każdy wpis powinien zawierać:

- datę,
- obszar zmiany,
- opis decyzji,
- wpływ na kod/dokumentację,
- powiązany PR/commit.

## Wpisy

### 2026-05-03 — Wdrożenie i dokumentacja strategii testów frontend

- **Obszar:** jakość kodu i proces testowania (`frontend/`).
- **Decyzja:** przyjęto bazowy zestaw testów: `Vitest` (unit) + `Playwright` (E2E smoke) oraz stabilną konfigurację lokalnego uruchamiania E2E.
- **Wpływ na kod:** dodano konfiguracje testów i podstawowe testy smoke/unit w `frontend/`.
- **Wpływ na dokumentację:** zaktualizowano `README.md`, `docs/README.md`, `docs/main/project-stack.md`, `docs/main/README.md`, `docs/main/ROADMAP.md` i dodano `docs/main/testing-strategy.md`.
- **Powiązanie:** branch `LS-29`.

### 2026-05-03 — Reorganizacja mapy dokumentacji wg ROADMAP

- **Obszar:** struktura i grupowanie dokumentów `docs/`.
- **Decyzja:** uporządkowano dokumenty na grupy: bazowe, governance/standardy, iteracyjne/proponowane, pomocnicze.
- **Wpływ na kod:** brak zmian runtime.
- **Wpływ na dokumentację:** dodano `docs/README.md`, zaktualizowano `docs/main/README.md` i `docs/main/documentation-backlog.md`.
- **Powiązanie:** branch `LS-29`.

### 2026-05-03 — Standaryzacja dokumentacji i workflow AI

- **Obszar:** dokumentacja główna i standardy pracy agentów.
- **Decyzja:** dodano formalne zasady aktualizacji dokumentacji przy zmianach architektury oraz dedykowany workflow AI.
- **Wpływ na kod:** bez zmian runtime; zmiany wyłącznie w `docs/main/*` i instrukcjach dla agenta.
- **Wpływ na dokumentację:** dodano `documentation-governance.md`, `ai-agent-workflow.md`, `README.md` w `docs/main/`.
- **Powiązanie:** branch `LS-29`.

### 2026-10-20 — Explicit CMS environment configuration

- Area: Studio/CLI and frontend CMS client configuration.
- Decision: replace hardcoded starter identifiers with explicit environment variables for the lab-owned project. Local setup selects development; production requires explicit configuration.
- Impact: add env templates, keep local secrets ignored, restrict the public client to published documents. No schema migration, remote mutations or deployment.
- Documentation: project-stack.md, frontend/README.md and studio/README.md.
- Branch: feature/cms-foundation.

### 2026-10-20 — Bilingual Contact and shared settings pilot

- Area: CMS schemas, content loading, Contact metadata/UI, shared footer wording.
- Decision: fixed singleton editors with existing copy prefilled; required PL/EN fields; server-only published reads; temporary local fallback during migration.
- Impact: CMS-enabled routes render dynamically for request-time freshness; no new dependencies, draft exposure or production writes. Public contact email remains separate from SMTP recipients.
- Validation: see cms-contact-guide.md; content-boundary tests cover language selection, malformed values and safe generated links.
- Branch: feature/cms-foundation.

### 2026-10-20 — Team, Projects, Publications and Models CMS editors

- Decision: four singleton pages with embedded ordered lists, bilingual copy and SEO, initialized from existing content without automatic remote overwrites. Page-level publishing fits the current small collections.
- Rendering: server-published reads, validated serializable content, project-scoped image URLs, escaped scientific text and structured model lists. Dynamic years and per-currency numeric funding totals remove code changes for routine updates.
- Preserved: 10 people, 3 projects, 44 publications, 7 models, original data modules/assets and existing Contact work.
- Validation: collection migration/safe-rendering tests, type/lint/schema/build checks and browser interactions. See cms-collections-guide.md.
- Branch: feature/cms-foundation; no production deployment.

## Marketing CMS migration — 2026-10-20

Area: Home, Recruitment, Cooperation and shared Models closing section. Decision: fixed bilingual page documents with editable ordered content arrays, inherited design and published-only server reads. Runtime validates external HTTPS/internal routes and message placeholders; removed raw HTML injection from ResearchAreas. Validation: 23 unit tests, frontend/Studio TypeScript and production builds, bilingual route and browser checks. See cms-marketing-guide.md. Branch: feature/cms-foundation; no deployment.

## Navigation and Research — 2026-10-21

Decision: separate siteChrome singleton for shared menus, branding and UI labels, keeping contact data in siteSettings. Research is a bilingual singleton with explicit placeholders and no real file exposure pending access policy. Added /badania and /en/research to routing/SEO and route allowlists. Header switches to the mobile menu below 1201px to accommodate Research. Verification: shared-content boundary tests, bilingual routes, browser checks and frontend/Studio builds. Branch: feature/cms-foundation; no production deployment.

## Review deployment isolation — 2026-10-21

Vercel Preview deployments reject both email POST endpoints before parsing requests; an explicit review flag also supports a standalone review site. The UI marks the development site and disables submit buttons. Preview metadata prevents indexing, and the Sanity client rejects non-development datasets on Preview. Production behavior is unchanged. Branch: feature/cms-foundation.

## Hosted development Studio — 2026-10-21

Published the development Studio at https://puma-development-s2jrzn3b.sanity.studio, using a dedicated development hostname and the existing lab project/development dataset. Deployment credentials stay local and are absent from built browser files. No reviewer roles, production content or main branch changes. The frontend remains a protected Vercel Preview with its 30-day reviewer share link.

## Research review feedback — 2026-10-22

Decision: retain provided research media in the private review branch, served through protected deployment URLs rather than uploading to Sanity public storage. Add editable Research parameter/grade/video schemas and validated project-scoped media URLs; preserve intentionally empty lists. Convert TIFF losslessly and optimize audio/container without changing decoded video frames. Reuse existing Team/Publication design patterns per review. Validation and metrics: research-media-review.md. Branch: feature/cms-foundation; main unchanged.


## 2026-10-22 — Research video framing and silence

Cropped all nine supplied clips to their bright recording surface, removed every audio stream, regenerated posters and removed the player height cap to preserve natural proportions. High-quality H.264 CRF 18 replaces the previous stream-copy optimization. Originals remain untouched; no new runtime dependency or CMS schema change.


## 2026-10-22 — Mock Excel download

Added a mock Excel workbook download to Research, bilingual download text, optional CMS replacement and visibility control. Only .xlsx assets from the approved local directory or project Sanity CDN resolve. No real research data or new runtime dependency added.


## 2026-10-22 — Files draft review

Visible navigation, page title and Studio editor now use Files / Pliki (working title). The subtitle is Supplementary materials and additional files, with a Polish translation. Existing /en/research and /badania URLs and CMS IDs are retained. The editable HTML scale table is always visible; the image table is no longer rendered, and its legacy upload field is hidden. The four parameter headings and their section heading are centered. Melanization images are pending from the lab; no substitute scientific images were invented.
