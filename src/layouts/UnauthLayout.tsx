import React, { PropsWithChildren } from "react";
import { VStack } from "@components/index";
import { ScrollView, StyleSheet } from "react-native";
import { theme } from "src/theme/theme";

interface Props extends PropsWithChildren {
  isScrollable?: boolean;
}

export function UnauthLayout({ isScrollable, ...restProps }: Props) {
  if (isScrollable) {
    return (
      <ScrollView keyboardShouldPersistTaps="handled" style={styles.scrollView}>
        <VStack flex={1} p={22} style={styles.container}>
          {restProps.children}
        </VStack>
      </ScrollView>
    );
  }

  return (
    <VStack flex={1} p={22} style={styles.container}>
      {restProps.children}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.primary.main,
  },
  scrollView: {
    backgroundColor: theme.colors.primary.main,
  },
});
