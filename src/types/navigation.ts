import { Route } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

export enum NavigationSreens {
  LOGIN = "login",
  ROUTES = "routes",
  MAIN_MENU = "mainMenu",
}

/**
 * Screen options for type checking.
 */
export type ScreenOptions = {
  [NavigationSreens.LOGIN]?: {};
  [NavigationSreens.ROUTES]?: {};
  [NavigationSreens.MAIN_MENU]?: {};
};

export type RootStackParamList = {
  [NavigationSreens.LOGIN]: ScreenOptions[NavigationSreens.LOGIN];
  [NavigationSreens.ROUTES]: ScreenOptions[NavigationSreens.ROUTES];
  [NavigationSreens.MAIN_MENU]: ScreenOptions[NavigationSreens.MAIN_MENU];
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type PropsWithTypedRoute<T extends keyof RootStackParamList> = {
  route?: Route<T, RootStackParamList[T]>; // Route<T, P>
};
