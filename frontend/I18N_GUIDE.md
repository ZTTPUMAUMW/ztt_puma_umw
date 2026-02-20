# Internationalization (i18n) Guide

## Przegląd

Projekt używa `next-intl` do obsługi wielojęzyczności. Domyślnym językiem jest **polski** (bez przedrostka w URL), a wersja angielska używa przedrostka `/en/`.

## Struktura URL

### Polski (domyślny):

- `/` - strona główna
- `/projekty` - projekty
- `/publikacje` - publikacje
- `/modele` - modele
- `/zespol` - zespół
- `/rekrutacja` - rekrutacja
- `/wspolpraca` - współpraca
- `/kontakt` - kontakt

### Angielski:

- `/en` - strona główna
- `/en/projects` - projekty
- `/en/publications` - publikacje
- `/en/models` - modele
- `/en/team` - zespół
- `/en/recruitment` - rekrutacja
- `/en/cooperation` - współpraca
- `/en/contact` - kontakt

## Pliki konfiguracyjne

### `src/i18n/config.ts`

Podstawowa konfiguracja języków i ich etykiet.

### `src/i18n/routing.ts`

Definiuje routing dla różnych języków i mapowanie ścieżek (pathname mapping).

### `src/i18n/request.ts`

Konfiguracja ładowania wiadomości (messages) dla każdego języka.

## Pliki z tłumaczeniami

Tłumaczenia znajdują się w plikach JSON:

- `src/messages/pl.json` - polskie tłumaczenia
- `src/messages/en.json` - angielskie tłumaczenia

### Struktura pliku z tłumaczeniami:

```json
{
  "navigation": {
    "home": "Strona główna",
    "projects": "Projekty",
    ...
  },
  "common": {
    "readMore": "Czytaj więcej",
    ...
  },
  "footer": {
    "address": "Adres",
    ...
  }
}
```

## Użycie w komponentach

### 1. Importuj hook useTranslations:

```tsx
"use client";

import { useTranslations } from "next-intl";

export default function MyComponent() {
  const t = useTranslations("navigation"); // używaj klucza z JSON

  return <h1>{t("home")}</h1>; // "Strona główna" lub "Home"
}
```

### 2. Używaj Link z i18n routing:

```tsx
import { Link } from "@/i18n/routing";

// Zamiast:
// import Link from 'next/link';

<Link href="/projects" as="/projects">
  {t("projects")}
</Link>;
```

### 3. Pobieranie aktualnego języka:

```tsx
import { useLocale } from "next-intl";

const locale = useLocale(); // 'pl' lub 'en'
```

### 4. Nawigacja programowa:

```tsx
import { useRouter, usePathname } from "@/i18n/routing";

const router = useRouter();
const pathname = usePathname();

// Przejdź do strony z zachowaniem języka
router.push("/contact");

// Zmień język
router.replace(pathname, { locale: "en" });
```

## Language Switcher

Komponent `LanguageSwitcher` jest dodany do headera:

- **Desktop**: Po prawej stronie headera (PL | EN)
- **Mobile**: Na dole sidebaru menu mobilnego

## SEO i hreflang

W `src/app/[locale]/layout.tsx` skonfigurowane są:

- **canonical**: Polski jako canonical URL (bez /pl/)
- **alternate**: Angielski jako alternatywna wersja językowa
- **hreflang**: Automatycznie generowane przez next-intl

```tsx
alternates: {
  canonical: locale === 'pl' ? baseUrl : undefined,
  languages: {
    'pl': baseUrl,
    'en': `${baseUrl}/en`,
  },
}
```

## Dodawanie nowych tłumaczeń

1. Dodaj klucz do obu plików JSON (`pl.json` i `en.json`)
2. Użyj w komponencie poprzez `useTranslations('namespace')`

Przykład:

```json
// pl.json
{
  "team": {
    "title": "Nasz zespół",
    "description": "Poznaj ludzi za P.U.M.A."
  }
}

// en.json
{
  "team": {
    "title": "Our team",
    "description": "Meet the people behind P.U.M.A."
  }
}
```

```tsx
// W komponencie
const t = useTranslations("team");
<h1>{t("title")}</h1>;
```

## Dodawanie nowych stron

Dla stron z dużą ilością treści możesz:

### Opcja 1: Wszystko w JSON

Dodaj całą treść do plików `pl.json` i `en.json`.

### Opcja 2: Osobne komponenty per język

```tsx
// src/app/[locale]/about/page.tsx
import { useLocale } from "next-intl";
import AboutPL from "./AboutPL";
import AboutEN from "./AboutEN";

export default function AboutPage() {
  const locale = useLocale();

  return locale === "pl" ? <AboutPL /> : <AboutEN />;
}
```

### Opcja 3: Mieszana (zalecane)

- Krótkie teksty w JSON
- Długie treści jako MDX lub osobne komponenty

## Testowanie

Po uruchomieniu `npm run dev`:

- `/` - wersja polska
- `/en` - wersja angielska
- Przełączaj między językami używając przycisków PL | EN w headerze
