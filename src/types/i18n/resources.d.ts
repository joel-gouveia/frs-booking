import { Languages } from "./languages";

interface Resources {
  [Languages.DE]: {
    login: {
      username: "Nutzername";
      password: "Passwort";
    };
  };
  [Languages.EN]: {
    login: {
      username: "Username";
      password: "Password";
    };
  };
}

export default Resources;
