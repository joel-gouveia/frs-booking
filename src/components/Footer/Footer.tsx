import { View, Dimensions, StyleSheet } from "react-native";
import React from "react";
import { FooterButton } from "./FooterButton";

interface IFooter {
  buttons?: (IFooterButton | ICustomButtonLabel)[];
}

export function Footer({ buttons = [] }: IFooter) {
  return (
    <View style={styles.container}>
      {buttons.map(button => {
        const key = typeof button === "string" ? button : button.label;

        return (
          <View key={key} style={styles.btnContainer}>
            <FooterButton button={button} />
          </View>
        );
      })}
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
  btnContainer: {
    width: "33.33%",
    paddingHorizontal: 16,
  },
});
