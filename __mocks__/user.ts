import { Languages } from "src/types/i18n/languages";
import { ILoginRes, Operations, UserInfo } from "src/types/user";

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

export const userMocks = { userInfo, tokenInfo };
