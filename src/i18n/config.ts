import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./locales/en";
import sw from "./locales/sw";

export const SUPPORTED_LANGUAGES = {
  en: { code: "en", label: "English", nativeLabel: "English" },
  sw: { code: "sw", label: "Swahili", nativeLabel: "Kiswahili" },
} as const;

export type LanguageCode = keyof typeof SUPPORTED_LANGUAGES;

export const DEFAULT_LANGUAGE: LanguageCode = "en";

const resources = {
  en: { translation: en },
  sw: { translation: sw },
};

i18n.use(initReactI18next).init({
  resources,
  lng: DEFAULT_LANGUAGE,
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
  compatibilityJSON: "v4",
});

export default i18n;
