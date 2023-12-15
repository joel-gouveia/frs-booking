import React from "react";
import { Text } from "react-native";
import { defaults, variants } from "./styles";
import { Button, IButton } from "./Button";

export interface Props extends IButton {}

export function TextButton(props: Props) {
  const { variant = "solid", fontSize, children } = props;

  return (
    <Button variant={variant} {...props}>
      <Text style={[defaults.buttonText, variants[variant].buttonText, { fontSize }]}>
        {children}
      </Text>
    </Button>
  );
}
