import React, { PropsWithChildren } from "react";
import { ActivityIndicator, Text, TextStyle, TouchableOpacity, ViewProps } from "react-native";
import { defaults, variants } from "./styles";

interface Props extends PropsWithChildren, ViewProps, TextStyle {
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  fontSize?: number;
  variant: "solid" | "outline" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button(props: Props) {
  const {
    startIcon,
    endIcon,
    variant,
    disabled,
    isLoading,
    onPress,
    children,
    fontSize,
    style,
    ...restProps
  } = props;

  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[defaults.button, variants[variant].button, style]}
      disabled={disabled}
      {...restProps}>
      {isLoading && <ActivityIndicator animating color={variants[variant].loader.color} />}
      {startIcon && !isLoading && startIcon}
      <Text style={[defaults.buttonText, variants[variant].buttonText, { fontSize }]}>
        {children}
      </Text>
      {endIcon && !isLoading && endIcon}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  variant: "solid",
  disabled: false,
  isLoading: false,
};
