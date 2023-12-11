import React, { PropsWithChildren } from "react";
import { VStack } from "@components/index";

interface Props extends PropsWithChildren {}

export function ScreenLayout(props: Props) {
  return (
    <VStack flex={1} p={20}>
      {props.children}
    </VStack>
  );
}
