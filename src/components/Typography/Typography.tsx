import { Text, TextProps, TextStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";
import { ISizes, sizes } from "./styles";

interface TypographyProps {
  size?: ISizes;
  fontSize?: number;
  bold?: boolean;
  color?: string; // TODO: Make this type safe once there's a color palette
}

interface Props extends PropsWithChildren<TextProps>, ShortcutProps, TypographyProps {}

export function Typography(props: Props) {
  const { fontSize, size = "md", bold, color, style, ...restProps } = props;

  const defaultStyles: TextStyle = {
    fontWeight: bold ? "bold" : undefined,
    color: color ?? "black",
  };

  return (
    <Text
      style={[defaultStyles, defaultShortcuts(props), sizes[size], { fontSize }, style]}
      {...restProps}>
      {props.children}
    </Text>
  );
}
