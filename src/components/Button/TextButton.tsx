import React from "react";
import { StyleProp, StyleSheet, Text, TextStyle, View } from "react-native";
import { theme } from "src/theme/theme";
import { defaults, variants } from "./styles";
import { Button, IButton } from "./Button";
import { Typography } from "..";

export interface Props extends IButton {
  textStyle?: StyleProp<TextStyle>;
  hotkey?: string | number;
}

export function TextButton(props: Props) {
  const { variant = "solid", textStyle, hotkey, children, style, ...restProps } = props;

  return (
    <Button variant={variant} style={[styles.container, style]} {...restProps}>
      {hotkey && (
        <View style={styles.hotKey}>
          <Typography color={theme.colors.primary.contrastText} style={styles.hotKeyText}>
            {hotkey}
          </Typography>
        </View>
      )}
      <Text style={[defaults.buttonText, variants[variant].buttonText, textStyle]}>{children}</Text>
    </Button>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
  },
  hotKey: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    right: 8,
    top: 8,
    borderRadius: 3,
    height: 16,
    width: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hotKeyText: {
    fontWeight: "600",
    lineHeight: 14,
    fontSize: 11,
  },
});
