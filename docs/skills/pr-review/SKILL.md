# SKILL: PR Review

## Cel

Wykonuj merytoryczny review PR-ów w `next_puma_website` tak, aby:

- utrzymać mały i celowany zakres zmian,
- chronić i18n parity (`pl`/`en`) i bezpieczeństwo formularzy,
- wymuszać zgodność kodu z `docs/main/*`,
- dawać autorowi PR jasną listę poprawek w kolejności priorytetów.

## Kontekst projektu (must-know)

- Monorepo: `frontend/` (Next.js 16 + TS + SCSS + `next-intl`) i `studio/` (Sanity 4).
- Domyślne locale: `pl`, dodatkowe: `en`.
- Priorytety: i18n-first, security formularzy (`csrf_token`, timing check, `reCAPTCHA`), minimalny diff.
- `docs/main/*` to źródło prawdy dla decyzji architektonicznych i procesowych.

## Procedura review (wykonaj w tej kolejności)

### Krok 1 — zmapuj zakres zmian

Uruchom:

```bash
git diff main --name-only
git diff main --stat
```

Jeśli brak różnic do `main`, użyj:

```bash
git status
git diff --cached --name-only
```

Następnie przejrzyj pełny diff:

```bash
git diff main
```

Cel: zrozumieć _co_ się zmieniło oraz czy PR nie miesza niezwiązanych tematów.

### Krok 2 — przypnij zmiany do dokumentacji

Sprawdź zgodność z:

- `docs/main/PRD.md`,
- `docs/main/project-stack.md`,
- `docs/main/project-structure.md`,
- `docs/main/ROADMAP.md`,
- `docs/main/documentation-governance.md`,
- `docs/main/ai-agent-workflow.md`.

Zastosuj macierz `zmiana → dokument` z `documentation-governance.md`.
Jeśli PR zmienia architekturę/stack/proces i brak aktualizacji dokumentacji, oznacz to jako issue do poprawy.

### Krok 3 — oceń reguły krytyczne (policy gates)

#### 3.1 i18n gate

- Każda nowa treść user-facing ma klucze w `pl` i `en`.
- Nazwy kluczy są spójne i hierarchiczne.
- Nie usunięto kluczy bez sprawdzenia użycia.

#### 3.2 Security gate (formularze/API)

- Dla zmian w formularzach/API zachowano: `csrf_token`, timing check, `reCAPTCHA`, walidację serwerową.
- Nie logowano danych wrażliwych.
- Przy nowych polach formularza zaktualizowano walidację po stronie serwera.

#### 3.3 Architecture/Docs gate

- Przy zmianach architektonicznych zaktualizowano co najmniej jeden dokument źródłowy (`PRD.md` / `project-stack.md` / `project-structure.md`).
- Dodano wpis do `docs/main/architecture-change-log.md` (jeśli dotyczy).
- Przy zmianach workflow AI zsynchronizowano `ai-agent-workflow.md` i `.github/copilot-instructions.md`.

### Krok 4 — oceń jakość implementacji

- Zmiana jest minimalna i celowana (bez pobocznych refaktorów).
- Logika integracji jest w `frontend/src/lib`, nie w komponentach UI.
- Styl i strukturę zachowano zgodnie z istniejącym kodem.
- Nie dodano nowej biblioteki bez uzasadnienia.

### Krok 5 — weryfikacja jakości (commands)

W zależności od zakresu PR poproś o wyniki lub uruchom:

```bash
cd frontend
npm run lint
```

Jeśli zmiany dotykają tłumaczeń:

```bash
cd frontend
npm run translate:check
```

Opcjonalnie dla formatowania:

```bash
cd frontend
npm run format:check
```

Dla zmian w `studio/` zweryfikuj adekwatny lint/build zgodnie z `studio/package.json`.

### Krok 6 — wydaj werdykt i listę akcji

Nadaj jeden status:

- `APPROVE` — brak istotnych zastrzeżeń,
- `REQUEST_CHANGES` — są blokery,
- `COMMENT` — uwagi nieblokujące.

Każdą uwagę opisz przez:

1. **Severity:** `blocker` / `major` / `minor`.
2. **Lokalizacja:** plik + fragment/symbol.
3. **Problem:** co jest niezgodne.
4. **Dlaczego:** ryzyko produktowe/techniczne.
5. **Fix:** konkretna propozycja poprawki.

## Skala severity

- `blocker` — łamie security, i18n parity, krytyczne zasady architektury lub powoduje regresję funkcjonalną.
- `major` — istotnie obniża maintainability, zgodność z dokumentacją, jakość API/UX.
- `minor` — poprawki jakościowe/stylistyczne bez bezpośredniego ryzyka produkcyjnego.

## Checklista recenzenta

### Zakres i architektura

- [ ] PR ma spójny, pojedynczy cel.
- [ ] Brak niepowiązanych refaktorów.
- [ ] Granice `frontend/` vs `studio/` są zachowane.
- [ ] Dla zmian architektonicznych zaktualizowano odpowiednie `docs/main/*`.

### Frontend i i18n

- [ ] User-facing copy ma parytet `pl`/`en`.
- [ ] Routing locale i nazewnictwo kluczy są spójne.
- [ ] Nie ma hardkodowanych tekstów pomijających i18n.

### API, formularze, bezpieczeństwo

- [ ] Dla endpointów formularzy utrzymano `csrf_token`, timing check i `reCAPTCHA`.
- [ ] Walidacja serwerowa pokrywa nowe/zmienione pola.
- [ ] Brak logowania danych wrażliwych.

### Jakość i testowalność

- [ ] Kod jest TypeScript strict-friendly (bez zbędnego `any`).
- [ ] Komponenty i logika mają czytelny podział odpowiedzialności.
- [ ] `npm run lint` przechodzi dla zmienionego obszaru.
- [ ] `npm run translate:check` przechodzi przy zmianach i18n.

## Format odpowiedzi review (szablon)

```markdown
## PR Review

Status: <APPROVE | REQUEST_CHANGES | COMMENT>

### Podsumowanie

- <1-2 zdania o zakresie i ogólnej ocenie>

### Findings

1. [<severity>] `<path/to/file>` — <krótki tytuł problemu>
   - Problem: <co jest nie tak>
   - Dlaczego: <ryzyko/skutek>
   - Sugestia: <konkretna poprawka>

2. [<severity>] `<path/to/file>` — <krótki tytuł problemu>
   - Problem: ...
   - Dlaczego: ...
   - Sugestia: ...

### Documentation impact

- <czy wymagane były aktualizacje `docs/main/*` i czy je wykonano>

### Quality checks

- `npm run lint`: <pass/fail/not-run>
- `npm run translate:check`: <pass/fail/not-run/na>
- <inne adekwatne kontrole>
```

## Czego unikać

- ❌ Ogólników typu „LGTM” bez wskazania ryzyk i argumentów.
- ❌ Czepiania się stylu, gdy istnieją blokery bezpieczeństwa lub i18n.
- ❌ Wymuszania dużych refaktorów poza zakresem PR.
- ❌ Pomijania wpływu zmian na `docs/main/*` przy modyfikacjach architektury.
