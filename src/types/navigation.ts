import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum NavigationScreens {
  LOGIN = "login",
  ROUTES = "routes",
  MAIN_MENU = "main-menu",
  DEPARTURE_TIME = "departure-time",
  BOOKING = "booking",
}

/**
 * Screen options for type checking.
 */
export type ScreenOptions = {
  [NavigationScreens.LOGIN]?: {};
  [NavigationScreens.ROUTES]?: {};
  [NavigationScreens.MAIN_MENU]?: {};
  [NavigationScreens.DEPARTURE_TIME]?: {};
  [NavigationScreens.BOOKING]?: {};
};

export type RootStackParamList = {
  [NavigationScreens.LOGIN]: ScreenOptions[NavigationScreens.LOGIN];
  [NavigationScreens.ROUTES]: ScreenOptions[NavigationScreens.ROUTES];
  [NavigationScreens.MAIN_MENU]: ScreenOptions[NavigationScreens.MAIN_MENU];
  [NavigationScreens.DEPARTURE_TIME]: ScreenOptions[NavigationScreens.DEPARTURE_TIME];
  [NavigationScreens.BOOKING]: ScreenOptions[NavigationScreens.BOOKING];
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type PropsWithTypedRoute<T extends keyof RootStackParamList> = {
  route?: Route<T, RootStackParamList[T]>; // Route<T, P>
};
