import "i18next";
import Resources from "./resources";
import { Languages } from "./languages";

declare module "i18next" {
  interface CustomTypeOptions {
    resources: {
      translation: Resources[Languages];
    };
  }
}
