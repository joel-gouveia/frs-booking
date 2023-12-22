import { Text, TextProps, TextStyle } from "react-native";
import React, { PropsWithChildren } from "react";
import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";
import { theme } from "src/theme/theme";
import { ISizes, ITextVariants, sizes, variants } from "./styles";

interface TypographyProps {
  variant?: ITextVariants;
  size?: ISizes;
  bold?: boolean;
  color?:
    | typeof theme.colors.text
    | typeof theme.colors.primary.contrastText
    | typeof theme.colors.secondary.contrastText;
}

interface Props extends PropsWithChildren<TextProps>, ShortcutProps, TypographyProps {}

export function Typography(props: Props) {
  const { size = "md", variant, bold, color, style, ...restProps } = props;

  const defaultStyles: TextStyle = {
    fontWeight: bold ? "bold" : undefined,
    color: color ?? theme.colors.text,
  };

  const variantStyle = variant ? variants[variant] : {};

  return (
    <Text
      style={[defaultStyles, defaultShortcuts(props), sizes[size], variantStyle, style]}
      {...restProps}>
      {props.children}
    </Text>
  );
}
