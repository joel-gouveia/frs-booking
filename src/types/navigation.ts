import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum NavigationScreens {
  LOGIN = "login",
  HOME = "home",
  ROUTES = "routes",
  MAIN_MENU = "main-menu",
}

/**
 * Screen options for type checking.
 */
export type ScreenOptions = {
  [NavigationScreens.LOGIN]?: {};
  [NavigationScreens.HOME]?: {};
  [NavigationScreens.ROUTES]?: {};
  [NavigationScreens.MAIN_MENU]?: {};
};

export type RootStackParamList = {
  [NavigationScreens.LOGIN]: ScreenOptions[NavigationScreens.LOGIN];
  [NavigationScreens.HOME]: ScreenOptions[NavigationScreens.HOME];
  [NavigationScreens.ROUTES]: ScreenOptions[NavigationScreens.ROUTES];
  [NavigationScreens.MAIN_MENU]: ScreenOptions[NavigationScreens.MAIN_MENU];
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type PropsWithTypedRoute<T extends keyof RootStackParamList> = {
  route?: Route<T, RootStackParamList[T]>; // Route<T, P>
};
