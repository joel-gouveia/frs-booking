import React from "react";
import {AuthContextProvider} from "@context/auth";
import MainNavigation from "@navigation/main";

export function App() {
  return (
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>
  );
}
