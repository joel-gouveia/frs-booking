import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./translations/en.json";

export enum Languages {
  EN = "en",
}

i18n.use(initReactI18next).init({
  compatibilityJSON: "v3",
  resources: {
    [Languages.EN]: { translation: en },
  },
  lng: Languages.EN,
  fallbackLng: Languages.EN,
  interpolation: {
    escapeValue: false,
  },
});

export default i18n;
