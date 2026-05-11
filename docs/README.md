# Dokumentacja repo — `next_puma_website`

Poniżej znajduje się grupowanie dokumentów w `docs/` na podstawie obszarów z `docs/main/ROADMAP.md`.

## 1) Dokumenty obowiązujące (utrzymywane na bieżąco)

### A. Produkt i kierunek

- `docs/main/PRD.md` — zakres produktu, cele i KPI (Key Performance Indicators).
- `docs/main/ROADMAP.md` — plan kwartalny i priorytety.

### B. Architektura i baseline techniczny

- `docs/main/project-stack.md` — stack i środowisko.
- `docs/main/project-structure.md` — struktura repo i odpowiedzialności.

### C. Governance i standardy pracy

- `docs/main/documentation-governance.md` — reguły aktualizacji dokumentacji.
- `docs/main/ai-agent-workflow.md` — workflow pracy agentów AI.
- `docs/main/architecture-change-log.md` — historia zmian architektonicznych.
- `docs/main/testing-strategy.md` — strategia testów (Vitest + Playwright).
- `docs/main/README.md` — mapa `docs/main`.

## 2) Dokumenty iteracyjne (plany i propozycje)

### A. Backlog dokumentacyjny

- `docs/main/documentation-backlog.md` — brakujące dokumenty do wdrożenia w kolejnych iteracjach.

### B. Refactor i usprawnienia UI

- `docs/refactor/refactor-plan.md` — plan zmian layoutowych i wizualnych.

## 3) Dokumenty pomocnicze (warsztat i ideation)

### A. Pomysły

- `docs/ideas/ideas.md` — otwarty backlog pomysłów.

### B. Materiały eksperckie / skill-e

- `docs/skills/styling/SKILL.md`
- `docs/skills/styling/skill-alternative.md`

## 4) Mapowanie do obszarów ROADMAP

| Obszar roadmapy             | Dokumenty istniejące / nowe                                                         | Dokumenty proponowane                                |
| --------------------------- | ----------------------------------------------------------------------------------- | ---------------------------------------------------- |
| Dokumentacja i standardy    | `documentation-governance.md`, `ai-agent-workflow.md`, `architecture-change-log.md` | `docs/main/adr/*`                                    |
| i18n i treści               | `PRD.md`, `ROADMAP.md`                                                              | `release-checklist.md`                               |
| Formularze i bezpieczeństwo | `PRD.md`, `project-stack.md`                                                        | `api-contracts.md`, `observability-and-incidents.md` |
| CMS i migracja danych       | `ROADMAP.md`, `project-structure.md`                                                | `content-model-map.md`                               |
| Jakość kodu, testy, DevEx   | `documentation-governance.md`, `testing-strategy.md`                                | `release-checklist.md`                               |

## 5) Reguła utrzymania

- Zmiana architektury/stacku/procesu wymaga aktualizacji odpowiednich dokumentów i wpisu w `docs/main/architecture-change-log.md`.
