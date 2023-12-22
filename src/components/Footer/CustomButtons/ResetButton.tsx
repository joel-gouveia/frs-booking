import { View, StyleSheet } from "react-native";
import React from "react";
import { Button, Typography } from "@components/index";
import { theme } from "src/theme/theme";

interface IResetButton {
  onPress?: () => void;
}

export function ResetButton({ onPress }: IResetButton) {
  return (
    <View style={styles.buttonContainer}>
      <Button onPress={onPress} style={styles.button} testID="footer-btn">
        <Typography color={theme.colors.primary.contrastText} size="xs" style={styles.buttonText}>
          Reset
        </Typography>
        <View style={[styles.buttonSymbol, { backgroundColor: theme.colors.symbols.red }]} />
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingVertical: 0,
    paddingHorizontal: 8,
    borderRadius: 4,
    height: "100%",
    backgroundColor: theme.colors.primary.main,
    gap: 8,
    marginLeft: "auto",
  },
  buttonText: {
    textAlignVertical: "top",
  },
  buttonContainer: {
    paddingVertical: 14,
    paddingHorizontal: 4,
    width: "33.33%",
  },
  buttonSymbol: {
    width: 12,
    height: 6,
    marginVertical: "auto",
    borderRadius: 2,
  },
});
