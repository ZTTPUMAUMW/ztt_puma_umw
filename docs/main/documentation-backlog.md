# Documentation Backlog (propozycje) — `next_puma_website`

Poniższe dokumenty nie są obecnie wymagane do działania projektu, ale znacząco poprawią przewidywalność prac w kolejnych iteracjach.

## P1 — Governance i decyzje architektoniczne

## 1) `docs/main/adr/README.md` + `docs/main/adr/NNN-*.md`

- **Cel:** trwały zapis decyzji architektonicznych (ADR).
- **Dlaczego:** łatwiejsze utrzymanie kontekstu „dlaczego tak”, zwłaszcza przy zmianach zespołu.
- **Zakres minimalny:** status decyzji, kontekst, alternatywy, konsekwencje.

## P1 — Formularze, API i bezpieczeństwo

## 2) `docs/main/api-contracts.md`

- **Cel:** jednolity opis kontraktów API dla formularzy (`/api/recruitment`, `/api/cooperation`).
- **Dlaczego:** mniejsza liczba regresji przy zmianie payloadów i walidacji.
- **Zakres minimalny:** request/response, kody błędów, limity, walidacje bezpieczeństwa.

## P1 — CMS i migracja danych

## 3) `docs/main/content-model-map.md`

- **Cel:** mapowanie danych `frontend/src/data` ↔ Sanity schema.
- **Dlaczego:** bezpieczna i kontrolowana migracja treści do CMS.
- **Zakres minimalny:** tabela pól, owner, status migracji, fallback frontend.

## P2 — Jakość kodu, testy i release

## 4) `docs/main/observability-and-incidents.md`

- **Cel:** standard logowania błędów i reakcja na incydenty formularzy/API.

- **Zakres minimalny:** co logować, czego nie logować, playbook reagowania.

## 5) `docs/main/release-checklist.md`

- **Cel:** checklista release z punktami i18n, SEO, formularze, lint/format.
- **Zakres minimalny:** kroki pre-merge i pre-release.

## Kryterium wejścia do realizacji

- Dokument przechodzi z backlogu do realizacji, gdy dotyczy aktywnego epiku z `ROADMAP.md`.

## Sugerowana kolejność wdrożenia

1. `adr/*`
2. `api-contracts.md`
3. `content-model-map.md`
4. `release-checklist.md`
5. `observability-and-incidents.md`
