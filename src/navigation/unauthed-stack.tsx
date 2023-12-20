import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreens, RootStackParamList } from "src/types/navigation";

import { HeaderLogo } from "@components/index";
import { LoginScreen } from "@screens/Login";
import { PasswordResetScreen } from "@screens/PasswordReset";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function UnauthedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: HeaderLogo,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#1d2362", // TODO: This will come from the theme
        },
      }}>
      <Stack.Screen name={NavigationScreens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavigationScreens.PASSWORD_RESET} component={PasswordResetScreen} />
    </Stack.Navigator>
  );
}
