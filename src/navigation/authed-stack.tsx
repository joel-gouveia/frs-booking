import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationSreens, RootStackParamList } from "src/types/navigation";

import FlexWaysLogo from "@assets/images/logo.svg";
import Icon from "react-native-vector-icons/Ionicons";

import { VStack } from "@components/index";
import { RouteSelectionScreen } from "@screens/RouteSelection";

const Stack = createNativeStackNavigator<RootStackParamList>();

function HeaderLeft() {
  return <FlexWaysLogo width={100} height={40} fill="white" />;
}

function HeaderRight() {
  // TODO: Just as a placeholder. When functionality is added, this will be extracted to a component
  return <Icon name="menu" size={30} color="white" />;
}

export function AuthedStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerLeft: HeaderLeft,
        headerRight: HeaderRight,
        headerTitle: "",
        headerStyle: {
          backgroundColor: "#1d2362", // TODO: This will come from the theme
        },
      }}>
      <Stack.Screen name={NavigationSreens.HOME} component={VStack} />
      <Stack.Screen name={NavigationSreens.ROUTES} component={RouteSelectionScreen} />
    </Stack.Navigator>
  );
}
