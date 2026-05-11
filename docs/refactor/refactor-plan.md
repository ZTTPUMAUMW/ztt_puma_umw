# Refactor Plan: Layouty kart i reguły wizualne (SCSS-first)

## Cel

Zmniejszyć „generyczność” sekcji opartych o 3 równe karty, zachowując obecny stack projektu:

- `SCSS Modules` jako główny system stylowania,
- `Roboto` jako font bazowy,
- brak wdrożeń bibliotek „na zapas” (animacje/ikony tylko z realnym use-case).

Plan dotyczy zmian ewolucyjnych, bez przepisywania całych stron.

## Zakres (3 sekcje + 1 szybki quick win)

## 1) Sekcja statystyk zespołu

- **Plik:** `frontend/src/styles/components/team-stats.module.scss`
- **Obecnie:** desktop `grid-template-columns: repeat(3, 1fr)`
- **Problem:** równa trójkolumnowa siatka wygląda poprawnie, ale jest bardzo przewidywalna wizualnie.
- **Proponowana alternatywa:** układ `2+1` na desktopie z akcentem na pierwszą kartę.

### Zakres zmian

- Zmodyfikować `team-stats__grid` na desktop:
  - opcja A (preferowana): `grid-template-columns: 1.4fr 1fr 1fr`.
  - opcja B: 2 kolumny + featured card span (`grid-column: 1 / span 2`) dla pierwszego elementu.
- Dodać modyfikator dla pierwszej karty (np. `team-stats__card--featured`).
- Zachować mobile/tablet fallback (`1 col` -> `2 col`) bez zmian w semantyce HTML.

### Kryteria akceptacji

- Desktop nie renderuje 3 idealnie równych kart.
- Czytelność liczb i etykiet pozostaje co najmniej taka jak obecnie.
- Brak regresji dla viewportów `< 1024px`.

---

## 2) Sekcja „Cooperation offers”

- **Plik:** `frontend/src/styles/pages/cooperation.module.scss`
- **Obecnie:** `cooperation__offers-grid` -> `repeat(3, 1fr)` (desktop/tablet)
- **Problem:** równy grid 3x2 wygląda poprawnie, ale ma niski poziom hierarchii treści.
- **Proponowana alternatywa:** asymetryczny grid z featured offer.

### Zakres zmian

- Dla desktop (`>= 1024px`) przejść na siatkę asymetryczną:
  - przykład: `grid-template-columns: 1.25fr 1fr 1fr`.
- Pierwszą kartę oznaczyć jako featured:
  - większy obszar (`grid-column: 1 / 2`, `grid-row: span 2` lub odpowiednik),
  - subtelnie inna rama/tło (w granicach aktualnych tokenów).
- Na tablet (`768–1023`) zostawić prostszy układ 2 kolumny.

### Kryteria akceptacji

- Sekcja ma wyraźną hierarchię: jedna karta prowadząca + karty wspierające.
- Nie pojawia się chaos spacingu ani „przeskakiwanie” kart przy resize.
- Zachowana spójność kolorystyczna z resztą strony.

---

## 3) Sekcja „Recruitment benefits”

- **Plik:** `frontend/src/styles/pages/recruitment.module.scss`
- **Obecnie:** `recruitment__benefits-grid` -> `repeat(3, 1fr)` + `repeat(2, 1fr)`
- **Problem:** regularna macierz 3x2 jest czytelna, ale mocno szablonowa.
- **Proponowana alternatywa:** „2+1 rhythm” z naprzemienną szerokością kart.

### Zakres zmian

- Dla desktop zastosować rytm kart:
  - rząd 1: karta szeroka + 2 standardowe,
  - rząd 2: 2 standardowe + karta szeroka.
- Wdrożenie przez `:nth-child()` lub klasy modyfikujące (preferowane klasy dla czytelności).
- Zachować ten sam content i kolejność DOM (bez zmian semantycznych/SEO).

### Kryteria akceptacji

- Sekcja nie jest już „3 równe karty” na desktop.
- Treść kart pozostaje równie czytelna i równa pod względem kontrastu.
- Mobile nadal 1 kolumna, tablet maks. 2 kolumny.

---

## Quick Win (ikony)

## 4) Contact page — zamiana emoji na spójne ikony

- **Plik:** `frontend/src/app/[locale]/contact/page.tsx`
- **Obecnie:** emoji `📍`, `📞`, `📧`
- **Propozycja:** użyć `frontend/src/components/Icon.tsx` lub lokalnych SVG.

### Decyzja biblioteczna

- Na tym etapie **bez nowych zależności** — obecny system ikon jest wystarczający.
- Jeśli później pojawi się potrzeba 20+ nowych ikon o spójnej stylistyce, wtedy ocena `@phosphor-icons/react` lub `@radix-ui/react-icons`.

### Kryteria akceptacji

- Brak emoji w boksach kontaktowych.
- Spójna grubość linii i rozmiary ikon.
- Brak regresji accessibility (`aria-hidden`, sensowny tekst obok).

## Plan wdrożenia (kolejność PR)

## Etap 1 (najmniejsze ryzyko)

1. `contact/page.tsx` — zamiana emoji na ikony.
2. `team-stats.module.scss` — layout `2+1` bez zmian TSX (lub minimalny modifier klasy).

## Etap 2 (średnie ryzyko)

3. `cooperation.module.scss` — asymetryczny grid + featured offer.

## Etap 3 (najwyższe ryzyko wizualne)

4. `recruitment.module.scss` — naprzemienny rytm kart 2+1.

## Testy i walidacja po każdym etapie

- Ręczne sprawdzenie viewportów: `375`, `768`, `1024`, `1366`.
- Sprawdzenie czy hover/focus nie łamie layoutu.
- `npm run lint` w `frontend` po wdrożeniu zmian w kodzie.
- Jeśli zmieniamy więcej niż 1 sekcję w jednym PR: dodać screenshoty before/after.

## Ryzyka i mitigacje

- **Ryzyko:** zbyt duża asymetria obniży czytelność.
  - **Mitigacja:** najpierw łagodna asymetria (`1.2fr/1fr/1fr`) i test na realnych treściach.
- **Ryzyko:** niestabilność kart przy zmianie wysokości contentu i tłumaczeń.
  - **Mitigacja:** testy na `pl` i `en`, kontrola `min-height` tylko tam, gdzie konieczne.
- **Ryzyko:** zbyt duży zakres jednego PR.
  - **Mitigacja:** etapowanie zmian zgodnie z planem.

## Definition of Done

- Min. 3 sekcje zredukowane z „3 równych kart” do bardziej zróżnicowanych layoutów.
- Zachowana spójność z tokenami i stylem projektu (SCSS-first, Roboto).
- Brak nowych bibliotek bez uzasadnionego use-case.
- Brak regresji mobile i dostępności.
