import React from "react";
import { StyleProp, Text, TextStyle } from "react-native";
import { defaults, variants } from "./styles";
import { Button, IButton } from "./Button";

export interface Props extends IButton {
  textStyle?: StyleProp<TextStyle>;
}

export function TextButton(props: Props) {
  const { variant = "solid", textStyle, children } = props;

  return (
    <Button variant={variant} {...props}>
      <Text style={[defaults.buttonText, variants[variant].buttonText, textStyle]}>{children}</Text>
    </Button>
  );
}
