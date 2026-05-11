# Testing Strategy — `next_puma_website`

## 1. Cel

Zapewnić szybkie wykrywanie regresji w krytycznych ścieżkach frontendu (`frontend/`) przez połączenie:

- testów jednostkowych (`Vitest`) dla helperów i logiki,
- testów E2E smoke (`Playwright`) dla najważniejszych tras publicznych.

## 2. Zakres aktualny (maj 2026)

### 2.1 Unit tests (Vitest)

- Konfiguracja: `frontend/vitest.config.ts`
- Przykładowy test: `frontend/src/lib/seo.test.ts`
- Środowisko: `node`
- Coverage: provider `v8`, raport tekstowy i HTML.

### 2.2 E2E smoke tests (Playwright)

- Konfiguracja: `frontend/playwright.config.ts`
- Testy: `frontend/e2e/smoke.spec.ts`
- Przeglądarka: Chromium
- Tryb stabilny lokalnie: `workers: 1`, `fullyParallel: false`.

## 3. Komendy

Uruchamiane z root repo:

```bash
npm --prefix ./frontend run test
npm --prefix ./frontend run test:unit
npm --prefix ./frontend run test:unit:watch
npm --prefix ./frontend run test:unit:coverage
npm --prefix ./frontend run test:e2e
npm --prefix ./frontend run test:e2e:ui
npm --prefix ./frontend run test:e2e:headed
npm --prefix ./frontend run test:e2e:report
```

## 4. Minimalna bramka jakości

Dla zmian w `frontend/`:

1. `npm --prefix ./frontend run lint`
2. `npm --prefix ./frontend run test:unit`

Dla zmian wpływających na routing, layout globalny lub strony publiczne:

3. `npm --prefix ./frontend run test:e2e`

## 5. Zasady rozszerzania testów

### 5.1 Kiedy dodać test unit

Dodaj test unit, gdy modyfikujesz:

- funkcje w `frontend/src/lib/*`,
- mapowania tras/SEO,
- parsery i transformacje danych,
- walidacje czystej logiki (bez UI).

### 5.2 Kiedy dodać test E2E

Dodaj/rozszerz smoke test, gdy zmieniasz:

- routing lokalizowany (`/`, `/en`, strony PL/EN),
- krytyczne CTA i nawigację,
- kluczowe strony publiczne (`contact`, `recruitment`, `cooperation`),
- dostępność elementów layoutu (nagłówek, formularze, sekcje krytyczne).

## 6. Dalsze kroki (backlog)

- Rozszerzyć E2E o ścieżki formularzy (`/api/recruitment`, `/api/cooperation`) z bezpiecznym mockowaniem anti-spam.
- Dodać selektywne testy komponentów UI o wysokim ryzyku regresji.
- Uzupełnić `release-checklist.md` o wymagane komendy testowe przed release.
