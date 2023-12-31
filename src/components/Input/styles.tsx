import { StyleSheet } from "react-native";
import { theme } from "src/theme/theme";

export const defaults = (props?: { hasLeftElement: boolean }) =>
  StyleSheet.create({
    wrapper: {
      position: "relative",
    },
    input: {
      width: "100%",
      borderRadius: 10,
      borderWidth: 1,
      paddingHorizontal: props?.hasLeftElement ? 80 : 20,
      fontSize: 16,
    },
  });

export const variants = {
  standard: StyleSheet.create({
    input: {
      borderColor: theme.colors.primary.border,
      backgroundColor: "transparent",
      borderWidth: 0,
      borderBottomWidth: 1,
      borderRadius: 0,
      paddingHorizontal: 4,
      paddingVertical: 4,
      color: theme.colors.primary.contrastText,
    },
  }),
};
