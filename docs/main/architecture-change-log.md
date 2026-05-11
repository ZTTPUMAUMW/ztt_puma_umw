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
