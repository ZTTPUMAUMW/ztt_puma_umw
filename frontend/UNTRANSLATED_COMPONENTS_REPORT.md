# Raport komponentów bez tłumaczeń

Data: 2024
Status: Analiza przeprowadzona po migracji do struktury podzielonych plików JSON

## Podsumowanie

**Komponenty z pełnym tłumaczeniem (używające `useTranslations`):**

- ✅ HomeHero
- ✅ InfoCards
- ✅ ResearchAreas
- ✅ FeatureBoxes
- ✅ QuickLinks
- ✅ CTASection
- ✅ Header
- ✅ Footer (częściowo)
- ✅ Contact page
- ✅ Recruitment page
- ✅ Cooperation page
- ✅ Models page
- ✅ Team page
- ✅ Projects page
- ✅ Publications page

**Komponenty z hardcoded tekstami polskimi (do przetłumaczenia):**

1. PublicationItem - nazwy miesięcy po polsku
2. ProjectItem - hardcoded tekst "Rola pracowników w projekcie:"
3. TeamCard - hardcoded aria-label po polsku
4. ContactForm - wszystkie etykiety i komunikaty po polsku
5. Footer - niektóre teksty hardcoded
6. GrantLogos - tytuł sekcji "Projekty finansowane przez"

---

## 1. PublicationItem.tsx

**Status:** ❌ BRAK TŁUMACZEŃ

**Lokalizacja:** `src/components/PublicationItem.tsx`

**Problem:**

- Nazwy miesięcy są hardcoded po polsku (linie 17-20)
- Brak importu `useTranslations`

**Hardcoded teksty:**

```typescript
const monthNames = [
  "Styczeń",
  "Luty",
  "Marzec",
  "Kwiecień",
  "Maj",
  "Czerwiec",
  "Lipiec",
  "Sierpień",
  "Wrzesień",
  "Październik",
  "Listopad",
  "Grudzień",
];
```

**Sugerowana poprawka:**

### 1. Dodaj do `messages/pl/publications.json`:

```json
{
  "hero": { ... },
  "filters": { ... },
  "labels": { ... },
  "months": {
    "january": "Styczeń",
    "february": "Luty",
    "march": "Marzec",
    "april": "Kwiecień",
    "may": "Maj",
    "june": "Czerwiec",
    "july": "Lipiec",
    "august": "Sierpień",
    "september": "Wrzesień",
    "october": "Październik",
    "november": "Listopad",
    "december": "Grudzień"
  }
}
```

### 2. Dodaj do `messages/en/publications.json`:

```json
{
  "hero": { ... },
  "filters": { ... },
  "labels": { ... },
  "months": {
    "january": "January",
    "february": "February",
    "march": "March",
    "april": "April",
    "may": "May",
    "june": "June",
    "july": "July",
    "august": "August",
    "september": "September",
    "october": "October",
    "november": "November",
    "december": "December"
  }
}
```

### 3. Zmodyfikuj komponent:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import styles from "../styles/pages/publications.module.scss";

export interface Publication {
  title: string;
  authors: string;
  year: number;
  month: number;
  journal: string;
  doi: string;
  url: string;
}

interface PublicationItemProps {
  publication: Publication;
}

const monthKeys = [
  "january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];

function formatAuthors(authors: string): string {
  const authorArray = authors.split(" and ");

  if (authorArray.length === 1) {
    return authors;
  }

  if (authorArray.length === 2) {
    return authorArray.join(" and ");
  }

  const allButLast = authorArray.slice(0, -1).join(", ");
  const lastAuthor = authorArray[authorArray.length - 1];

  return \`\${allButLast} and \${lastAuthor}\`;
}

export default function PublicationItem({ publication }: PublicationItemProps) {
  const t = useTranslations('publications');
  const { title, authors, year, month, journal, doi, url } = publication;
  const monthKey = monthKeys[month - 1];
  const monthName = t(\`months.\${monthKey}\`);
  const formattedAuthors = formatAuthors(authors);

  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles['publication']}
    >
      <div className={styles['publication__content']}>
        <div className={styles['publication__wrapper']}>
          <div className={styles['publication__meta']}>
            <span className={styles['publication__date']}>{monthName} {year}</span>
          </div>

          <h3
            className={styles['publication__title']}
            dangerouslySetInnerHTML={{ __html: title }}
          />

          <div className={styles['publication__info']}>
            <p className={styles['publication__authors']}>{formattedAuthors}</p>
            <div className={styles['publication__meta-row']}>
              <span className={styles['publication__journal']}>{journal}</span>
              {doi && (
                <span className={styles['publication__doi']}>
                  DOI: {doi}
                </span>
              )}
            </div>
          </div>
        </div>
      </div>
    </a>
  );
}
```

**Priorytet:** 🔴 WYSOKI (widoczne dla użytkowników)

---

## 2. ProjectItem.tsx

**Status:** ❌ BRAK TŁUMACZEŃ

**Lokalizacja:** `src/components/ProjectItem.tsx`

**Problem:**

- Hardcoded text "Rola pracowników w projekcie:" (linia 70)
- Hardcoded aria-label z polskim tekstem (linia 28)

**Hardcoded teksty:**

```tsx
// Linia 28
'aria-label': `Zobacz szczegóły projektu: ${project.title}`

// Linia 70
<strong>Rola pracowników w projekcie:</strong>
```

**Sugerowana poprawka:**

### 1. Dodaj do `messages/pl/projects.json`:

```json
{
  "hero": { ... },
  "stats": { ... },
  "labels": {
    "fundingBody": "Źródło finansowania",
    "projectNumber": "Numer projektu",
    "fundingAmount": "Wartość finansowania",
    "team": "Zespół",
    "learnMore": "Więcej informacji",
    "viewDetails": "Zobacz szczegóły projektu: {title}",
    "rolesHeading": "Rola pracowników w projekcie:"
  }
}
```

### 2. Dodaj do `messages/en/projects.json`:

```json
{
  "hero": { ... },
  "stats": { ... },
  "labels": {
    "fundingBody": "Source of funding",
    "projectNumber": "Project number",
    "fundingAmount": "Value of financing",
    "team": "Team",
    "learnMore": "More information",
    "viewDetails": "View project details: {title}",
    "rolesHeading": "Role of employees in the project:"
  }
}
```

### 3. Zmodyfikuj komponent:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "@/styles/pages/projects.module.scss";

export interface Project {
  title: string;
  funding_body: string;
  funding_body_number?: string;
  description: string;
  roles: { name: string; role: string }[];
  funding_amount: string;
  funding_logo?: string;
  link?: string;
}

interface ProjectItemProps {
  project: Project;
}

export default function ProjectItem({ project }: ProjectItemProps) {
  const t = useTranslations("projects.labels");
  const Wrapper = project.link ? "a" : "div";
  const wrapperProps = project.link
    ? {
        href: project.link,
        target: "_blank",
        rel: "noopener noreferrer",
        className: styles["project-component-link"],
        "aria-label": t("viewDetails", { title: project.title }),
      }
    : {};

  return (
    <Wrapper {...wrapperProps}>
      <div className={styles["project-component"]}>
        {/* ... reszta JSX ... */}

        {project.roles && project.roles.length > 0 && (
          <div className={styles["project-component__roles"]}>
            <strong>{t("rolesHeading")}</strong>
            <ul className={styles["project-component__roles-list"]}>
              {project.roles.map((person, index) => (
                <li key={index}>
                  {person.name} – {person.role}
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </Wrapper>
  );
}
```

**Priorytet:** 🔴 WYSOKI (widoczne dla użytkowników)

---

## 3. TeamCard.tsx

**Status:** ❌ BRAK TŁUMACZEŃ

**Lokalizacja:** `src/components/TeamCard.tsx`

**Problem:**

- Hardcoded aria-label po polsku (linia 28)

**Hardcoded tekst:**

```tsx
aria-label={`Pokaż szczegóły członka zespołu: ${member.name}`}
```

**Sugerowana poprawka:**

### 1. Dodaj do `messages/pl/team.json`:

```json
{
  "hero": { ... },
  "stats": { ... },
  "tabs": { ... },
  "labels": {
    "showMemberDetails": "Pokaż szczegóły członka zespołu: {name}"
  }
}
```

### 2. Dodaj do `messages/en/team.json`:

```json
{
  "hero": { ... },
  "stats": { ... },
  "tabs": { ... },
  "labels": {
    "showMemberDetails": "Show team member details: {name}"
  }
}
```

### 3. Zmodyfikuj komponent:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "../styles/components/team-card.module.scss";

export interface TeamMember {
  id: string;
  name: string;
  title: string;
  image: string;
  image_2x: string;
  alt: string;
  copy: string;
  links: { title: string; url: string }[];
}

interface TeamCardProps {
  member: TeamMember;
  onOpenModal: (member: TeamMember) => void;
}

export default function TeamCard({ member, onOpenModal }: TeamCardProps) {
  const t = useTranslations("team.labels");

  return (
    <div className={styles["section-team__item"]}>
      <button
        onClick={() => onOpenModal(member)}
        className={styles["team-card-button"]}
        aria-label={t("showMemberDetails", { name: member.name })}
      >
        <div className={styles["thumbnail"]}>
          <div className={styles["image"]}>
            <Image
              className={styles["box-component__image"]}
              src={`/${member.image}`}
              alt={member.alt}
              fill
              sizes="(min-width: 1367px) 581px, 580px"
              style={{ objectFit: "cover" }}
            />
          </div>
        </div>
        <h3 className={`${styles["thumbnail--name"]} color-secondary`}>{member.name}</h3>
        <div className={`${styles["position"]} has-tertiary-color`}>{member.title}</div>
      </button>
    </div>
  );
}
```

**Priorytet:** 🟡 ŚREDNI (accessibility, niewidoczne wizualnie)

---

## 4. ContactForm.tsx

**Status:** ❌ BRAK TŁUMACZEŃ (największy problem)

**Lokalizacja:** `src/components/ContactForm.tsx`

**Problem:**

- **OGROMNY komponent (537 linii)** z wszystkimi tekstami po polsku
- Używany na stronach kontaktu, rekrutacji i współpracy
- Wszystkie etykiety, komunikaty o błędach, walidacje - po polsku

**Przykładowe hardcoded teksty (tylko próbka!):**

```tsx
// Etykiety pól
"Imię *";
"Nazwisko *";
"E-mail *";
"Temat *";
"Wiadomość *";
"Załącz pliki PDF";

// Komunikaty błędów
"To pole jest wymagane.";
"Imię musi mieć od 2 do 50 znaków.";
"Nieprawidłowy adres e-mail.";
"Wiadomość musi mieć od 20 do 2000 znaków.";
"Całkowity rozmiar załączników nie może przekraczać 20 MB.";

// Komunikaty systemowe
"Formularz został wysłany pomyślnie!";
"Błąd podczas wysyłania formularza.";
"Proszę spróbować ponownie później.";
```

**Sugerowana poprawka:**

To jest **największy** komponent do przetłumaczenia. Ze względu na rozmiar, sugeruję:

### 1. Utworzyć nowy plik: `messages/pl/forms.json`

```json
{
  "contact": {
    "labels": {
      "firstName": "Imię",
      "lastName": "Nazwisko",
      "companyName": "Nazwa firmy",
      "email": "E-mail",
      "subject": "Temat",
      "message": "Wiadomość",
      "attachments": "Załącz pliki PDF",
      "required": "*",
      "submit": "Wyślij"
    },
    "placeholders": {
      "firstName": "Wprowadź imię",
      "lastName": "Wprowadź nazwisko",
      "companyName": "Wprowadź nazwę firmy",
      "email": "twoj@email.com",
      "subject": "Wybierz temat",
      "message": "Opisz swoją wiadomość..."
    },
    "validation": {
      "required": "To pole jest wymagane.",
      "firstName": {
        "tooShort": "Imię musi mieć co najmniej {min} znaki.",
        "tooLong": "Imię nie może być dłuższe niż {max} znaków."
      },
      "lastName": {
        "tooShort": "Nazwisko musi mieć co najmniej {min} znaki.",
        "tooLong": "Nazwisko nie może być dłuższe niż {max} znaków."
      },
      "email": {
        "invalid": "Nieprawidłowy adres e-mail.",
        "tooShort": "E-mail musi mieć co najmniej {min} znaków.",
        "tooLong": "E-mail nie może być dłuższy niż {max} znaków."
      },
      "subject": {
        "tooShort": "Temat musi mieć co najmniej {min} znaków.",
        "tooLong": "Temat nie może być dłuższy niż {max} znaków."
      },
      "message": {
        "tooShort": "Wiadomość musi mieć co najmniej {min} znaków.",
        "tooLong": "Wiadomość nie może być dłuższa niż {max} znaków."
      },
      "files": {
        "tooLarge": "Całkowity rozmiar załączników nie może przekraczać {max} MB.",
        "invalidType": "Tylko pliki PDF są dozwolone.",
        "addFailed": "Nie można dodać pliku."
      }
    },
    "messages": {
      "success": "Formularz został wysłany pomyślnie!",
      "error": "Błąd podczas wysyłania formularza.",
      "tryAgain": "Proszę spróbować ponownie później.",
      "submissionLimit": "Przekroczono limit wysłanych formularzy. Spróbuj ponownie za {minutes} minut.",
      "tooFast": "Formularz został wysłany zbyt szybko. Proszę spróbować ponownie.",
      "recaptchaError": "Błąd weryfikacji reCAPTCHA. Proszę odświeżyć stronę.",
      "submitting": "Wysyłanie..."
    },
    "files": {
      "remove": "Usuń",
      "size": "Rozmiar",
      "total": "Łącznie"
    }
  }
}
```

### 2. Utworzyć `messages/en/forms.json` (angielska wersja)

```json
{
  "contact": {
    "labels": {
      "firstName": "First Name",
      "lastName": "Last Name",
      "companyName": "Company Name",
      "email": "E-mail",
      "subject": "Subject",
      "message": "Message",
      "attachments": "Attach PDF files",
      "required": "*",
      "submit": "Submit"
    },
    "placeholders": {
      "firstName": "Enter first name",
      "lastName": "Enter last name",
      "companyName": "Enter company name",
      "email": "your@email.com",
      "subject": "Select subject",
      "message": "Describe your message..."
    },
    "validation": {
      "required": "This field is required.",
      "firstName": {
        "tooShort": "First name must be at least {min} characters.",
        "tooLong": "First name cannot be longer than {max} characters."
      },
      "lastName": {
        "tooShort": "Last name must be at least {min} characters.",
        "tooLong": "Last name cannot be longer than {max} characters."
      },
      "email": {
        "invalid": "Invalid email address.",
        "tooShort": "Email must be at least {min} characters.",
        "tooLong": "Email cannot be longer than {max} characters."
      },
      "subject": {
        "tooShort": "Subject must be at least {min} characters.",
        "tooLong": "Subject cannot be longer than {max} characters."
      },
      "message": {
        "tooShort": "Message must be at least {min} characters.",
        "tooLong": "Message cannot be longer than {max} characters."
      },
      "files": {
        "tooLarge": "Total attachment size cannot exceed {max} MB.",
        "invalidType": "Only PDF files are allowed.",
        "addFailed": "Cannot add file."
      }
    },
    "messages": {
      "success": "Form submitted successfully!",
      "error": "Error submitting form.",
      "tryAgain": "Please try again later.",
      "submissionLimit": "Submission limit exceeded. Try again in {minutes} minutes.",
      "tooFast": "Form submitted too quickly. Please try again.",
      "recaptchaError": "reCAPTCHA verification error. Please refresh the page.",
      "submitting": "Submitting..."
    },
    "files": {
      "remove": "Remove",
      "size": "Size",
      "total": "Total"
    }
  }
}
```

### 3. Zmodyfikować początek ContactForm.tsx:

```tsx
"use client";

import { useTranslations } from "next-intl";
import styles from "@/styles/pages/recruitment.module.scss";
import { useState, FormEvent, useEffect } from "react";

// ... (reszta interfejsów i deklaracji)

export default function ContactForm({
  submitEndpoint = "/api/contact",
  attachmentLabel,
  maxTotalFileSize = 20 * 1024 * 1024,
  onSuccess,
  subjectOptions,
  showCompanyField = false,
}: ContactFormProps) {
  const t = useTranslations("forms.contact");

  // Użyj tłumaczeń zamiast hardcoded wartości
  const actualAttachmentLabel = attachmentLabel || t("labels.attachments");

  // ... reszta logiki

  // Przykład użycia w JSX:
  return (
    <form onSubmit={handleSubmit}>
      <label>
        {t("labels.firstName")} {t("labels.required")}
        <input
          type="text"
          placeholder={t("placeholders.firstName")}
          // ...
        />
      </label>

      {/* Komunikaty błędów */}
      {validationErrors.first_name && (
        <span className={styles.error}>{validationErrors.first_name}</span>
      )}

      {/* Button submit */}
      <button type="submit" disabled={isSubmitting}>
        {isSubmitting ? t("messages.submitting") : t("labels.submit")}
      </button>

      {/* Komunikat sukcesu/błędu */}
      {message && (
        <div className={message.type === "success" ? styles.success : styles.error}>
          {message.text}
        </div>
      )}
    </form>
  );
}
```

**UWAGA:** Ze względu na rozmiar tego komponentu (537 linii), pełna migracja wymaga:

1. Utworzenia plików `forms.json` dla obu języków
2. Zastąpienia WSZYSTKICH hardcoded tekstów wywołaniami `t()`
3. Aktualizacji funkcji walidacji aby używały `t()` z parametrami
4. Dodania `'use client'` na początku pliku (jeśli jeszcze nie ma)
5. Importu `useTranslations`

**Priorytet:** 🔴 KRYTYCZNY (formularz używany na 3 stronach: contact, recruitment, cooperation)

**Szacowany czas:** 2-3 godziny

---

## 5. Footer.tsx

**Status:** ⚠️ CZĘŚCIOWO PRZETŁUMACZONY

**Lokalizacja:** `src/components/Footer.tsx`

**Problem:**

- Używa `useTranslations` dla navigation i footer
- Ale ma kilka hardcoded tekstów po polsku (linii 33, 34, 39, 58, 62)

**Hardcoded teksty:**

```tsx
// Linie 33-34
<p>Zakład Technologii Translacyjnych</p>
<p>Pracownia Unikalnych Modeli Aplikacyjnych</p>

// Linia 39
<p className={styles['site-footer__main-description']}>
  Innowacyjne rozwiązania na styku farmacji, medycyny i biotechnologii
</p>

// Linia 44
<h3>Strona</h3>

// Linia 58
<h3>Linki</h3>
```

**Sugerowana poprawka:**

### 1. Zaktualizuj `messages/pl/footer.json`:

```json
{
  "address": "Adres",
  "contact": "Kontakt",
  "quickLinks": "Szybkie linki",
  "allRightsReserved": "Wszelkie prawa zastrzeżone",
  "tagline": "Innowacyjne modele biologiczne i bioinżynieryjne",
  "department": "Zakład Technologii Translacyjnych",
  "lab": "Pracownia Unikalnych Modeli Aplikacyjnych",
  "description": "Innowacyjne rozwiązania na styku farmacji, medycyny i biotechnologii",
  "sections": {
    "site": "Strona",
    "links": "Linki"
  },
  "about": {
    "title": "O nas",
    "home": "Strona główna",
    "team": "Zespół",
    "publications": "Publikacje"
  },
  "services": {
    "title": "Usługi",
    "projects": "Projekty",
    "models": "Modele",
    "cooperation": "Współpraca"
  },
  "contactSection": {
    "title": "Kontakt",
    "email": "E-mail",
    "phone": "Telefon",
    "recruitment": "Rekrutacja"
  },
  "copyright": "Pracownia Unikalnych Modeli Aplikacyjnych. Wszelkie prawa zastrzeżone."
}
```

### 2. Zaktualizuj `messages/en/footer.json`:

```json
{
  "address": "Address",
  "contact": "Contact",
  "quickLinks": "Quick links",
  "allRightsReserved": "All rights reserved",
  "tagline": "Innovative biological and bioengineering models",
  "department": "Department of Translational Technologies",
  "lab": "Laboratory of Unique Application Models",
  "description": "Innovative solutions at the intersection of science, medicine and biotechnology",
  "sections": {
    "site": "Site",
    "links": "Links"
  },
  "about": {
    "title": "About us",
    "home": "Homepage",
    "team": "Team",
    "publications": "Publications"
  },
  "services": {
    "title": "Services",
    "projects": "Projects",
    "models": "Models",
    "cooperation": "Collaboration"
  },
  "contactSection": {
    "title": "Contact",
    "email": "E-mail",
    "phone": "Phone",
    "recruitment": "Recruitment"
  },
  "copyright": "Laboratory of Unique Application Models. All rights reserved."
}
```

### 3. Zmodyfikuj Footer.tsx:

```tsx
"use client";

import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useTranslations } from "next-intl";
import styles from "../styles/components/footer.module.scss";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  const t = useTranslations("navigation");
  const tFooter = useTranslations("footer");

  return (
    <footer className={styles["site-footer"]}>
      <div className={styles["site-footer__pattern"]}></div>
      <div className={styles["site-footer__container"]}>
        <div className={styles["site-footer__content"]}>
          <div
            className={`${styles["site-footer__section"]} ${styles["site-footer__section--main"]}`}
          >
            <a
              href="https://www.umw.edu.pl/pl"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="UMW"
            >
              <Image
                src="/umw-logo.svg"
                alt="Logo Uniwersytetu Medycznego we Wrocławiu"
                width={180}
                height={60}
                className={styles["site-footer__main-logo"]}
              />
            </a>
            <p>{tFooter("department")}</p>
            <p>{tFooter("lab")}</p>
            <p className={styles["site-footer__main-description"]}>{tFooter("description")}</p>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("sections.site")}</h3>
            <ul>
              <li>
                <Link href="/">{t("home")}</Link>
              </li>
              <li>
                <Link href="/projects" as="/projects">
                  {t("projects")}
                </Link>
              </li>
              <li>
                <Link href="/publications" as="/publications">
                  {t("publications")}
                </Link>
              </li>
              <li>
                <Link href="/models" as="/models">
                  {t("models")}
                </Link>
              </li>
              <li>
                <Link href="/team" as="/team">
                  {t("team")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("contact")}</h3>
            <ul>
              <li>
                <Link href="/recruitment" as="/recruitment">
                  {t("recruitment")}
                </Link>
              </li>
              <li>
                <Link href="/cooperation" as="/cooperation">
                  {t("cooperation")}
                </Link>
              </li>
              <li>
                <Link href="/contact" as="/contact">
                  {t("contact")}
                </Link>
              </li>
            </ul>
          </div>

          <div className={styles["site-footer__section"]}>
            <h3>{tFooter("sections.links")}</h3>
            <ul>
              <li>
                <a href="https://www.umw.edu.pl" target="_blank" rel="noopener noreferrer">
                  Uniwersytet Medyczny we Wrocławiu
                </a>
              </li>
              <li>
                <a
                  href="https://www.umw.edu.pl/pl/jednostki/zaklad-technologii-translacyjnych"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  ZTT UMW
                </a>
              </li>
              <li>
                <a
                  href="https://ppm.umw.edu.pl/info/affiliation/UMW49ae3cc953a04e37bf652c1f8ab5791a?r=publication&tab=publications&title=Profil%2Bjednostki%2B%25E2%2580%2593%2BZak%25C5%2582ad%2BTechnologii%2BTranslacyjnych%2B%25E2%2580%2593%2BUniwersytet%2BMedyczny%2Bim.%2BPiast%25C3%25B3w%2B%25C5%259Al%25C4%2585skich%2Bwe%2BWroc%25C5%2582awiu&lang=pl&pn=1"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Polska Platforma Medyczna
                </a>
              </li>
              <li>
                <a href="https://plum.umw.edu.pl" target="_blank" rel="noopener noreferrer">
                  PLUM EDU
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className={styles["site-footer__bottom"]}>
          <p>
            &copy; {currentYear} P.U.M.A. - {tFooter("lab")}. {tFooter("allRightsReserved")}.
          </p>
        </div>
      </div>
    </footer>
  );
}
```

**Priorytet:** 🟡 ŚREDNI (widoczne ale mniej krytyczne)

---

## 6. GrantLogos.tsx

**Status:** ❌ BRAK TŁUMACZEŃ

**Lokalizacja:** `src/components/GrantLogos.tsx`

**Problem:**

- Hardcoded tytuł sekcji "Projekty finansowane przez" (linia 13)

**Hardcoded tekst:**

```tsx
<h2 className={styles["grant-logos__title"]}>Projekty finansowane przez</h2>
```

**Sugerowana poprawka:**

### 1. Dodaj do `messages/pl/home.json`:

```json
{
  "hero": { ... },
  "infoCards": { ... },
  "researchAreas": { ... },
  "features": { ... },
  "quickLinks": { ... },
  "cta": { ... },
  "grants": {
    "heading": "Projekty finansowane przez"
  }
}
```

### 2. Dodaj do `messages/en/home.json`:

```json
{
  "hero": { ... },
  "infoCards": { ... },
  "researchAreas": { ... },
  "features": { ... },
  "quickLinks": { ... },
  "cta": { ... },
  "grants": {
    "heading": "Projects funded by"
  }
}
```

### 3. Zmodyfikuj GrantLogos.tsx:

```tsx
"use client";

import { useTranslations } from "next-intl";
import Image from "next/image";
import styles from "@/styles/components/grant-logos.module.scss";

const grantLogos = [
  {
    src: "/images/grant_logo/abm.svg",
    alt: "Agencja Badań Medycznych",
    url: "https://abm.gov.pl/pl/",
  },
  {
    src: "/images/grant_logo/ncbr.svg",
    alt: "Narodowe Centrum Badań i Rozwoju",
    url: "https://www.gov.pl/web/ncbr",
  },
  { src: "/images/grant_logo/ncn.svg", alt: "Narodowe Centrum Nauki", url: "https://ncn.gov.pl" },
  {
    src: "/images/grant_logo/umw-logo.svg",
    alt: "Uniwersytet Medyczny we Wrocławiu - Młoda Nauka",
    url: "https://subwencja.umw.edu.pl/",
  },
];

export default function GrantLogos() {
  const t = useTranslations("home.grants");

  return (
    <section className={styles["grant-logos__section"]}>
      <div className={styles["grant-logos__container"]}>
        <h2 className={styles["grant-logos__title"]}>{t("heading")}</h2>
        <div className={styles["grant-logos__track-wrapper"]}>
          {/* ... reszta JSX bez zmian ... */}
        </div>
      </div>
    </section>
  );
}
```

**Priorytet:** 🟡 ŚREDNI (widoczne ale pojedynczy tekst)

---

## 7. TabbedSection.tsx

**Status:** ✅ NEUTRALNE (ogólny komponent UI)

Ten komponent nie zawiera hardcoded tekstów - przyjmuje `label` jako props od komponentów rodzicielskich, które już używają tłumaczeń.

---

## 8. ModelItem.tsx

**Status:** ✅ NEUTRALNE (komponent prezentacyjny)

Ten komponent nie zawiera własnych tekstów - wyświetla tylko przekazane props (title, description). Treści pochodzą z komponentów rodzicielskich.

---

## Podsumowanie priorytetów

### 🔴 KRYTYCZNE (do natychmiastowej naprawy):

1. **ContactForm.tsx** - używany na 3 stronach, ~100 hardcoded tekstów
2. **PublicationItem.tsx** - nazwy miesięcy po polsku na liście publikacji
3. **ProjectItem.tsx** - widoczne teksty na liście projektów

### 🟡 ŚREDNIE (ważne ale mniej pilne):

4. **Footer.tsx** - kilka hardcoded tekstów, widoczne na każdej stronie
5. **GrantLogos.tsx** - pojedynczy tytuł sekcji
6. **TeamCard.tsx** - aria-label (accessibility)

### ✅ UKOŃCZONE:

- HomeHero ✅
- InfoCards ✅
- ResearchAreas ✅
- FeatureBoxes ✅
- QuickLinks ✅
- CTASection ✅
- Header ✅
- Wszystkie strony (pages) ✅

---

## Zalecenia

1. **Zacznij od ContactForm** - jest używany na 3 stronach i ma najwięcej hardcoded tekstów
2. **Dodaj nowy plik forms.json** dla tłumaczeń formularzy (może być używany w przyszłości dla innych formularzy)
3. **Przetestuj po każdej zmianie** - upewnij się że tłumaczenia działają poprawnie
4. **Użyj TypeScript** - dodaj typy dla kluczy tłumaczeń aby uniknąć literówek
5. **Zautomatyzuj** - rozważ użycie DeepL API do automatycznego tłumaczenia nowych kluczy

---

## Szacowany czas implementacji

- ContactForm: **2-3 godziny**
- PublicationItem: **30 minut**
- ProjectItem: **30 minut**
- Footer: **30 minut**
- GrantLogos: **15 minut**
- TeamCard: **15 minut**

**Łącznie: ~4-5 godzin pracy**

---

## Testowanie po migracji

Po wprowadzeniu zmian, przetestuj:

1. ✅ Przełączanie języków działa poprawnie
2. ✅ Wszystkie teksty są przetłumaczone
3. ✅ Formularze walidują się poprawnie w obu językach
4. ✅ Komunikaty błędów wyświetlają się w odpowiednim języku
5. ✅ Accessibility labels są przetłumaczone
6. ✅ Build projektu przechodzi bez błędów: `npm run build`
7. ✅ Typescript sprawdza typy: `npm run type-check`
