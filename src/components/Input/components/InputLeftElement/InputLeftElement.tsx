import React, {PropsWithChildren} from 'react';
import {View} from 'react-native';
import {styles} from './styles';

interface Props extends PropsWithChildren {
  shown?: boolean;
}

export const InputLeftElement = (props: Props) => {
  if (!props.shown) {
    return null;
  }

  return <View style={[styles.leftAlign]}>{props.children}</View>;
};
