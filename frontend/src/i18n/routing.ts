import { defineRouting } from 'next-intl/routing';
import { createNavigation } from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['pl', 'en'],

  // Used when no locale matches
  defaultLocale: 'pl',

  // Automatically detect user's preferred locale from Accept-Language header
  localeDetection: true,

  // Don't use a prefix for the default locale
  localePrefix: 'as-needed',

  // Polish routes (without prefix)
  // English routes (with /en prefix)
  pathnames: {
    '/': '/',
    '/projects': {
      pl: '/projekty',
      en: '/projects',
    },
    '/publications': {
      pl: '/publikacje',
      en: '/publications',
    },
    '/models': {
      pl: '/modele',
      en: '/models',
    },
    '/team': {
      pl: '/zespol',
      en: '/team',
    },
    '/recruitment': {
      pl: '/rekrutacja',
      en: '/recruitment',
    },
    '/cooperation': {
      pl: '/wspolpraca',
      en: '/cooperation',
    },
    '/contact': {
      pl: '/kontakt',
      en: '/contact',
    },
  },
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
