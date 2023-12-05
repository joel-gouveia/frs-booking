import React, {PropsWithChildren} from 'react';
import {View, ViewProps} from 'react-native';
import {ShortcutProps, defaultShortcuts} from '@styles/shortcuts';

interface ContainerProps {
  flex?: number;
  direction?: 'row' | 'column';
  gap?: number;
  alignItems?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  justifyContent?:
    | 'flex-start'
    | 'flex-end'
    | 'center'
    | 'space-between'
    | 'space-around'
    | 'space-evenly';
}

export interface StackProps
  extends PropsWithChildren<ViewProps>,
    ShortcutProps,
    ContainerProps {}

export const Stack = (props: StackProps) => {
  const {
    flex,
    direction,
    gap,
    alignItems,
    justifyContent,
    style,
    ...restProps
  } = props;

  const stackStyles = {
    ...defaultShortcuts(props),
    flexDirection: direction,
    flex: flex,
    gap: gap,
    alignItems: alignItems,
    justifyContent: justifyContent,
  };

  return (
    <View style={[style, stackStyles]} {...restProps}>
      {props.children}
    </View>
  );
};
