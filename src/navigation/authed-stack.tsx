import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationSreens, RootStackParamList } from "src/types/navigation";

import { RouteSelectionScreen } from "@screens/RouteSelection";
import { HeaderLogo, HeaderRight } from "@components/index";
import { MainMenuScreen } from "@screens/MainMenu";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthedStack() {
  return (
    <Stack.Navigator
      initialRouteName={NavigationSreens.MAIN_MENU}
      screenOptions={{
        headerLeft: HeaderLogo,
        headerRight: HeaderRight,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#1d2362", // TODO: This will come from the theme
        },
      }}>
      <Stack.Screen name={NavigationSreens.ROUTES} component={RouteSelectionScreen} />
      <Stack.Screen name={NavigationSreens.MAIN_MENU} component={MainMenuScreen} />
    </Stack.Navigator>
  );
}
