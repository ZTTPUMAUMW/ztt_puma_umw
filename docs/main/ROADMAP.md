# ROADMAP — next_puma_website

## Założenia

Roadmapa jest oparta na aktualnym stanie kodu (maj 2026) i skupia się na:

- domknięciu spójności contentu (CMS vs dane statyczne),
- poprawie jakości utrzymania,
- zabezpieczeniu ścieżek formularzy,
- dalszym rozwoju i18n oraz UX.

## Q2 2026 — Stabilizacja i porządkowanie

### 1) Dokumentacja i standardy

- Uzupełnienie `docs/main/*` i instrukcji dla agentów/AI.
- Doprecyzowanie zasad aktualizacji dokumentacji przy zmianach architektury.

### 2) i18n i treści

- Audit kompletności kluczy tłumaczeń PL/EN.
- Uporządkowanie workflow tłumaczeń (`translate:check` w CI lub pre-merge).

### 3) Formularze i bezpieczeństwo

- Walidacja limitów uploadu i typów plików dla załączników.
- Ujednolicenie obsługi błędów API (`/api/recruitment`, `/api/cooperation`).

### 4) Jakość kodu

- Włączenie (lub dopracowanie) automatycznych checków lint/format w pipeline PR.
- Przegląd komponentów pod kątem reużywalności i redukcji duplikacji.

## Q3 2026 — Konsolidacja CMS i danych

### 1) Sanity Studio: schema rollout

- Uzupełnienie `studio/schemaTypes/index.ts` o realne schematy treści.
- Definicja modeli danych dla: projekty, publikacje, modele, zespół.

### 2) Migracja danych

- Plan migracji części danych z `frontend/src/data` do Sanity.
- Zachowanie fallbacków frontendu na czas migracji.

### 3) Integracja frontend ↔ CMS

- Ujednolicenie warstwy pobierania danych (`lib/*`) i cache strategy.
- Dopięcie spójnego mapowania pól CMS na komponenty UI.

## Q4 2026 — UX, SEO i wydajność

### 1) UX/UI

- Kontynuacja zmian layoutowych sekcji kart (zgodnie z `docs/refactor/refactor-plan.md`).
- Przegląd dostępności (focus states, kontrast, semantyka).

### 2) SEO i content quality

- Standaryzacja metadata i OpenGraph dla kluczowych podstron.
- Przegląd struktury nagłówków i wewnętrznego linking-u.

### 3) Performance

- Audyt ciężkich assetów i optymalizacja obrazów.
- Kontrola bundle size dla krytycznych tras.

## Q1 2027 — Skalowanie procesu deweloperskiego

### 1) Testowanie

- Rozszerzenie testów jednostkowych dla krytycznych helperów (`lib/`) na kolejne moduły.
- Rozszerzenie smoke testów E2E dla formularzy i głównych ścieżek routingu.

### 2) DevEx

- Uspójnienie skryptów repo-level i instrukcji uruchamiania.
- Lepsze szablony PR i checklisty release.

### 3) Governance

- Ustalenie rytmu przeglądu dokumentacji (`monthly docs health check`).
- Definicja ownerów dla obszarów: i18n, CMS, API forms, styling.

## Backlog (ciągły)

- Rozważenie rozszerzenia języków po stabilizacji PL/EN.
- Rozbudowa analityki produktowej i ścieżek konwersji.
- Możliwa standaryzacja ikonografii, jeśli wzrośnie liczba nowych ikon.
