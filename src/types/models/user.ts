import { Languages } from "src/config/i18n/i18n";

export enum Operations {
  // TODO: Add more operations types
  SALES = "SALES",
}

export interface UserInfo {
  name: string;
  email: string;
  language: Languages;
  paymentMethods: {
    code: string;
    name: string;
  }[];
  operations: {
    name: Operations;
    enabled: boolean;
  }[];
}

export interface ILoginRes {
  bearerToken: string;
  token_type: string;
  expires_in: number;
}
