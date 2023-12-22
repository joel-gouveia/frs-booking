import { StyleSheet } from "react-native";
import { theme } from "src/theme/theme";

export const defaults = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 10,
  },
  buttonText: {
    color: theme.colors.primary.main,
    fontSize: 16,
  },
});

export const variants = {
  solid: StyleSheet.create({
    button: {
      backgroundColor: theme.colors.primary.main,
    },
    buttonText: {
      color: theme.colors.primary.contrastText,
      fontWeight: "600",
      fontSize: 18,
    },
    loader: {
      color: theme.colors.primary.contrastText,
    },
  }),
  outline: StyleSheet.create({
    button: {
      borderColor: theme.colors.primary.main,
      backgroundColor: theme.colors.white,
    },
    buttonText: {
      color: theme.colors.primary.main,
      fontWeight: "bold",
      fontSize: 18,
    },
    loader: {
      color: theme.colors.primary.main,
    },
  }),
  ghost: StyleSheet.create({
    button: {
      borderColor: "transparent",
      backgroundColor: "transparent",
    },
    buttonText: {
      color: "black",
    },
    loader: {
      color: "black",
    },
  }),
};
