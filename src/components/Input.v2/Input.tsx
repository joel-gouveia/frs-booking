import React, { PropsWithChildren } from "react";
import { TextInput, TextInputProps } from "react-native";

import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";
import { HStack } from "../HStack/HStack";
import { defaults, variants } from "./styles";
import { InputLeftElement, InputRightElement } from "./components";

interface Props extends PropsWithChildren, TextInputProps, ShortcutProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
  inputLeftElement?: React.ReactNode;
  inputRightElement?: React.ReactNode;
  variant?: keyof typeof variants;
}

export function Input(props: Props) {
  const {
    onChangeText,
    isDisabled,
    inputLeftElement,
    inputRightElement,
    style,
    variant = "standard",
    ...restProps
  } = props;

  return (
    <HStack style={[defaults().wrapper, defaultShortcuts(props)]} alignItems="center">
      <InputLeftElement shown={Boolean(inputLeftElement)}>{inputLeftElement}</InputLeftElement>
      <TextInput
        placeholderTextColor="white"
        onChangeText={text => !isDisabled && onChangeText?.(text)}
        style={[
          defaults({ hasLeftElement: Boolean(inputLeftElement) }).input,
          variants[variant].input,
          style,
        ]}
        {...restProps}
      />
      <InputRightElement shown={Boolean(inputRightElement)}>{inputRightElement}</InputRightElement>
    </HStack>
  );
}

Input.defaultProps = {
  isDisabled: false,
  isInvalid: false,
  variant: "standard",
};