# SKILL: Commit Message

## Cel

Generuj commit messages zgodne z Conventional Commits, dopasowane do projektu Again.

## Procedura (wykonaj w tej kolejności)

### Krok 1 — pobierz aktualne zmiany na branchu

Uruchom:

```
git diff main --name-only
git diff main --stat
```

Jeśli branch nie ma zmian względem `main`, użyj:

```
git status
git diff --cached --name-only
```

Przeanalizuj listę zmienionych plików i ich zawartość (`git diff main`), żeby zrozumieć _co_ faktycznie się zmieniło.

### Krok 2 — rozpoznaj krok z implementation roadmap

Otwórz `docs/main/ROADMAP.md` i porównaj zmienione pliki z krokami/fazami opisanymi w roadmapie.

- Dopasuj zmienione pliki do konkretnego kroku lub fazy w roadmapie (np. `Step 1.1`, `Step 2.3`).
- Jeśli plik `docs/main/ROADMAP.md` **nie istnieje** — pomiń ten krok i kontynuuj bez kontekstu roadmapy.
- Jeśli zmiany **pasują do kilku kroków** — uwzględnij wszystkie dopasowane kroki w subject lub pierwszej linii `Changes:` jako kontekst (np. `Covers Step 1.1 + Step 1.2`), żeby było jasne, jaką część roadmapy commit realizuje.

### Krok 3 — wygeneruj commit message

Na podstawie zebranych informacji wygeneruj commit message zgodnie z formatem poniżej.

## Format

```
<[branch-name]> <type>(<scope>): <subject>

Changes:
- <co się zmieniło i dlaczego>
- <kolejna zmiana>

[optional footer]
```

## Zasady

- `<subject>` w języku angielskim, tryb rozkazujący ("add", nie "added" / "adds")
- Maksymalnie `72` znaki w pierwszej linii (bez prefixu branch)
- `[branch-name]` — nazwa aktualnej gałęzi w nawiasach kwadratowych, np. `[LS-1]`
- Body **obowiązkowe** — sekcja `Changes:` z myślnikami wyjaśniającymi _co_ i _dlaczego_ się zmieniło
- Footer: `Closes #<issue>` jeśli commit zamyka ticket

## Typy (`<type>`)

| Typ        | Kiedy używać                        |
| ---------- | ----------------------------------- |
| `feat`     | Nowa funkcjonalność dla użytkownika |
| `fix`      | Naprawa buga                        |
| `refactor` | Refaktor bez zmiany zachowania      |
| `test`     | Dodanie lub poprawa testów          |
| `docs`     | Tylko dokumentacja                  |
| `chore`    | Konfiguracja, zależności, tooling   |
| `perf`     | Optymalizacja wydajności            |
| `ci`       | Zmiany w pipeline CI/CD             |

## Scope (`<scope>`) — projekt Again

| Scope        | Co obejmuje                      |
| ------------ | -------------------------------- |
| `onboarding` | Flow onboardingu konwersacyjnego |
| `plan`       | Adaptive Plan Engine             |
| `session`    | Sesja treningowa + feedback      |
| `streak`     | Streak FSM i logika              |
| `coach`      | AI Coach Engine                  |
| `dropout`    | Anti-Dropout Engine              |
| `retro`      | Retrospective Engine             |
| `auth`       | Autoryzacja i Supabase Auth      |
| `db`         | Migracje, schema, RLS            |
| `api`        | Kontrakty API / endpointy        |
| `ui`         | Komponenty React Native          |

## Przykłady

```
[LS-29] feat(i18n): add missing `recruitment.hero` keys in pl/en messages

Changes:
- Added `recruitment.hero.title` and `recruitment.hero.description` in `pl` and `en`
- Restores language parity required by i18n-first workflow and translation checks

[LS-29] fix(contact-form): validate `csrf_token` and timing check in API route

Changes:
- Enforced `csrf_token` verification and minimum submit-time threshold server-side
- Reduces spam submissions and aligns with form security requirements in repo docs

[LS-29] refactor(seo): move metadata builders to `src/lib/seo.ts` helpers

Changes:
- Replaced duplicated page-level metadata blocks with shared SEO helper functions
- Simplifies maintenance and keeps App Router pages consistent across locales

[LS-29] docs(main): update `project-structure.md` and add architecture change log entry

Changes:
- Documented frontend/studio directory adjustments in `docs/main/project-structure.md`
- Added rationale and date in `docs/main/architecture-change-log.md` per governance
```

## Czego unikać

- ❌ `fix bug` — za ogólnie
- ❌ `WIP` — commituj gotowe jednostki pracy
- ❌ Język karający w opisie (zgodnie z regułami produktowymi)
- ❌ Mieszanie wielu niezwiązanych zmian w jednym commicie
