import { StyleSheet } from "react-native";

export const defaults = StyleSheet.create({
  button: {
    paddingHorizontal: 30,
    paddingVertical: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    borderRadius: 8,
  },
  buttonText: {
    color: "black",
    fontSize: 16,
  },
});

export const variants = {
  solid: StyleSheet.create({
    button: {
      borderColor: "transparent",
      backgroundColor: "white",
    },
    buttonText: {
      color: "#191955",
      fontWeight: "bold",
      fontSize: 20,
    },
    loader: {
      color: "#191955",
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
