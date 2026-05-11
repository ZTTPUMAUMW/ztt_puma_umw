# Documentation Governance — `next_puma_website`

## 1. Cel

Ustalenie jednoznacznych zasad, kiedy i jak aktualizować dokumentację techniczną oraz produktową, aby kod i dokumenty pozostawały spójne.

## 2. Kiedy aktualizacja dokumentacji jest obowiązkowa

Aktualizacja jest wymagana, gdy zmiana wpływa na co najmniej jeden obszar:

- architektura modułów (`frontend/`, `studio/`, granice odpowiedzialności),
- stack technologiczny (dodanie/usunięcie bibliotek lub zmiana major version),
- i18n (locale, routing lokalizowany, źródła tłumaczeń),
- API i formularze (payload, walidacje, bezpieczeństwo, antyspam),
- źródło prawdy dla danych (CMS vs dane statyczne),
- workflow jakości (lint, format, testy, CI).

## 3. Macierz zmiana → dokument

| Typ zmiany                                              | Obowiązkowe dokumenty do aktualizacji                          |
| ------------------------------------------------------- | -------------------------------------------------------------- |
| Zmiana struktury katalogów, nowy moduł, refactor granic | `project-structure.md`, `architecture-change-log.md`           |
| Zmiana bibliotek, runtime, narzędzi build/lint          | `project-stack.md`, `architecture-change-log.md`               |
| Zmiana zakresu produktu, nowych widoków/feature flag    | `PRD.md`, `ROADMAP.md`, `architecture-change-log.md`           |
| Zmiana i18n/routingu locale                             | `PRD.md`, `project-structure.md`, `architecture-change-log.md` |
| Zmiana formularzy/API/security                          | `PRD.md`, `project-stack.md`, `architecture-change-log.md`     |
| Zmiana procesu pracy agentów AI                         | `ai-agent-workflow.md`, `.github/copilot-instructions.md`      |

## 4. Definition of Done (DoD) dla zmian architektonicznych

Zmiana jest uznana za domkniętą, gdy:

1. Kod jest zgodny z aktualnym opisem w `docs/main`.
2. Zaktualizowano wszystkie dokumenty wynikające z macierzy.
3. Dodano wpis do `architecture-change-log.md`.
4. PR zawiera checklistę dokumentacyjną i jest oznaczony zakresem zmiany.

## 5. Checklista PR (do wklejenia)

```markdown
### Documentation Checklist

- [ ] Sprawdziłem(-am) wpływ zmiany na `PRD.md`.
- [ ] Sprawdziłem(-am) wpływ zmiany na `project-stack.md`.
- [ ] Sprawdziłem(-am) wpływ zmiany na `project-structure.md`.
- [ ] Dodałem(-am) wpis do `architecture-change-log.md` (jeśli dotyczy).
- [ ] Zaktualizowałem(-am) instrukcje AI (`ai-agent-workflow.md` / `.github/copilot-instructions.md`) jeśli dotyczy.
```

## 6. Częstotliwość przeglądu

- Minimum raz w miesiącu: przegląd `docs/main/*` pod kątem zgodności z kodem.
- Po każdym większym refactorze: szybki audit dokumentacji przed mergem.
