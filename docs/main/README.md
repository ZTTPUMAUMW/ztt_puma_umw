# `docs/main` — mapa dokumentacji głównej

Ten katalog jest źródłem prawdy dla decyzji produktowo-architektonicznych.

## Grupowanie dokumentów

### 1) Istniejące dokumenty bazowe

- `PRD.md` — cele produktu, zakres i KPI.
- `project-stack.md` — stack technologiczny i środowisko.
- `project-structure.md` — struktura monorepo i odpowiedzialności katalogów.
- `ROADMAP.md` — plan rozwoju kwartalnego.

### 2) Nowe dokumenty standardów i governance (Q2 2026)

- `documentation-governance.md` — zasady aktualizacji dokumentacji i DoD dla zmian architektonicznych.
- `ai-agent-workflow.md` — operacyjne instrukcje pracy dla agentów AI.
- `architecture-change-log.md` — dziennik zmian architektonicznych (skrót zmian i wpływu).
- `testing-strategy.md` — strategia testów unit i E2E.

### 3) Dokumenty proponowane na kolejne iteracje

- `documentation-backlog.md` — lista brakujących dokumentów z priorytetami i zakresem minimalnym.

## Grupowanie tematyczne względem `ROADMAP.md`

- **Dokumentacja i standardy:** `documentation-governance.md`, `ai-agent-workflow.md`, `architecture-change-log.md`.
- **CMS i migracja danych:** `ROADMAP.md`, `project-structure.md`, (propozycja) `content-model-map.md`.
- **Formularze i bezpieczeństwo:** `PRD.md`, `project-stack.md`, (propozycja) `api-contracts.md`, `observability-and-incidents.md`.
- **Jakość kodu, testy, DevEx:** `documentation-governance.md`, `testing-strategy.md`, (propozycja) `release-checklist.md`.

## Zasady utrzymania

- Przy każdej zmianie architektonicznej należy zaktualizować odpowiednie pliki z tej listy.
- Jeżeli zmiana dotyczy więcej niż jednego obszaru (np. routing + i18n + API), aktualizacja dokumentacji musi objąć wszystkie dotknięte sekcje.
- Każdy PR z etykietą „arch” lub zmianą struktury katalogów powinien zawierać wpis do `architecture-change-log.md`.

## Minimalny pakiet dokumentacyjny dla zmian architektury

1. Aktualizacja co najmniej jednego z: `project-stack.md`, `project-structure.md`, `PRD.md`.
2. Wpis w `architecture-change-log.md`.
3. Weryfikacja zgodności z `documentation-governance.md` (checklista PR).
