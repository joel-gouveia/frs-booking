import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreens, RootStackParamList } from "src/types/navigation";

import { LoginScreen } from "@screens/Login";
import { PasswordResetScreen } from "@screens/PasswordReset";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function UnauthedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Stack.Screen name={NavigationScreens.LOGIN} component={LoginScreen} />
      <Stack.Screen name={NavigationScreens.PASSWORD_RESET} component={PasswordResetScreen} />
    </Stack.Navigator>
  );
}
