import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreens, RootStackParamList } from "src/types/navigation";

import { RouteSelectionScreen } from "@screens/RouteSelection";
import { HeaderLogo, HeaderRight } from "@components/index";
import { MainMenuScreen } from "@screens/MainMenu";
import { BookingContextProvider } from "@context/booking";
import { DepartureTimeScreen } from "@screens/DepartureTime";
import { BookingScreen } from "@screens/Booking/Booking";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthedStack() {
  return (
    <BookingContextProvider>
      <Stack.Navigator
        initialRouteName={NavigationScreens.MAIN_MENU}
        screenOptions={{
          headerLeft: HeaderLogo,
          headerRight: HeaderRight,
          headerTitle: "",
          headerStyle: {
            backgroundColor: "#1d2362", // TODO: This will come from the theme
          },
        }}>
        <Stack.Screen name={NavigationScreens.ROUTES} component={RouteSelectionScreen} />
        <Stack.Screen name={NavigationScreens.MAIN_MENU} component={MainMenuScreen} />
        <Stack.Screen name={NavigationScreens.DEPARTURE_TIME} component={DepartureTimeScreen} />
        <Stack.Screen name={NavigationScreens.BOOKING} component={BookingScreen} />
      </Stack.Navigator>
    </BookingContextProvider>
  );
}
