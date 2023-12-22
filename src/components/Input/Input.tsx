import React, { PropsWithChildren, useMemo, useState } from "react";
import { TextInput, TextInputProps } from "react-native";

import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";
import { HStack } from "@components/HStack/HStack";
import { defaults, variants } from "./styles";
import { InputLeftElement, InputRightElement, FloatingLabel } from "./components";

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
    placeholder: label,
    value,
    ...restProps
  } = props;

  const [isFocused, setIsFocused] = useState(false);
  const mustFloatLabel = useMemo(() => Boolean(isFocused || value), [isFocused, value]);

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setIsFocused(false);
  };

  return (
    <HStack style={[defaults().wrapper, defaultShortcuts(props)]} alignItems="center">
      {label && <FloatingLabel label={label} isFloat={mustFloatLabel} />}
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
        onFocus={handleFocus}
        onBlur={handleBlur}
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
