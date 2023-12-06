import { Button } from "@components/index";
import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";

interface IFooter {
  buttons?: { label: string; onPress: () => void }[];
}

export function Footer({ buttons = [] }: IFooter) {
  return (
    <View style={styles.container}>
      {buttons.map(({ label, onPress }) => (
        <View key={label} style={{ width: "33%", paddingHorizontal: 16 }}>
          <Button onPress={onPress} variant="outline" style={styles.button}>
            {label}
          </Button>
        </View>
      ))}
    </View>
  );
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
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
});
