import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";

interface IFooter {
  children?: React.ReactNode;
}

export function Footer({ children }: IFooter) {
  return <View style={styles.container}>{children}</View>;
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#d9d9d9",
    height: 70,
    position: "absolute",
    bottom: 0,
    width: Dimensions.get("window").width,
    display: "flex",
    flexDirection: "row",
    paddingVertical: 12,
  },
});
