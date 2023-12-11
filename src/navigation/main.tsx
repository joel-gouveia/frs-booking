import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { useAuth } from "@hooks/useAuth";
import { UnauthedStack } from "./unauthed-stack";
import { AuthedStack } from "./authed-stack";

export default function MainNavigation() {
  const { isAuthenticated } = useAuth();

  return (
    <NavigationContainer>
      {isAuthenticated && <AuthedStack />}
      {!isAuthenticated && <UnauthedStack />}
    </NavigationContainer>
  );
}
