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
      borderWidth: 1,
      borderColor: "#dcdcdc",
      backgroundColor: "#f5f5f5",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 1,
      shadowRadius: 8,
      elevation: 5,
    },
    buttonText: {
      color: "black",
    },
    loader: {
      color: "black",
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
