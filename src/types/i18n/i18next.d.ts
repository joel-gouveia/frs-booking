import "i18next";
import { Languages } from "src/config/i18n/i18n";
import Resources from "./resources";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: Resources[Languages];
    };
  }
}
