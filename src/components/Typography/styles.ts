import { StyleProp, TextStyle } from "react-native";

export type ISizes = "xs" | "sm" | "md" | "lg" | "xl";

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
  lg: {
    fontSize: 20,
  },
  xl: {
    fontSize: 28,
  },
};

export type ITextVariants = "title" | "subtitle";

export const variants: Record<ITextVariants, StyleProp<TextStyle>> = {
  title: {
    fontSize: 22,
    fontWeight: "bold",
    alignSelf: "center",
    marginTop: 6,
  },
  subtitle: {
    fontSize: 14,
    fontWeight: "normal",
    alignSelf: "center",
    marginTop: 2,
  },
};
