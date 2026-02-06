# 🔄 Przykłady migracji komponentów

## Komponent serwerowy

### ❌ PRZED (flat JSON structure)

```tsx
// src/app/[locale]/team/page.tsx
import { useTranslations } from 'next-intl';

export default function TeamPage() {
  const t = useTranslations('team');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      
      <div>
        <span>{t('stats.researchers')}</span>
        <span>{t('stats.phd')}</span>
      </div>
    </div>
  );
}
```

**JSON:**
```json
// messages/pl.json (1 wielki plik)
{
  "navigation": { ... },
  "common": { ... },
  "home": { ... },
  "team": {
    "hero": {
      "title": "Nasz zespół",
      "subtitle": "Poznaj naukowców"
    },
    "stats": {
      "researchers": "Pracownicy naukowi",
      "phd": "Doktoranci"
    }
  },
  "projects": { ... },
  "contact": { ... }
}
```

---

### ✅ PO (split JSON per page + MDX for long content)

```tsx
// src/app/[locale]/team/page.tsx
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { compileMDXContent } from '@/lib/mdx';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function TeamPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = useTranslations('team');
  const tCommon = useTranslations('common');
  
  // Długi opis zespołu z MDX (opcjonalnie)
  const { content: teamDescription } = await compileMDXContent(
    locale, 
    'team', 
    'about'
  );
  
  return (
    <div>
      {/* Krótkie teksty UI z JSON */}
      <section>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </section>
      
      <section>
        <div>
          <span>{t('stats.researchers')}</span>
          <span>{t('stats.phd')}</span>
        </div>
      </section>
      
      {/* Długi opis z MDX */}
      <section>
        <article>{teamDescription}</article>
      </section>
      
      <button>{tCommon('buttons.readMore')}</button>
    </div>
  );
}
```

**JSON (podzielone):**
```json
// messages/pl/team.json
{
  "hero": {
    "title": "Nasz zespół",
    "subtitle": "Poznaj naukowców"
  },
  "stats": {
    "researchers": "Pracownicy naukowi",
    "phd": "Doktoranci"
  }
}

// messages/pl/common.json
{
  "buttons": {
    "readMore": "Czytaj więcej",
    "contact": "Skontaktuj się"
  }
}
```

**MDX (długie treści):**
```mdx
// content/pl/team/about.mdx
---
title: "O zespole"
description: "Poznaj nasz zespół"
---

# O naszym zespole

Nasz zespół to grupa pasjonatów nauki, którzy łączą doświadczenie 
akademickie z praktycznym podejściem do badań.

## Struktura zespołu

- **Pracownicy naukowi** – doświadczeni badacze z dziesiątkami publikacji
- **Doktoranci** – młodzi naukowcy rozwijający swoje kariery
- **Studenci** – entuzjaści nauki uczący się od najlepszych

Wspólnie tworzymy innowacyjne rozwiązania w obszarze mikrobiologii...
```

---

## Komponent kliencki (formularz)

### ❌ PRZED

```tsx
// src/components/ContactForm.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  
  return (
    <form>
      <label>{t('form.name')}</label>
      <input placeholder={t('form.namePlaceholder')} />
      
      <label>{t('form.email')}</label>
      <input placeholder={t('form.emailPlaceholder')} />
      
      <button>{t('form.submit')}</button>
    </form>
  );
}
```

**JSON:**
```json
// messages/pl.json (flat)
{
  "contact": {
    "form": {
      "name": "Imię i nazwisko",
      "namePlaceholder": "Jan Kowalski",
      "email": "E-mail",
      "emailPlaceholder": "jan@example.com",
      "submit": "Wyślij"
    }
  }
}
```

---

### ✅ PO

```tsx
// src/components/ContactForm.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tCommon = useTranslations('common');
  
  return (
    <form>
      <div>
        <label htmlFor="name">
          {t('fields.name.label')}
          <span aria-label={tCommon('labels.required')}>*</span>
        </label>
        <input 
          id="name"
          placeholder={t('fields.name.placeholder')} 
        />
      </div>
      
      <div>
        <label htmlFor="email">
          {t('fields.email.label')}
          <span aria-label={tCommon('labels.required')}>*</span>
        </label>
        <input 
          id="email"
          type="email"
          placeholder={t('fields.email.placeholder')} 
        />
      </div>
      
      <button type="submit">
        {tCommon('buttons.submit')}
      </button>
    </form>
  );
}
```

**JSON (hierarchiczne):**
```json
// messages/pl/contact.json
{
  "form": {
    "fields": {
      "name": {
        "label": "Imię i nazwisko",
        "placeholder": "Jan Kowalski"
      },
      "email": {
        "label": "Adres e-mail",
        "placeholder": "jan@example.com"
      }
    }
  }
}

// messages/pl/common.json
{
  "buttons": {
    "submit": "Wyślij",
    "cancel": "Anuluj"
  },
  "labels": {
    "required": "Pole wymagane",
    "optional": "Opcjonalne"
  }
}
```

---

## Nawigacja

### ❌ PRZED

```tsx
// src/components/Header.tsx
'use client';

import Link from 'next/link';
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation');
  
  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/team">{t('team')}</Link>
      <Link href="/contact">{t('contact')}</Link>
    </nav>
  );
}
```

---

### ✅ PO

```tsx
// src/components/Header.tsx
'use client';

import { Link } from '@/i18n/routing'; // ← Zmiana!
import { useTranslations } from 'next-intl';

export default function Header() {
  const t = useTranslations('navigation.header');
  
  return (
    <nav>
      <Link href="/">{t('home')}</Link>
      <Link href="/team">{t('team')}</Link>
      <Link href="/contact">{t('contact')}</Link>
    </nav>
  );
}
```

**JSON:**
```json
// messages/pl/navigation.json
{
  "header": {
    "home": "Strona główna",
    "team": "Zespół",
    "contact": "Kontakt"
  },
  "footer": {
    "university": "Uniwersytet Medyczny",
    "address": "ul. Borowska 211"
  }
}
```

---

## Strona z długą treścią

### ❌ PRZED (wszystko w JSON – nieczytelne)

```tsx
// src/app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';

export default function AboutPage() {
  const t = useTranslations('about');
  
  return (
    <div>
      <h1>{t('title')}</h1>
      <p>{t('paragraph1')}</p>
      <p>{t('paragraph2')}</p>
      <p>{t('paragraph3')}</p>
      {/* ... dziesiątki akapitów w JSON */}
    </div>
  );
}
```

**JSON (brzydkie):**
```json
{
  "about": {
    "title": "O wydziale",
    "paragraph1": "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua...",
    "paragraph2": "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat...",
    "paragraph3": "Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur..."
  }
}
```

---

### ✅ PO (UI w JSON, treść w MDX – czytelne)

```tsx
// src/app/[locale]/about/page.tsx
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';
import { compileMDXContent } from '@/lib/mdx';

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function AboutPage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = useTranslations('about');
  
  // Długa treść z MDX
  const { content: missionContent } = await compileMDXContent(
    locale, 
    'about', 
    'mission'
  );
  
  const { content: historyContent } = await compileMDXContent(
    locale, 
    'about', 
    'history'
  );
  
  return (
    <div>
      {/* Krótkie nagłówki z JSON */}
      <section>
        <h1>{t('hero.title')}</h1>
        <p>{t('hero.subtitle')}</p>
      </section>
      
      {/* Długie treści z MDX */}
      <section>
        <h2>{t('sections.mission.heading')}</h2>
        <article>{missionContent}</article>
      </section>
      
      <section>
        <h2>{t('sections.history.heading')}</h2>
        <article>{historyContent}</article>
      </section>
    </div>
  );
}
```

**JSON (tylko krótkie teksty):**
```json
// messages/pl/about.json
{
  "hero": {
    "title": "O Zakładzie",
    "subtitle": "Historia, misja i wartości"
  },
  "sections": {
    "mission": {
      "heading": "Nasza misja"
    },
    "history": {
      "heading": "Historia"
    }
  }
}
```

**MDX (długie treści):**
```mdx
// content/pl/about/mission.mdx
---
title: "Misja Zakładu"
---

# Nasza misja

Zakład Technologii Translacyjnych działa na styku nauki podstawowej 
i zastosowań klinicznych...

## Badania translacyjne

Lorem ipsum dolor sit amet, consectetur adipiscing elit...

## Współpraca

Realizujemy projekty badawcze we współpracy z...
```

---

## Podsumowanie zmian

| Aspekt | PRZED | PO |
|--------|-------|-----|
| **Struktura JSON** | 1 wielki plik | Podzielone per strona |
| **Długie treści** | W JSON | W MDX |
| **Nawigacja** | `next/link` | `@/i18n/routing` |
| **Reużywalne teksty** | Duplikaty | `common.json` |
| **Hierarchia kluczy** | Flat | Zagnieżdżone |
| **Czytelność** | Niska | Wysoka |
| **Utrzymywalność** | Trudna | Łatwa |

---

## Migracja krok po kroku

1. **Backup:** `cp pl.json pl.json.backup`
2. **Podziel JSON:** Uruchom `scripts/migrate-json-structure.js`
3. **Zaktualizuj request.ts:** Import per sekcja
4. **Stwórz MDX:** Przenieś długie treści
5. **Zaktualizuj komponenty:** `useTranslations('sekcja')`
6. **Test:** `npm run build`
7. **Deploy:** Verify production

**Czas:** 2-3 godziny  
**Ryzyko:** Niskie (łatwy rollback)
