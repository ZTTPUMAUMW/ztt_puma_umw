# 🏷️ Konwencja nazewnictwa kluczy tłumaczeń

## Zasady ogólne

### 1. **Hierarchia odpowiada strukturze UI**

```json
{
  "sekcja": {
    "element": {
      "właściwość": "wartość"
    }
  }
}
```

### 2. **Nazewnictwo w `camelCase`**

```json
// ✅ DOBRZE
"heroTitle": "Tytuł",
"ctaPrimary": "Przycisk główny"

// ❌ ŹLE
"hero_title": "Tytuł",
"cta-primary": "Przycisk"
```

### 3. **Prefiks wskazuje kontekst**

#### **Strony:** `home`, `about`, `team`, `research`, `contact`

```json
// home.json
{
  "hero": { "title": "...", "subtitle": "..." },
  "sections": { ... }
}

// about.json
{
  "hero": { "title": "...", "subtitle": "..." },
  "sections": { ... }
}
```

#### **Nawigacja:** `navigation.json`

```json
{
  "header": {
    "home": "Strona główna",
    "about": "O wydziale"
  },
  "footer": {
    "university": "...",
    "sections": { ... }
  }
}
```

#### **Wspólne:** `common.json`

```json
{
  "buttons": { "learnMore": "...", "readMore": "..." },
  "labels": { "required": "...", "optional": "..." },
  "accessibility": { "skipToContent": "..." }
}
```

---

## Wzorce dla typowych elementów

### **Hero / Banner**

```json
{
  "hero": {
    "title": "Główny tytuł",
    "subtitle": "Podtytuł / lead",
    "cta": {
      "primary": "Przycisk główny",
      "secondary": "Przycisk drugoplanowy"
    }
  }
}
```

### **Sekcje strony**

```json
{
  "sections": {
    "nazwaSekcji": {
      "heading": "Nagłówek sekcji",
      "lead": "Krótki opis (1-2 zdania)",
      "cta": "Przycisk / link"
    }
  }
}
```

### **Karty / Grid items**

```json
{
  "items": {
    "nazwaPola": {
      "title": "Tytuł karty",
      "description": "Krótki opis",
      "link": "Tekst linku"
    }
  }
}
```

### **Formularze**

```json
{
  "form": {
    "fields": {
      "nazwaPola": {
        "label": "Etykieta pola",
        "placeholder": "Placeholder",
        "error": "Komunikat błędu",
        "hint": "Podpowiedź (opcjonalnie)"
      }
    },
    "validation": {
      "required": "Pole wymagane",
      "invalidEmail": "Nieprawidłowy email"
    },
    "messages": {
      "success": "Formularz wysłany",
      "error": "Błąd wysyłania"
    }
  }
}
```

### **Listy / wyliczenia**

```json
{
  "features": {
    "heading": "Nagłówek listy",
    "items": {
      "feature1": "Pierwsza cecha",
      "feature2": "Druga cecha",
      "feature3": "Trzecia cecha"
    }
  }
}
```

### **Statystyki / liczniki**

```json
{
  "stats": {
    "researchers": "Pracownicy naukowi",
    "phd": "Doktoranci",
    "publications": "Publikacje rocznie"
  }
}
```

---

## Przykłady złożonych struktur

### **Strona główna (home.json)**

```json
{
  "hero": {
    "title": "Zakład Technologii Translacyjnych",
    "subtitle": "Innowacyjne rozwiązania...",
    "cta": {
      "primary": "Poznaj nasze badania",
      "secondary": "Zespół"
    }
  },
  "sections": {
    "about": {
      "heading": "Czym się zajmujemy?",
      "lead": "Łączymy badania podstawowe..."
    },
    "research": {
      "heading": "Kierunki badawcze",
      "lead": "Nasze projekty obejmują...",
      "areas": {
        "microbiology": "Mikrobiologia",
        "biotechnology": "Biotechnologia",
        "bioengineering": "Inżynieria biomedyczna"
      }
    },
    "team": {
      "heading": "Nasz zespół",
      "lead": "Doświadczeni naukowcy...",
      "stats": {
        "researchers": "Pracownicy naukowi",
        "phd": "Doktoranci",
        "publications": "Publikacje rocznie"
      }
    },
    "cta": {
      "heading": "Współpraca i kontakt",
      "lead": "Zapraszamy do współpracy...",
      "button": "Skontaktuj się z nami"
    }
  }
}
```

### **Strona zespołu (team.json)**

```json
{
  "hero": {
    "title": "Nasz zespół",
    "subtitle": "Poznaj naukowców, doktorantów i studentów"
  },
  "filters": {
    "all": "Wszyscy",
    "researchers": "Pracownicy",
    "phd": "Doktoranci",
    "students": "Studenci"
  },
  "memberCard": {
    "position": "Stanowisko",
    "email": "E-mail",
    "readMore": "Czytaj więcej",
    "publications": "Publikacje",
    "projects": "Projekty"
  },
  "modal": {
    "close": "Zamknij",
    "biography": "Biografia",
    "research": "Zainteresowania badawcze",
    "contact": "Kontakt"
  }
}
```

### **Formularz kontaktowy (contact.json)**

```json
{
  "hero": {
    "title": "Kontakt",
    "subtitle": "Skontaktuj się z zespołem"
  },
  "info": {
    "address": {
      "heading": "Adres",
      "department": "Zakład Technologii Translacyjnych",
      "university": "Uniwersytet Medyczny we Wrocławiu",
      "street": "ul. Borowska 211",
      "city": "50-556 Wrocław"
    },
    "phone": {
      "heading": "Telefon",
      "number": "+48 71 123 4567"
    },
    "email": {
      "heading": "E-mail",
      "address": "kontakt@puma.umw.edu.pl"
    }
  },
  "form": {
    "heading": "Wyślij wiadomość",
    "fields": {
      "name": {
        "label": "Imię i nazwisko",
        "placeholder": "Jan Kowalski"
      },
      "email": {
        "label": "Adres e-mail",
        "placeholder": "jan.kowalski@example.com"
      },
      "subject": {
        "label": "Temat",
        "placeholder": "W jakiej sprawie się kontaktujesz?"
      },
      "message": {
        "label": "Wiadomość",
        "placeholder": "Treść wiadomości..."
      }
    },
    "consent": {
      "label": "Wyrażam zgodę na przetwarzanie danych osobowych",
      "required": "Zgoda jest wymagana"
    },
    "validation": {
      "nameRequired": "Imię i nazwisko jest wymagane",
      "emailRequired": "Adres e-mail jest wymagany",
      "emailInvalid": "Nieprawidłowy format adresu e-mail",
      "messageRequired": "Wiadomość jest wymagana",
      "messageMinLength": "Wiadomość musi mieć minimum 10 znaków"
    },
    "messages": {
      "sending": "Wysyłanie...",
      "success": "Wiadomość została wysłana",
      "error": "Błąd podczas wysyłania. Spróbuj ponownie."
    }
  }
}
```

---

## Dobre praktyki

### ✅ **DO:**

- Trzymaj klucze krótkie i opisowe: `heroTitle`, nie `homepageMainHeroSectionTitle`
- Grupuj logicznie: wszystkie przyciski w `buttons`, wszystkie etykiety w `labels`
- Używaj liczby pojedynczej dla kluczy: `button`, `label`, `item`
- Używaj liczby mnogiej dla kontenerów: `buttons`, `labels`, `items`
- Konsekwentnie nazywaj podobne elementy na różnych stronach (np. zawsze `hero.title`)

### ❌ **DON'T:**

- Nie wkładaj HTML: `"title": "<h1>Tytuł</h1>"` ❌
- Nie używaj underscorów: `hero_title` ❌
- Nie łącz różnych języków: `titlePL`, `titleEN` ❌
- Nie numeruj kluczy: `feature1`, `feature2` (chyba że naprawdę potrzebujesz kolejności)
- Nie twórz płaskich struktur: `homeHeroTitle`, `homeHeroSubtitle` (lepiej: `home.hero.title`)

---

## Przykład użycia w komponencie

```tsx
import { useTranslations } from "next-intl";

export default function HomePage() {
  const t = useTranslations("home");
  const tCommon = useTranslations("common");

  return (
    <>
      {/* Hero */}
      <h1>{t("hero.title")}</h1>
      <p>{t("hero.subtitle")}</p>
      <button>{t("hero.cta.primary")}</button>

      {/* Sekcja */}
      <section>
        <h2>{t("sections.about.heading")}</h2>
        <p>{t("sections.about.lead")}</p>
        <a href="/about">{tCommon("buttons.learnMore")}</a>
      </section>

      {/* Statystyki */}
      <div>
        <span>{t("sections.team.stats.researchers")}</span>
        <span>{t("sections.team.stats.phd")}</span>
      </div>
    </>
  );
}
```

---

## Kiedy użyć MDX zamiast JSON?

| Treść                            | Format                                   | Uzasadnienie                      |
| -------------------------------- | ---------------------------------------- | --------------------------------- |
| Nagłówek sekcji (1-2 słowa)      | **JSON**                                 | Krótkie, UI, łatwe tłumaczenie    |
| Lead / podtytuł (1-2 zdania)     | **JSON**                                 | Krótkie, UI, łatwe tłumaczenie    |
| Opis projektu (2-3 akapity)      | **MDX**                                  | Długie, redakcyjne, formatowanie  |
| Historia wydziału (kilka sekcji) | **MDX**                                  | Długie, redakcyjne, zdjęcia/media |
| Tekst przycisku                  | **JSON**                                 | Krótkie, UI, wielokrotnie używane |
| Polityka prywatności             | **MDX**                                  | Długie, prawne, formatowanie      |
| Etykiety pól formularza          | **JSON**                                 | Krótkie, UI, wielokrotnie używane |
| FAQ (pytanie + odpowiedź)        | **JSON** (pytanie) + **MDX** (odpowiedź) | Hybrydowe podejście               |

---

## Zmiana nazwy klucza (refactoring)

Jeśli musisz zmienić nazwę klucza:

1. **Znajdź wszystkie wystąpienia** w plikach JSON (pl + en)
2. **Znajdź wszystkie użycia** w kodzie (`t('staryKlucz')`)
3. **Zmień konsekwentnie** w obu miejscach
4. **Przetestuj** obie wersje językowe

**Tip:** Używaj Visual Studio Code Search & Replace (Cmd+Shift+F) z regex:

```regex
t\(['"]oldKey['"]\)
```

Zamień na:

```
t('newKey')
```
