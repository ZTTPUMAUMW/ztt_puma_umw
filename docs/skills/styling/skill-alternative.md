# Repo-Aware Styling Skill (Alternative)

Skill do pracy nad UI w tym repozytorium (`next_puma_website`) z naciskiem na zgodność z istniejącą architekturą i stopniowe ulepszanie designu bez przepisywania całego frontu.

## 1) Zasady nadrzędne dla tego projektu

- **Styling:** SCSS Modules zostają jako główny system (`*.module.scss` + tokeny z `frontend/src/styles/variables.module.scss`).
- **Font:** Roboto zostaje jako font bazowy (zgodnie z `frontend/src/app/[locale]/layout.tsx`).
- **Tailwind:** nie jest bazą do nowych komponentów. Dopuszczalne tylko incydentalnie, jeśli już występuje i nie zwiększa długu.
- **RSC/Next.js:** respektuj granicę Server/Client Components.
- **Minimalna inwazyjność:** najpierw poprawki ewolucyjne, dopiero potem większy refactor.

## 2) Kiedy używać tego skilla

Używaj przy każdej prośbie o:

- nowy komponent/sekcję/stronę,
- poprawę estetyki istniejącego widoku,
- rewizję layoutu, spacingu, typografii, kolorystyki,
- dodanie animacji lub ikon,
- redukcję „generycznego” wyglądu bez zrywania z aktualnym design systemem.

## 3) Workflow obowiązkowy (kolejność)

1. **Sprawdź kontekst:** komponent + odpowiadający mu plik `*.module.scss` + tokeny w `variables.module.scss`.
2. **Sprawdź zależności:** przed importem bibliotek sprawdź `frontend/package.json`.
3. **Wybierz poziom zmiany:**
   - poziom A: kosmetyka (spacing, hierarchy, kontrast),
   - poziom B: struktura (grid/flex, breakpoints),
   - poziom C: interakcje (animacje, stany).
4. **Dostarcz stany UI:** loading/empty/error (jeśli komponent tego wymaga).
5. **Sprawdź mobile-first:** brak regresji < `768px`.

## 4) Stylowanie: SCSS Modules-first

- Twórz/rozszerzaj style w istniejących modułach SCSS.
- Używaj tokenów (`--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*`) zamiast hardcodowanych wartości.
- Przy nowych sekcjach preferuj:
  - kontener oparty o istniejące klasy `.container*` z `frontend/src/styles/layout.module.scss`,
  - grid/flex zgodny z istniejącymi breakpointami,
  - semantyczne nazewnictwo BEM-like (`block__element--modifier`).

## 5) Typografia

- **Roboto zostaje domyślnie** (brak migracji do Geist/Satoshi).
- Hierarchię buduj wagą, spacingiem i kontrastem, nie agresywnymi efektami.
- Nie narzucaj nowych fontów globalnych bez wyraźnego wymagania produktowego.

## 6) Animacje i biblioteki ikon — decyzja warunkowa

### 6.1 Zasada

Biblioteki z oryginalnego `SKILL.md` (np. `framer-motion`, `@phosphor-icons/react`, `@radix-ui/react-icons`) wdrażamy **tylko jeśli jest realny use-case** w konkretnym komponencie.

### 6.2 Co mamy obecnie

- Istnieje lekki system animacji oparty o `IntersectionObserver` (`frontend/src/hooks/useInView.ts`) i klasy CSS (`animate-on-scroll`, `animate-stagger`).
- Istnieje własny komponent ikon SVG: `frontend/src/components/Icon.tsx`.
- Są też lokalne SVG z `public/images/icons/*`.

### 6.3 Reguły wdrożenia

- **Nie instaluj bibliotek „na zapas”.**
- Jeśli animacja to proste reveal/hover: zostań przy CSS + `useInView`.
- Jeśli potrzebne są złożone transition/layout animations (shared element, drag, spring orchestracja): rozważ `framer-motion` dla izolowanego komponentu Client.
- Jeśli potrzeba spójnego zestawu ikon i lepszego DX niż custom SVG: rozważ `@phosphor-icons/react` lub `@radix-ui/react-icons`.
- Przed każdym importem nowej biblioteki podaj komendę instalacji i uzasadnienie biznesowe.

### 6.4 Potencjał w tym repo (konkret)

- `frontend/src/app/[locale]/contact/page.tsx` używa emoji ikon (`📍`, `📞`, `📧`) — **to jest dobry kandydat** do zamiany na SVG/custom `Icon` lub bibliotekę ikon.
- `frontend/src/components/FeatureBoxes.tsx` i sekcje z revealami — obecnie wystarczy CSS; `framer-motion` tylko gdy dojdą bardziej złożone interakcje.

## 7) Weryfikacja „zakazów” z bazowego SKILL.md na tym projekcie

Poniżej audyt kolizji i sposób podejścia.

### 7.1 „BEZ #000000”

**Kolizje znalezione:**

- `frontend/src/styles/variables.module.scss`
  - `--black: #000000;`
  - `--color-border: #000000;`

**Decyzja dla tego repo:**

- Nie traktuj tego jako absolutny zakaz.
- Dla nowych elementów preferuj off-black (`#111111`, `#1a1a1a`) lub istniejące tokeny tekstu.
- Migrację `#000000` rób stopniowo i świadomie (najpierw border/text o niskim ryzyku).

### 7.2 „BEZ 3 równych kart w rzędzie”

**Kolizje znalezione (desktop 3 kolumny):**

- `frontend/src/styles/pages/team.module.scss` (`repeat(3, 1fr)`)
- `frontend/src/styles/components/team-stats.module.scss` (`repeat(3, 1fr)`)
- `frontend/src/styles/pages/recruitment.module.scss` (`repeat(3, 1fr)`)
- `frontend/src/styles/pages/cooperation.module.scss` (`repeat(3, 1fr)`)
- `frontend/src/styles/components/info-cards.module.scss` (na desktop: równy układ przez `flex: 1 1 0`)

**Decyzja dla tego repo:**

- To nie jest bezwzględny zakaz — układ 3 kolumn bywa poprawny i czytelny.
- Dla sekcji „marketing/hero/value props” preferuj alternatywy, żeby uniknąć generyczności.

**Alternatywy (od najmniej inwazyjnych):**

1. 2+1 układ akcentujący jedną kartę (np. pierwsza szeroka, dwie węższe).
2. Różna wysokość kart + wyróżniony „featured card”.
3. Asymetryczny grid (`2fr 1fr 1fr` lub `1.2fr 1fr 1fr`) z mobile fallbackiem do 1 kolumny.
4. Na wybranych sekcjach: poziomy scroll kart na tablet/desktop.

### 7.3 Inne „twarde zakazy” z bazowego skillu

- „Tailwind 90%” — **nie dotyczy** tego repo (SCSS-first).
- „Inter zakazany / używaj Geist/Satoshi” — **nie dotyczy**, bo zostaje Roboto.
- „Tylko Radix/Phosphor” — **nie dotyczy bezwarunkowo**, bo mamy własny system ikon; biblioteki tylko przy realnym zysku.

## 8) Zasady responsywności i layoutu (repo-aware)

- Utrzymuj obecne breakpointy projektowe (`600/640/768/992/1024+` zależnie od modułu) i nie mieszaj chaotycznie nowych progów.
- Każda sekcja musi mieć stabilny fallback 1-kolumnowy na mobile.
- Unikaj „pixel-perfect” na jednym viewport — preferuj odporne układy płynne.

## 9) Checklist przed oddaniem zmian

- [ ] Zmiany wykonane w SCSS Modules i istniejących tokenach?
- [ ] Roboto i obecna typografia zachowane?
- [ ] Jeśli dodano bibliotekę: jest realny use-case + wpis w `package.json`?
- [ ] Dla sekcji 3-kolumnowej rozważono alternatywę (i świadomie odrzucono lub wdrożono)?
- [ ] Brak regresji mobile i stanów interaktywnych?
- [ ] Brak niepotrzebnego przepisywania komponentów bez wartości biznesowej?

## 10) Definicja jakości (Done)

Zmiana jest „done”, gdy:

- pasuje do obecnego design systemu,
- poprawia czytelność/hierarchię/odbiór wizualny,
- nie zwiększa niepotrzebnie złożoności,
- i ma jasne uzasadnienie techniczne oraz produktowe.
