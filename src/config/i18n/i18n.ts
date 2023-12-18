import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import { NativeModules } from "react-native";
import en from "./translations/en.json";

/**
 * @description NativeLocaleIdentifier is used to format price with currency
 * @example
 * NativeLocaleIdentifier = "en-US"
 * @example
 * NativeLocaleIdentifier = "de-DE"
 */
export const NativeLocaleIdentifier = NativeModules.I18nManager.localeIdentifier?.replace(
  "_",
  "-",
) as string | undefined;

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
