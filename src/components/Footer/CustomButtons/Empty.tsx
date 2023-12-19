import { View, StyleSheet } from "react-native";
import React from "react";

export function Empty() {
  return <View style={styles.emptyContainer} />;
}

const styles = StyleSheet.create({
  emptyContainer: {
    width: "33.33%",
  },
});
