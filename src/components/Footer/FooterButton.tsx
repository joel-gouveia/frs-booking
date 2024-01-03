import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Typography } from "@components/index";
import { theme } from "src/theme/theme";

interface IFooterButton {
  label: string;
  symbolColor?: keyof typeof theme.colors.symbols;
  onPress?: () => void;
}

export function FooterButton({ label, symbolColor, onPress }: IFooterButton) {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={onPress} style={styles.button} testID="footer-btn">
        <Typography color={theme.colors.secondary.contrastText} size="xs" style={styles.buttonText}>
          {label}
        </Typography>
        <View
          style={[
            styles.buttonSymbol,
            { backgroundColor: symbolColor ? theme.colors.symbols[symbolColor] : undefined },
          ]}
        />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 0,
    borderRadius: 4,
    borderWidth: 1.5,
    color: theme.colors.secondary.contrastText,
    borderColor: theme.colors.secondary.border,
    height: "100%",
    backgroundColor: theme.colors.secondary.main,
    display: "flex",
    alignContent: "center",
    justifyContent: "center",
    gap: 8,
  },
  buttonText: {
    fontWeight: "600",
    textAlignVertical: "top",
  },
  buttonContainer: {
    width: "33.33%",
    paddingVertical: 14,
    paddingHorizontal: 4,
  },
  buttonSymbol: {
    width: 12,
    height: 6,
    marginVertical: "auto",
    borderRadius: 2,
  },
});
