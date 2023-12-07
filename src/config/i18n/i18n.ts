import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";
import de from "./translations/de.json";

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    en: { translation: en },
    de: { translation: de },
  },
  lng: "en",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
