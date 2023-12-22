import React from "react";
import { StyleProp, Text, TextStyle, View } from "react-native";
import { theme } from "src/theme/theme";
import { defaults, variants } from "./styles";
import { Button, IButton } from "./Button";
import { Typography } from "..";

export interface Props extends IButton {
  textStyle?: StyleProp<TextStyle>;
  hotkey?: string;
}

export function TextButton(props: Props) {
  const { variant = "solid", textStyle, hotkey, children, style } = props;

  if (hotkey !== undefined) {
    console.log(hotkey);
    return (
      <Button variant={variant} style={[style, { position: "relative" }]} {...props}>
        <View
          style={{
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
          }}>
          <Typography
            color={theme.colors.primary.contrastText}
            style={{
              fontWeight: "600",
              lineHeight: 14,
              fontSize: 11,
            }}>
            {hotkey}
          </Typography>
        </View>
        <Text style={[defaults.buttonText, variants[variant].buttonText, textStyle]}>
          {children}
        </Text>
      </Button>
    );
  }

  return (
    <Button variant={variant} style={style} {...props}>
      <Text style={[defaults.buttonText, variants[variant].buttonText, textStyle]}>{children}</Text>
    </Button>
  );
}
