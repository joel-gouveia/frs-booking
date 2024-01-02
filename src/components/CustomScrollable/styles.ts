import { StyleSheet } from "react-native";
import { theme } from "src/theme/theme";

const defaultStyles = StyleSheet.create({
  scrollIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    overflow: "hidden",
    width: 5,
    borderRadius: 100,
    backgroundColor: theme.colors.border,
  },
  scrollIndicator: {
    position: "absolute",
    right: 0,
    width: 5,
    borderRadius: 100,
    opacity: 1,
    backgroundColor: theme.colors.primary.main,
  },
});

export const flatListDefaultStyles = StyleSheet.create({
  scrollIndicatorContainer: {
    ...defaultStyles.scrollIndicatorContainer,
    right: -10,
  },
  scrollIndicator: defaultStyles.scrollIndicator,
});

export const scrollViewDefaultStyles = StyleSheet.create({
  scrollIndicatorContainer: {
    ...defaultStyles.scrollIndicatorContainer,
    right: 0,
  },
  scrollIndicator: defaultStyles.scrollIndicator,
});
