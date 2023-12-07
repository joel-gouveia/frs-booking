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
      login: "Login";
      "log-in-to": "Log in to";
      "frs-account": "FRS Account";
      "forgot-password?": "Forgot your Password?";
      username: "Username";
      password: "Password";
    };
    routes: {
      "choose-route": "Choose Route";
    };
    footer: {
      "main-menu": "Main Menu";
    };
  };
}

export default Resources;
