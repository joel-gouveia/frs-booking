import { StyleProp, TextStyle } from "react-native";

export type ISizes = "xs" | "sm" | "md";

export const sizes: Record<ISizes, StyleProp<TextStyle>> = {
  xs: {
    fontSize: 11,
  },
  sm: {
    fontSize: 14,
  },
  md: {
    fontSize: 16,
  },
};
