import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { NavigationScreens, RootStackParamList } from "src/types/navigation";

import { RouteSelectionScreen } from "@screens/RouteSelection";
import { MainMenuScreen } from "@screens/MainMenu";
import { DepartureTimeScreen } from "@screens/DepartureTime";
import { BookingScreen } from "@screens/Booking/Booking";
import { PaymentScreen } from "@screens/Payment";
import { BookingSummaryScreen } from "@screens/BookingSummary";
import { Header } from "@components/Header/Header";
import { TicketTypesScreen } from "@screens/TicketTypes";

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AuthedStack() {
  return (
    <Stack.Navigator
      initialRouteName={NavigationScreens.ROUTES}
      screenOptions={{
        header: Header,
      }}>
      <Stack.Screen name={NavigationScreens.ROUTES} component={RouteSelectionScreen} />
      <Stack.Screen name={NavigationScreens.MAIN_MENU} component={MainMenuScreen} />
      <Stack.Screen name={NavigationScreens.TICKET_TYPES} component={TicketTypesScreen} />
      <Stack.Screen name={NavigationScreens.DEPARTURE_TIME} component={DepartureTimeScreen} />
      <Stack.Screen name={NavigationScreens.BOOKING} component={BookingScreen} />
      <Stack.Screen name={NavigationScreens.BOOKING_SUMMARY} component={BookingSummaryScreen} />
      <Stack.Screen name={NavigationScreens.PAYMENT} component={PaymentScreen} />
    </Stack.Navigator>
  );
}
