import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationSreens, RootStackParamList } from "src/types/navigation";

import Icon from "react-native-vector-icons/Ionicons";

import { RouteSelectionScreen } from "@screens/RouteSelection";
import { HeaderLogo } from "@components/index";
import { MainMenuScreen } from "@screens/MainMenu";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthedStack() {
  return (
    <Stack.Navigator
      initialRouteName={NavigationSreens.MAIN_MENU}
      screenOptions={{
        headerLeft: HeaderLogo,
        headerRight: () => <Icon name="menu" size={30} color="white" />, // TODO: Just as a placeholder. When functionality is added, this will be extracted to a component
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
