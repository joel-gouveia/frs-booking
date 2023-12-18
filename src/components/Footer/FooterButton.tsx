import { View, StyleSheet } from "react-native";
import React from "react";
import { TextButton } from "@components/index";

interface IFooterButton {
  label: string;
  onPress?: () => void;
}

export function FooterButton({ label, onPress }: IFooterButton) {
  return (
    <View style={styles.btnContainer}>
      <TextButton onPress={onPress} variant="outline" style={styles.button} testID="footer-btn ">
        {label}
      </TextButton>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
  btnContainer: {
    width: "33.33%",
    paddingHorizontal: 16,
  },
});
