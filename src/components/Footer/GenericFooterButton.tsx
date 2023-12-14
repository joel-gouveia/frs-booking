import { StyleSheet } from "react-native";
import React from "react";
import { TextButton } from "@components/index";

interface IGenericFooterButton {
  label: string;
  onPress?: () => void;
}

export function GenericFooterButton({ label, onPress }: IGenericFooterButton) {
  return (
    <TextButton onPress={onPress} variant="outline" style={styles.button} testID="footer-btn ">
      {label}
    </TextButton>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
});
