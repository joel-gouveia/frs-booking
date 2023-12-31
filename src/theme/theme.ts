export const theme = {
  colors: {
    primary: {
      main: "#191955",
      contrastText: "#FFFFFF",
      border: "#FFFFFF",
    },
    secondary: {
      main: "#DEDEFF",
      contrastText: "#191955",
      border: "#CACAFF",
    },
    symbols: {
      blue: "#2C64C9",
      green: "#79E07D",
      red: "#EA1B59",
    },
    border: "#CACAFF",
    background: "#FFFFFF",
    white: "#FFFFFF",
    text: "#191955",
  },
  typography: {
    fontSizes: {
      small: 12,
      medium: 16,
      large: 20,
    },
    fontWeights: {
      normal: "400",
      semibold: "600",
      bold: "700",
    },
  },
  spacing: {
    xsmall: 4,
    small: 8,
    medium: 16,
    large: 24,
    xlarge: 32,
  },
  sizes: {
    footerHeight: 54,
  },
} as const;
