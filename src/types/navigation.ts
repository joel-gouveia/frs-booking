import {Route} from '@react-navigation/native';
import {NativeStackNavigationProp} from '@react-navigation/native-stack';

export enum NavigationSreens {
  LOGIN = 'login',
  HOME = 'home',
}

/**
 * Screen options for type checking.
 */
export type ScreenOptions = {
  [NavigationSreens.LOGIN]?: {};
  [NavigationSreens.HOME]?: {};
};

export type RootStackParamList = {
  [NavigationSreens.LOGIN]: ScreenOptions[NavigationSreens.LOGIN];
  [NavigationSreens.HOME]: ScreenOptions[NavigationSreens.HOME];
};

export type NavigationProps = NativeStackNavigationProp<
  RootStackParamList,
  keyof RootStackParamList
>;

export type PropsWithTypedRoute<T extends keyof RootStackParamList> = {
  route?: Route<T, RootStackParamList[T]>; // Route<T, P>
};
