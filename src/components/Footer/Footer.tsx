import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { theme } from "src/theme/theme";
import { HStack } from "..";

interface IFooter {
  children?: React.ReactNode;
}

export function Footer({ children }: IFooter) {
  return (
    <View style={styles.container}>
      <HStack style={styles.containerInner}>{children}</HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
    backgroundColor: theme.colors.background,
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
  },
  containerInner: {
    paddingHorizontal: 4,
    borderTopWidth: 1,
    borderColor: theme.colors.border,
    height: 54,
  },
});
