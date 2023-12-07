import { Button } from "@components/index";
import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";

interface IFooterButton {
  label: string;
  onPress: () => void;
}

interface IFooter {
  buttons?: IFooterButton[];
}

function FooterButton({ label, onPress }: IFooterButton) {
  return (
    <View style={styles.btnContainer}>
      <Button onPress={onPress} variant="outline" style={styles.button} testID="footer-btn ">
        {label}
      </Button>
    </View>
  );
}

export function Footer({ buttons = [] }: IFooter) {
  return (
    <View style={styles.container}>
      {buttons.map(({ label, onPress }) => (
        <FooterButton key={label} label={label} onPress={onPress} />
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
  btnContainer: { width: "33.33%", paddingHorizontal: 16 },
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    height: "100%",
    backgroundColor: "#e3e3e3",
  },
});
