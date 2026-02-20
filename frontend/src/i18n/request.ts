import { getRequestConfig } from "next-intl/server";
import { routing } from "./routing";

export default getRequestConfig(async ({ requestLocale }) => {
  // This typically corresponds to the `[locale]` segment
  let locale = await requestLocale;

  // Ensure that a valid locale is used
  if (!locale || !routing.locales.includes(locale as any)) {
    locale = routing.defaultLocale;
  }

  // Import all message files and merge them
  const messages = {
    navigation: (await import(`@/messages/${locale}/navigation.json`)).default,
    common: (await import(`@/messages/${locale}/common.json`)).default,
    featuredBanner: (await import(`@/messages/${locale}/featuredBanner.json`)).default,
    home: (await import(`@/messages/${locale}/home.json`)).default,
    team: (await import(`@/messages/${locale}/team.json`)).default,
    projects: (await import(`@/messages/${locale}/projects.json`)).default,
    publications: (await import(`@/messages/${locale}/publications.json`)).default,
    models: (await import(`@/messages/${locale}/models.json`)).default,
    recruitment: (await import(`@/messages/${locale}/recruitment.json`)).default,
    cooperation: (await import(`@/messages/${locale}/cooperation.json`)).default,
    contact: (await import(`@/messages/${locale}/contact.json`)).default,
    footer: (await import(`@/messages/${locale}/footer.json`)).default,
  };

  return {
    locale,
    messages,
  };
});
