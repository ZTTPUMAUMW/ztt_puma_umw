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
