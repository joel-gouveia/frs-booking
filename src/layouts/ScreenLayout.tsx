import React, { PropsWithChildren } from "react";
import { VStack } from "@components/index";
import { ScrollView } from "react-native";

interface Props extends PropsWithChildren {
  isScrollable?: boolean;
}

export function ScreenLayout({ isScrollable, ...restProps }: Props) {
  if (isScrollable) {
    return (
      <ScrollView keyboardShouldPersistTaps="handled">
        <VStack flex={1} p={20}>
          {restProps.children}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <VStack flex={1} p={20}>
      {restProps.children}
    </VStack>
  );
}
