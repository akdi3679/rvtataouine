import { getRequestConfig } from "next-intl";

export const locales = ["fr", "ar", "en"] as const;
export type Locale = (typeof locales)[number];

export const localeNames: Record<Locale, string> = {
  fr: "Français",
  ar: "العربية",
  en: "English",
};

export const defaultLocale: Locale = "fr";

export default getRequestConfig(async ({ locale }) => ({
  messages: (await import(`../messages/${locale}.json`)).default,
}));
