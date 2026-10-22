import defaults from "./cms-defaults.json";

type ObjectValue = Record<string, unknown>;
const object = (value: unknown): ObjectValue =>
  value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as ObjectValue)
    : {};
function text(value: unknown, fallback: string, max = 3000): string {
  return typeof value === "string" && value.trim().length > 0 && value.length <= max
    ? value
    : fallback;
}
function localized(
  value: unknown,
  fallback: { pl: string; en: string },
  locale: "pl" | "en"
): string {
  return text(object(value)[locale], fallback[locale]);
}

export function resolveWebsiteContent(raw: unknown, language: string) {
  const locale = language === "en" ? "en" : "pl";
  const data = object(raw),
    rawContact = object(data.contact),
    rawSettings = object(data.settings);
  const contact = Object.fromEntries(
    Object.entries(defaults.contact).map(([key, fallback]) => [
      key,
      localized(rawContact[key], fallback, locale),
    ])
  ) as Record<keyof typeof defaults.contact, string>;
  const settings = Object.fromEntries(
    Object.entries(defaults.settings).map(([key, fallback]) => [
      key,
      typeof fallback === "string"
        ? text(rawSettings[key], fallback, 300)
        : localized(rawSettings[key], fallback, locale),
    ])
  ) as Record<keyof typeof defaults.settings, string>;
  if (!/^\+[0-9]{6,15}$/.test(settings.phoneNumber))
    settings.phoneNumber = defaults.settings.phoneNumber;
  if (!/^[A-Za-z0-9._+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,63}$/.test(settings.email))
    settings.email = defaults.settings.email;
  const mapUrl =
    "https://www.google.com/maps?q=" +
    encodeURIComponent(settings.mapAddress) +
    "&output=embed&hl=" +
    locale;
  return { contact, settings, mapUrl };
}
export type WebsiteContent = ReturnType<typeof resolveWebsiteContent>;
