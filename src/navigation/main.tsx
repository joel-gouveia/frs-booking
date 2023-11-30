import React from "react";
import {NavigationContainer} from "@react-navigation/native";

// Navigation
import useAuth from "@hooks/useAuth";
import UnauthedStack from "./unauthed-stack";
import AuthedStack from "./authed-stack";

// Hooks

export default function MainNavigation() {
  const {isAuthenticated} = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated && <AuthedStack />}
      {!isAuthenticated && <UnauthedStack />}
    </NavigationContainer>
  );
}
