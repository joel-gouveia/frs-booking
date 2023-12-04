import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "./languages/en.json";
import de from "./languages/de.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en,
      de,
    },
    lng: "en",
    fallbackLng: "en",
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
