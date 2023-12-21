import React, { PropsWithChildren } from "react";
import { VStack } from "@components/index";
import { StyleSheet } from "react-native";
import { theme } from "src/theme/theme";

interface Props extends PropsWithChildren {}

export function ScreenLayout(props: Props) {
  return (
    <VStack flex={1} p={20} style={styles.container}>
      {props.children}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.backgroung,
  },
});
