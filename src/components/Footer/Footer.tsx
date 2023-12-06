import { Button } from "@components/index";
import { View, Dimensions, StyleSheet } from "react-native";
import React, { useMemo } from "react";

interface IFooter {
  buttons?: { label: string; onPress: () => void }[];
}

export function Footer({ buttons = [] }: IFooter) {
  const screenWidth = Dimensions.get("window").width;

  const styles = useMemo(() => getStyles(screenWidth), [screenWidth]);

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

const getStyles = (screenWidth: number) =>
  StyleSheet.create({
    container: {
      backgroundColor: "#d9d9d9",
      height: 70,
      position: "absolute",
      bottom: 0,
      width: screenWidth,
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
