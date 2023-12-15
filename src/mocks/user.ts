import { Languages } from "@config/i18n/i18n";
import { ILoginRes, Operations, UserInfo } from "src/types/models/user";

const loginInfo = {
  username: "john.doe",
  password: "changeme",
};

const userInfo: UserInfo = {
  name: "John Doe",
  email: "john.doe@frs.de",
  language: Languages.EN,
  paymentMethods: [
    {
      code: "Six",
      name: "Credit Card",
    },
  ],
  operations: [
    {
      name: Operations.SALES,
      enabled: true,
    },
  ],
};

const tokenInfo: ILoginRes = {
  bearerToken: "eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX25hbWUiOiJk",
  token_type: "bearer",
  expires_in: 2591999,
};

export const userMocks = { userInfo, tokenInfo, loginInfo };
