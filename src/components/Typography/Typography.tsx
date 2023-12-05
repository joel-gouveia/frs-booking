import {Text, TextProps, TextStyle} from 'react-native';
import React, {PropsWithChildren} from 'react';
import {ShortcutProps, defaultShortcuts} from '@styles/shortcuts';

interface TypographyProps {
  fontSize?: number;
  bold?: boolean;
  color?: string; // TODO: Make this type safe once there's a color palette
}

interface Props
  extends PropsWithChildren<TextProps>,
    ShortcutProps,
    TypographyProps {}

export const Typography = (props: Props) => {
  const {fontSize, bold, color, style, ...restProps} = props;

  const defaultStyles: TextStyle = {
    fontSize: fontSize ?? 16,
    fontWeight: bold ? 'bold' : undefined,
    color: color ?? 'black',
  };

  return (
    <Text
      style={[defaultStyles, defaultShortcuts(props), style]}
      {...restProps}>
      {props.children}
    </Text>
  );
};
