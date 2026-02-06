# Internationalization (i18n) Implementation Guide

Complete guide for implementing Polish/English translations using next-intl in Next.js 16+ App Router.

## Architecture

### Content Distribution

```
src/
├── messages/              # JSON translations (next-intl)
│   ├── pl/
│   │   ├── common.json    # Buttons, labels, common UI
│   │   ├── navigation.json # Header, footer, menu
│   │   ├── home.json      # Homepage content
│   │   ├── team.json      # Team page
│   │   └── ...            # Other pages
│   └── en/
│       └── ...            # English translations
│
├── data/                  # TypeScript data structures
│   └── teamMembers.ts     # Team member data
│
└── i18n/                  # i18n configuration
    ├── routing.ts         # Locale routing config
    └── request.ts         # Message loader
```

### Content Strategy

| Content Type | Storage | Example |
|-------------|---------|---------|
| UI texts | JSON (`messages/`) | Buttons, labels, errors |
| Page content | JSON (`messages/`) | Headings, descriptions |
| Dynamic content | Sanity CMS | Projects, publications |
| Structured data | TypeScript (`data/`) | Team members |

## Setup

### 1. Dependencies

```bash
npm install next-intl
```

### 2. Configuration

**`src/i18n/routing.ts`**
```typescript
import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  locales: ['pl', 'en'],
  defaultLocale: 'pl',
  localePrefix: 'as-needed', // PL without prefix, EN with /en
});

export const { Link, redirect, usePathname, useRouter } = 
  createNavigation(routing);
```

**`src/i18n/request.ts`**
```typescript
import { getRequestConfig } from 'next-intl/server';
import { routing } from './routing';

export default getRequestConfig(async ({ requestLocale }) => {
  let locale = await requestLocale;

  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  const messages = {
    common: (await import(`@/messages/${locale}/common.json`)).default,
    navigation: (await import(`@/messages/${locale}/navigation.json`)).default,
    home: (await import(`@/messages/${locale}/home.json`)).default,
    // Add more message files as needed
  };

  return { locale, messages };
});
```

**`next.config.ts`**
```typescript
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  // Your Next.js config
};

export default withNextIntl(nextConfig);
```

**`src/middleware.ts`**
```typescript
import createMiddleware from 'next-intl/middleware';
import { routing } from './i18n/routing';

export default createMiddleware(routing);

export const config = {
  matcher: ['/', '/(pl|en)/:path*', '/((?!api|_next|_vercel|.*\\..*).*)'],
};
```

### 3. Layout Setup

**`src/app/[locale]/layout.tsx`**
```typescript
import { NextIntlClientProvider } from 'next-intl';
import { getMessages, setRequestLocale } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;

  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <body>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
```

## Usage

### Server Components

```tsx
import { useTranslations } from 'next-intl';
import { setRequestLocale } from 'next-intl/server';

export default async function HomePage({ 
  params 
}: { 
  params: Promise<{ locale: string }> 
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
      <button>{t('cta.primary')}</button>
    </div>
  );
}
```

### Client Components

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact.form');
  const tCommon = useTranslations('common');
  
  return (
    <form>
      <input placeholder={t('fields.name.placeholder')} />
      <button>{tCommon('buttons.submit')}</button>
    </form>
  );
}
```

### Navigation Links

```tsx
import { Link } from '@/i18n/routing';

export default function Navigation() {
  return (
    <nav>
      <Link href="/">Home</Link>
      <Link href="/team">Team</Link>
      <Link href="/projects">Projects</Link>
    </nav>
  );
}
```

### Language Switcher

```tsx
'use client';

import { useLocale } from 'next-intl';
import { useRouter, usePathname } from '@/i18n/routing';

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  
  const switchLocale = (newLocale: string) => {
    router.replace(pathname, { locale: newLocale });
  };
  
  return (
    <div>
      <button onClick={() => switchLocale('pl')} disabled={locale === 'pl'}>
        PL
      </button>
      <button onClick={() => switchLocale('en')} disabled={locale === 'en'}>
        EN
      </button>
    </div>
  );
}
```

## Message File Structure

### Example: `messages/pl/home.json`

```json
{
  "hero": {
    "title": "Pracownia Unikalnych Modeli Aplikacyjnych",
    "subtitle": "Zespół badawczy specjalizujący się w...",
    "cta": {
      "primary": "Poznaj zespół",
      "secondary": "Nasze projekty"
    }
  },
  "features": {
    "title": "Czym się zajmujemy",
    "items": [
      {
        "title": "Badania naukowe",
        "description": "Prowadzimy zaawansowane badania w dziedzinie..."
      }
    ]
  }
}
```

### Common Messages: `messages/pl/common.json`

```json
{
  "buttons": {
    "submit": "Wyślij",
    "cancel": "Anuluj",
    "readMore": "Czytaj więcej",
    "contact": "Kontakt"
  },
  "labels": {
    "name": "Imię",
    "email": "Email",
    "message": "Wiadomość"
  },
  "errors": {
    "required": "To pole jest wymagane",
    "invalidEmail": "Nieprawidłowy adres email"
  }
}
```

## Translation Workflow

### Manual Translation

1. Edit JSON file in `messages/pl/`
2. Copy structure to `messages/en/`
3. Translate values

### Automated Translation (DeepL)

```bash
# Translate specific text
npm run translate:text "Text to translate"

# Or use the translation script
npm run translate
```

## Routing Behavior

- `/` → Polish homepage (default)
- `/en` → English homepage
- `/zespol` → Polish team page
- `/en/team` → English team page
- `/projekty` → Polish projects
- `/en/projects` → English projects

Locale detection via middleware, automatic redirect to appropriate version.

## Best Practices

1. **Namespace organization**: Use logical groupings (`home`, `team`, `contact`)
2. **Nested keys**: Use dot notation for hierarchy (`hero.title`)
3. **Consistent naming**: Follow naming conventions across locales
4. **Avoid hardcoded text**: Always use translation keys
5. **Type safety**: Use TypeScript with strict mode for translations

## Sanity CMS Integration

For dynamic content (projects, publications), Sanity returns localized data:

```typescript
const query = `*[_type == "project"] {
  title,
  "description": description[_key == $locale][0].value,
  slug
}`;

const projects = await client.fetch(query, { locale });
```

## Testing

```typescript
// Test locale switching
describe('Language Switcher', () => {
  it('switches from PL to EN', async () => {
    // Test implementation
  });
});
```

## Troubleshooting

**Issue**: Translations not loading
- Check message file import in `i18n/request.ts`
- Verify file exists in `messages/[locale]/`

**Issue**: Wrong locale displayed
- Check middleware matcher pattern
- Verify `localePrefix` config in routing

**Issue**: Client/Server mismatch
- Use `setRequestLocale` in server components
- Wrap client components with `NextIntlClientProvider`
