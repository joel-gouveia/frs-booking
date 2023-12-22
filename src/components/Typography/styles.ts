import { StyleProp, TextStyle } from "react-native";

export type ISizes = "xs" | "sm" | "md";

export const sizes: Record<ISizes, StyleProp<TextStyle>> = {
  xs: {
    fontSize: 12,
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
};

export type ITextVariants = "title";

export const variants: Record<ITextVariants, StyleProp<TextStyle>> = {
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 6,
  },
};
