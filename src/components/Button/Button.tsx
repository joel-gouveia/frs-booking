import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  StyleProp,
  Text,
  TextStyle,
  TouchableOpacity,
  ViewProps,
} from "react-native";
import { defaults, variants } from "./styles";

interface Props extends PropsWithChildren, ViewProps, TextStyle {
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fontSize?: number;
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
  textStyle?: StyleProp<TextStyle>;
}

export function Button(props: Props) {
  const {
    startIcon,
    endIcon,
    variant = "solid",
    disabled,
    isLoading,
    onPress,
    children,
    fontSize,
    style,
    textStyle,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[defaults.button, variants[variant!].button, style]}
      disabled={disabled}
      {...restProps}>
      {isLoading && <ActivityIndicator animating color={variants[variant].loader.color} />}
      {startIcon && !isLoading && startIcon}
      {typeof children !== "string" && children}
      {typeof children === "string" && (
        <Text style={[defaults.buttonText, variants[variant].buttonText, textStyle, { fontSize }]}>
          {children}
        </Text>
      )}
      {endIcon && !isLoading && endIcon}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  variant: "solid",
  disabled: false,
  isLoading: false,
};
