import React, { PropsWithChildren } from "react";
import { TextInputProps, TouchableOpacity } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { Input } from "./Input";

interface Props extends PropsWithChildren, TextInputProps {
  isDisabled?: boolean;
  isInvalid?: boolean;
}

export function PasswordInput(props: Props) {
  const [showPassword, setShowPassword] = React.useState(false);

  const onPress = () => setShowPassword(prev => !prev);

  return (
    <Input
      {...props}
      secureTextEntry={!showPassword}
      inputRightElement={
        <TouchableOpacity onPress={onPress}>
          <Icon name={showPassword ? "eye" : "eye-off"} size={26} color="white" />
        </TouchableOpacity>
      }
    />
  );
}
