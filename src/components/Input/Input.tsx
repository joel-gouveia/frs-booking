import React, {PropsWithChildren} from 'react';
import {TextInput, TextInputProps} from 'react-native';

import {HStack} from '..';
import {defaults, variants} from './styles';
import {InputLeftElement, InputRightElement} from './components';
import {ShortcutProps, defaultShortcuts} from '@styles/shortcuts';

interface Props extends PropsWithChildren, TextInputProps, ShortcutProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  inputLeftElement?: React.ReactNode;
  inputRightElement?: React.ReactNode;
  variant?: keyof typeof variants;
}

export const Input = (props: Props) => {
  const {
    onChangeText,
    isDisabled,
    inputLeftElement,
    inputRightElement,
    style,
    ...restProps
  } = props;

  return (
    <HStack
      style={[defaults().wrapper, defaultShortcuts(props)]}
      alignItems="center">
      <InputLeftElement shown={Boolean(inputLeftElement)}>
        {inputLeftElement}
      </InputLeftElement>
      <TextInput
        onChangeText={text => !isDisabled && onChangeText?.(text)}
        style={[
          defaults({hasLeftElement: Boolean(inputLeftElement)}).input,
          variants[props.variant!].input,
          style,
        ]}
        {...restProps}
      />
      <InputRightElement shown={Boolean(inputRightElement)}>
        {inputRightElement}
      </InputRightElement>
    </HStack>
  );
};

Input.defaultProps = {
  isDisabled: false,
  isInvalid: false,
  variant: 'filled',
};