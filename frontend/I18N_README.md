# 🌐 Wielojęzyczność (i18n) – Quick Start

## 📂 Struktura projektu

```
frontend/
├── src/
│   ├── messages/              # JSON – krótkie teksty UI
│   │   ├── pl/
│   │   │   ├── common.json        # Przyciski, etykiety
│   │   │   ├── navigation.json    # Header, footer
│   │   │   ├── home.json          # Strona główna
│   │   │   └── about.json         # O wydziale
│   │   └── en/
│   │       └── ...                # Angielskie odpowiedniki
│   │
│   ├── content/               # MDX – długie treści
│   │   ├── pl/
│   │   │   └── about/
│   │   │       ├── mission.mdx    # Misja (kilka akapitów)
│   │   │       └── history.mdx    # Historia
│   │   └── en/
│   │       └── about/
│   │           └── ...            # Angielskie odpowiedniki
│   │
│   ├── i18n/                  # Konfiguracja next-intl
│   │   ├── routing.ts
│   │   └── request.ts
│   │
│   └── lib/
│       └── mdx.ts             # Utility do MDX
│
└── docs/                      # Pełna dokumentacja
    ├── I18N_IMPLEMENTATION_GUIDE.md
    ├── TRANSLATION_NAMING_CONVENTION.md
    ├── SANITY_MIGRATION_PATH.md
    └── I18N_CHECKLIST.md
```

---

## 🚀 Szybki start

### 1. Instalacja
```bash
npm install next-intl next-mdx-remote gray-matter
```

### 2. Użycie w komponencie

**Komponent serwerowy:**
```tsx
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');
  
  return (
    <div>
      <h1>{t('hero.title')}</h1>
      <p>{t('hero.subtitle')}</p>
    </div>
  );
}
```

**Komponent kliencki:**
```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ContactForm() {
  const t = useTranslations('contact');
  
  return (
    <form>
      <input placeholder={t('form.fields.name.placeholder')} />
    </form>
  );
}
```

**MDX (długie treści):**
```tsx
import { compileMDXContent } from '@/lib/mdx';

export default async function AboutPage({ params }) {
  const { locale } = await params;
  const { content } = await compileMDXContent(locale, 'about', 'mission');
  
  return <article>{content}</article>;
}
```

---

## 📖 Routing

- `/` → Polski (domyślny, bez prefixu)
- `/en` → Angielski
- `/about` → Polski
- `/en/about` → Angielski

---

## 🏷️ Konwencja nazewnictwa

### JSON (krótkie teksty UI)
```json
{
  "hero": {
    "title": "Tytuł",
    "subtitle": "Podtytuł",
    "cta": {
      "primary": "Przycisk główny",
      "secondary": "Przycisk drugoplanowy"
    }
  },
  "sections": {
    "about": {
      "heading": "Nagłówek sekcji",
      "lead": "Krótki opis (1-2 zdania)"
    }
  }
}
```

### MDX (długie treści)
```mdx
---
title: "Misja Zakładu"
description: "Krótki opis"
lastUpdated: "2025-01-10"
---

# Misja

Długa treść z formatowaniem, nagłówkami, listami...
```

---

## 🎯 Podział odpowiedzialności

| Typ treści | Format | Przykład |
|------------|--------|----------|
| Przyciski, CTA | **JSON** | "Dowiedz się więcej" |
| Etykiety formularzy | **JSON** | "Imię i nazwisko" |
| Nagłówki sekcji | **JSON** | "Nasz zespół" |
| Leady (1-2 zdania) | **JSON** | "Poznaj naukowców..." |
| Długie opisy | **MDX** | Historia wydziału (kilka akapitów) |
| Formatowane treści | **MDX** | Polityka prywatności |

**Reguła kciuka:** Jeśli < 3 zdania → JSON, jeśli ≥ 3 zdania → MDX

---

## 📚 Pełna dokumentacja

- **[I18N Implementation Guide](./docs/I18N_IMPLEMENTATION_GUIDE.md)** – Kompletny przewodnik implementacji
- **[Translation Naming Convention](./docs/TRANSLATION_NAMING_CONVENTION.md)** – Konwencja nazewnictwa kluczy
- **[Sanity Migration Path](./docs/SANITY_MIGRATION_PATH.md)** – Ścieżka migracji do CMS
- **[I18N Checklist](./docs/I18N_CHECKLIST.md)** – Checklist wdrożenia

---

## 🔄 Przyszłość: Migracja do Sanity

To podejście (JSON + MDX) jest zaprojektowane z myślą o przyszłej migracji:

- **JSON pozostaje** – teksty UI nie potrzebują CMS
- **MDX → Sanity** – długie treści migrują do Portable Text
- **Stopniowa migracja** – łatwy rollback, testowanie per sekcja

Szczegóły: [SANITY_MIGRATION_PATH.md](./docs/SANITY_MIGRATION_PATH.md)

---

## ✅ Zalety tego podejścia

- ✅ **Prosty** – brak skomplikowanych abstrakcji
- ✅ **Skalowalny** – JSON per strona, MDX per temat
- ✅ **Czytelny** – jasny podział JSON vs MDX
- ✅ **Utrzymywalny** – łatwe dodawanie nowych tłumaczeń
- ✅ **Gotowy na CMS** – prosta migracja do Sanity
- ✅ **SEO-friendly** – static generation, hreflang

---

## 🆘 FAQ

**Q: Gdzie dodać nową stronę?**  
A: Stwórz `messages/pl/strona.json` i `messages/en/strona.json`, zaimportuj w `i18n/request.ts`

**Q: Kiedy używać JSON, a kiedy MDX?**  
A: JSON = krótkie UI (< 3 zdania), MDX = długie treści (≥ 3 zdania)

**Q: Jak przetłumaczyć nowy klucz?**  
A: Dodaj do obu plików JSON (PL i EN) w tej samej strukturze

**Q: Czy mogę użyć HTML w JSON?**  
A: Nie. Jeśli potrzebujesz formatowania, użyj MDX

**Q: Jak testować tłumaczenia?**  
A: `npm run build` – Next.js zgłosi missing keys

---

**Wersja:** 1.0.0  
**Ostatnia aktualizacja:** 2025-01-10
