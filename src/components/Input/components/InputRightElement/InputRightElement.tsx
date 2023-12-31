import React, { PropsWithChildren } from "react";
import { View } from "react-native";
import { styles } from "./styles";

interface Props extends PropsWithChildren {
  shown?: boolean;
}

export function InputRightElement(props: Props) {
  if (!props.shown) {
    return null;
  }

  return <View style={[styles.rightAlign]}>{props.children}</View>;
}
