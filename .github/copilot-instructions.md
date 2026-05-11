# Copilot Instructions — `next_puma_website`

## 1) Projekt w skrócie

- Monorepo z dwoma głównymi aplikacjami:
  - `frontend/` — Next.js 16 + TypeScript + SCSS Modules + `next-intl`
  - `studio/` — Sanity Studio 4
- Domyślny język: `pl`; drugi język: `en`.
- Strona publiczna grupy badawczej (team, projekty, publikacje, modele, rekrutacja, współpraca, kontakt).

## 2) Priorytety dla zmian

1. **Spójność z dokumentacją** (`docs/main/PRD.md`, `project-stack.md`, `project-structure.md`, `ROADMAP.md`).
2. **Minimalny, celowany zakres zmian** — bez ruszania niepowiązanego kodu.
3. **Bezpieczeństwo formularzy** (`csrf_token`, timing check, `reCAPTCHA`, walidacja danych).
4. **Jakość i18n** — zawsze utrzymywać parytet kluczy `pl`/`en`.
5. **Czytelność i maintainability** ponad „sprytne” rozwiązania.

## 3) Zasady pracy na kodzie

### 3.1 Frontend (`frontend/`)

- Używaj App Router i istniejącego podziału katalogów w `src/app/[locale]`.
- Preferuj istniejące komponenty z `src/components` przed tworzeniem duplikatów.
- Logikę integracji umieszczaj w `src/lib`, nie w komponentach UI.
- Stylowanie: preferuj SCSS Modules w `src/styles`; Tailwind używaj tylko gdy zgodne z istniejącym podejściem pliku.

### 3.2 i18n

- Każda nowa treść user-facing wymaga kluczy w obu językach.
- Trzymaj nazewnictwo kluczy spójne i hierarchiczne.
- Nie usuwaj kluczy bez sprawdzenia ich użycia.

### 3.3 API i formularze

- Zachowuj aktualne mechanizmy ochrony antyspamowej.
- Dodając nowe pola formularza, aktualizuj walidację po stronie serwera.
- Nie loguj danych wrażliwych użytkownika.

### 3.4 Sanity (`studio/`)

- Szanuj fakt, że `schemaTypes` może być w trakcie przebudowy.
- Przy dodawaniu schematów aktualizuj `studio/schemaTypes/index.ts`.

## 4) Konwencje implementacyjne

- TypeScript strict-friendly; unikaj `any`.
- Nazwy zmiennych i funkcji mają być opisowe.
- Unikaj nadmiarowych komentarzy inline; kod ma być samoopisowy.
- Nie wprowadzaj nowych bibliotek bez jasnego uzasadnienia.

## 5) Workflow jakości

- Po zmianach w `frontend/` uruchom co najmniej:
  - `npm run lint`
  - (opcjonalnie) `npm run format:check`
- Po zmianach i18n zweryfikuj:
  - `npm run translate:check`
- Gdy zmiana dotyczy dokumentacji architektonicznej, zaktualizuj odpowiednie pliki w `docs/main/`.

## 5.1) Workflow dokumentacji (obowiązkowy przy zmianach architektury)

- Sprawdź wymagania w `docs/main/documentation-governance.md`.
- Zaktualizuj minimum jeden dokument źródłowy (`PRD.md`, `project-stack.md`, `project-structure.md`) jeśli zmiana wpływa na ich zakres.
- Dodaj wpis do `docs/main/architecture-change-log.md`.
- Jeśli zmiana dotyczy sposobu pracy AI, zsynchronizuj:
  - `docs/main/ai-agent-workflow.md`
  - `.github/copilot-instructions.md`

## 6) Czego unikać

- Nie przenoś plików i nie zmieniaj struktury katalogów bez wyraźnego celu.
- Nie mieszaj dużych refaktorów z małymi poprawkami funkcjonalnymi w jednym PR.
- Nie zostawiaj niespójności między `pl` i `en`.
- Nie nadpisuj istniejących decyzji projektowych (SCSS-first, i18n-first, security w formularzach) bez uzgodnienia.

## 7) Oczekiwany styl odpowiedzi agenta

- Podawaj krótki plan przed zmianami.
- Komunikuj postęp przy dłuższych zadaniach.
- Raportuj dokładnie które pliki zmieniono i dlaczego.
- Proponuj sensowny następny krok (np. lint/test/commit), bez zbędnej gadatliwości.

## 8) Dokumenty referencyjne dla agentów

- `docs/main/README.md`
- `docs/main/documentation-governance.md`
- `docs/main/ai-agent-workflow.md`
- `docs/main/architecture-change-log.md`
