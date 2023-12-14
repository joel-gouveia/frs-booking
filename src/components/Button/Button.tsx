import React, { PropsWithChildren } from "react";
import {
  ActivityIndicator,
  TextStyle,
  TouchableOpacity,
  ViewProps,
  StyleSheet,
} from "react-native";
import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";
import { defaults, variants } from "./styles";

export interface IButton extends PropsWithChildren, ViewProps, TextStyle, ShortcutProps {
  onPress?: () => void;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  variant?: "solid" | "outline" | "ghost";
  disabled?: boolean;
  isLoading?: boolean;
}

export function Button(props: IButton) {
  const {
    startIcon,
    endIcon,
    variant = "solid",
    disabled,
    isLoading,
    onPress,
    children,
    style,
    ...restProps
  } = props;
  return (
    <TouchableOpacity
      activeOpacity={0.6}
      onPress={onPress}
      style={[defaults.button, variants[variant].button, defaultShortcuts(props), style]}
      disabled={disabled}
      {...restProps}>
      {isLoading && (
        <ActivityIndicator animating color={variants[variant].loader.color} style={styles.loader} />
      )}
      {startIcon && !isLoading && startIcon}
      {children}
      {endIcon && !isLoading && endIcon}
    </TouchableOpacity>
  );
}

Button.defaultProps = {
  variant: "solid",
  disabled: false,
  isLoading: false,
};

const styles = StyleSheet.create({
  loader: {
    marginRight: 8,
  },
});
