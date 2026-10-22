# Project Structure — next_puma_website

## 1. Widok wysokopoziomowy

```text
next_puma_website/
├── docs/                         # Dokumentacja produktowa i techniczna
│   ├── ideas/
│   ├── main/
│   ├── refactor/
│   └── skills/
├── frontend/                     # Publiczna aplikacja Next.js
├── studio/                       # Sanity Studio (CMS)
├── README.md
└── package.json                  # Root (minimalne zależności)
```

## 2. `frontend/`

```text
frontend/
├── src/
│   ├── app/
│   │   ├── [locale]/             # Strony lokalizowane
│   │   │   ├── page.tsx
│   │   │   ├── team/
│   │   │   ├── projects/
│   │   │   ├── publications/
│   │   │   ├── models/
│   │   │   ├── recruitment/
│   │   │   ├── cooperation/
│   │   │   └── contact/
│   │   └── api/
│   │       ├── recruitment/route.ts
│   │       └── cooperation/route.ts
│   ├── components/               # Komponenty UI
│   ├── data/                     # Dane statyczne (np. team/models/projects)
│   ├── hooks/                    # Hooki React
│   ├── i18n/                     # Konfiguracja locale + routing
│   ├── lib/                      # Integracje (email, recaptcha, seo, utils)
│   ├── messages/                 # Tłumaczenia JSON (pl/en)
│   ├── styles/                   # SCSS modules
│   └── proxy.ts
├── public/                       # Assety statyczne (obrazy, ikony)
├── scripts/                      # Narzędzia pomocnicze (translation/commit)
├── docs/                         # Dokumentacja frontendowa
└── config files                  # next, tsconfig, eslint, prettier, tailwind
```

### Odpowiedzialności

- `src/app/[locale]` — warstwa stron i kompozycja sekcji.
- `src/components` — wielokrotnego użytku elementy widoku.
- `src/lib` — kod infrastrukturalny i integracyjny.
- `src/messages` — źródło treści i18n.
- `src/styles` — system stylów oparty o SCSS Modules.

## 3. `studio/`

```text
studio/
├── schemaTypes/
│   └── index.ts                  # Eksport typów schematów
├── sanity.config.ts              # Konfiguracja projektu Sanity
├── sanity.cli.ts
├── static/
└── README.md
```

### Uwaga

- Obecnie `schemaTypes/index.ts` eksportuje pustą tablicę (`schemaTypes = []`), co oznacza brak aktywnych schematów treści w Studio.

## 4. `docs/`

- `docs/main/` — główna dokumentacja produktu i projektu.
  - `README.md` — mapa dokumentów i minimalny pakiet aktualizacji.
  - `documentation-governance.md` — polityka aktualizacji dokumentacji.
  - `ai-agent-workflow.md` — operacyjny workflow pracy agentów AI.
  - `architecture-change-log.md` — dziennik zmian architektonicznych.
- `docs/refactor/` — plany techniczne/refaktoryzacyjne.
- `docs/skills/` — notatki i materiały rozwojowe.
- `docs/ideas/` — backlog idei.

## 5. Konwencje organizacyjne

- Monorepo, ale niezależny lifecycle dla `frontend/` i `studio/`.
- Dokumentacja powinna być aktualizowana przy zmianach architektury.
- Preferowany podział: logika biznesowa w `lib/`, prezentacja w `components/` i `app/`.

## Contact CMS pilot structure — 2026-10-20

Studio schemaTypes now includes localizedText, contactPage and siteSettings. structure.ts exposes fixed singleton editors; initialValues.ts preserves current copy for new documents. Frontend src/lib/cms.ts is the server-only published-content loader; cms-content.ts validates/localizes the boundary; cms-defaults.json is a temporary migration fallback. ContactContent.tsx retains the interactive presentation, while the Contact route and metadata load content on the server. Locale layout supplies shared footer text. See cms-contact-guide.md.

## CMS collection pages — 2026-10-20

studio/schemaTypes/collectionPages.ts defines four singleton pages with embedded ordered entries and bilingual copy; collectionInitialValues.json stores starter content. Frontend cms-collection-loader.ts fetches exact published page IDs; cms-collections.ts normalizes content and derived filters/totals; cms-collection-defaults.json is a temporary fallback. TeamContent, ProjectsContent, PublicationsContent and ModelsContent retain page interactions. ScientificText/RichText provide safe formatting. Existing data modules/assets are preserved. See cms-collections-guide.md.

## Marketing CMS migration — 2026-10-20

Added studio/schemaTypes/marketingPages.ts and marketingInitialValues.json; frontend/src/lib/cms-marketing{,-loader,-defaults,-test} (matching file extensions) plus RecruitmentContent/CooperationContent and CMS-backed home components. See cms-marketing-guide.md for publishing steps.

## Navigation and Research — 2026-10-21

Added sharedPages.ts/sharedInitialValues.json in Studio and cms-shared normalization/defaults/loader/tests in frontend. Locale layout supplies shared CMS content to Header/Footer. Added the research route, localized routing and SEO mapping, and research.module.scss. See cms-research-guide.md.

## Research review feedback — 2026-10-22

Added cms-research.ts for media normalization and researchMedia.ts for CMS table/parameter/grade/video objects. Supplied optimized copies and posters live in frontend/public/research/vitality. Research reuses Team introduction and Publications navigation styles. See research-media-review.md.


## 2026-10-22 — Mock Excel download

Research download assets: frontend/public/research/downloads/research-mock-data.xlsx supplies the fictional review workbook. The Research singleton exposes an optional replacement file and show/hide control.
