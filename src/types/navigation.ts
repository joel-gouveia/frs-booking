import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum NavigationScreens {
  LOGIN = "login",
  PASSWORD_RESET = "password-reset",
  ROUTES = "routes",
  MAIN_MENU = "main-menu",
  TICKET_TYPES = "ticket-types",
  DEPARTURE_TIME = "departure-time",
  BOOKING = "booking",
  BOOKING_SUMMARY = "booking-summary",
  PAYMENT = "payment",
}

/**
 * Screen options for type checking.
 */
export type ScreenOptions = {
  [NavigationScreens.LOGIN]?: {};
  [NavigationScreens.PASSWORD_RESET]?: {};
  [NavigationScreens.ROUTES]?: {};
  [NavigationScreens.MAIN_MENU]?: {};
  [NavigationScreens.TICKET_TYPES]?: {};
  [NavigationScreens.DEPARTURE_TIME]?: {};
  [NavigationScreens.BOOKING]?: {};
  [NavigationScreens.BOOKING_SUMMARY]?: {};
  [NavigationScreens.PAYMENT]?: {};
};

export type RootStackParamList = {
  [NavigationScreens.LOGIN]: ScreenOptions[NavigationScreens.LOGIN];
  [NavigationScreens.PASSWORD_RESET]: ScreenOptions[NavigationScreens.PASSWORD_RESET];
  [NavigationScreens.ROUTES]: ScreenOptions[NavigationScreens.ROUTES];
  [NavigationScreens.MAIN_MENU]: ScreenOptions[NavigationScreens.MAIN_MENU];
  [NavigationScreens.TICKET_TYPES]: ScreenOptions[NavigationScreens.TICKET_TYPES];
  [NavigationScreens.DEPARTURE_TIME]: ScreenOptions[NavigationScreens.DEPARTURE_TIME];
  [NavigationScreens.BOOKING]: ScreenOptions[NavigationScreens.BOOKING];
  [NavigationScreens.BOOKING_SUMMARY]: ScreenOptions[NavigationScreens.BOOKING_SUMMARY];
  [NavigationScreens.PAYMENT]: ScreenOptions[NavigationScreens.PAYMENT];
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type PropsWithTypedRoute<T extends keyof RootStackParamList> = {
  route?: Route<T, RootStackParamList[T]>; // Route<T, P>
};
