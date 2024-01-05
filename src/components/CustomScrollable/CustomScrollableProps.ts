import { StyleProp, ViewStyle } from "react-native";

export interface CustomScrollableProps {
  /**
   * Styles applied to the view container.
   */
  wrapperViewContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the indicator should hide after a timeout
   * @default false
   */
  shouldIndicatorHide?: boolean;

  /**
   * Timeout to hide the indicator
   * @default 500
   */
  hideTimeout?: number;

  /**
   * Height of the indicator
   * @default 100
   */
  indicatorHeight?: number;

  /**
   * Whether the indicator should be flexible
   * @default true
   */
  flexibleIndicator?: boolean;

  /**
   * Styles applied to the scroll indicator container.
   */
  scrollIndicatorContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Styles applied to the scroll indicator.
   */
  scrollIndicatorStyle?: StyleProp<ViewStyle>;
}
