# AI Agent Workflow — `next_puma_website`

## 1. Cel

Zapewnić przewidywalny i powtarzalny sposób pracy agentów AI z kodem oraz dokumentacją projektu.

## 2. Zasady ogólne

- Pracuj w możliwie małym zakresie (small, focused changes).
- Traktuj `docs/main/*` jako źródło prawdy przy decyzjach architektonicznych.
- Nie wykonuj dużych refaktorów przy małych poprawkach funkcjonalnych.
- Przy każdej zmianie user-facing dbaj o parytet i18n `pl`/`en`.

## 3. Obowiązkowy workflow dla agenta

1. Przeczytaj kontekst: `PRD.md`, `project-stack.md`, `project-structure.md`, `ROADMAP.md`.
2. Przygotuj krótki plan i wykonuj kroki sekwencyjnie.
3. Wykonaj zmianę minimalnym diffem.
4. Zaktualizuj dokumentację, jeśli zmiana wpływa na architekturę/stack/proces.
5. Uruchom kontrolę jakości adekwatną do zakresu (np. `lint`, `translate:check`).
6. Podsumuj: co zmieniono, dlaczego, jakie ryzyko i co dalej.

## 4. Reguły dla zmian architektonicznych

- Jeśli zmieniasz granice modułów, routing, warstwę integracji lub źródło danych, dodaj wpis do `architecture-change-log.md`.
- Jeśli zmieniasz zasady pracy agenta, zsynchronizuj `ai-agent-workflow.md` i `.github/copilot-instructions.md`.
- Jeżeli decyzja jest trwała i przekrojowa, dodaj ADR (wg szablonu, jeśli zostanie wprowadzony).

## 5. Minimalny raport po zmianie

- Lista zmienionych plików.
- Jednozdaniowy powód dla każdego pliku.
- Wynik kontroli jakości (`lint`, `translate:check`, inne).
- Krótka propozycja kolejnego kroku.
