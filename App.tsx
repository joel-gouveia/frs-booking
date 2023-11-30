import React from "react";
import {AuthContextProvider} from "@context/auth";
import MainNavigation from "@navigation/main";

export default function App() {
  return (
    <AuthContextProvider>
      <MainNavigation />
    </AuthContextProvider>
  );
}
