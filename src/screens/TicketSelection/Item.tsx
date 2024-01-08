import { Button, HStack, Typography, VStack } from "@components/index";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "src/theme/theme";

const getDynamicStyles = (isSmall: boolean) =>
  ({
    container: {
      width: isSmall ? "31%" : "45%",
    },
    hotKey: { height: isSmall ? 13 : 16, width: isSmall ? 13 : 16 },
    hotKeyText: { fontSize: isSmall ? 9 : 11, lineHeight: isSmall ? 11 : 14 },
    titleContainer: { height: isSmall ? 27 : 38, width: isSmall ? 80 : 90 },
    title: {
      textAlign: isSmall ? "left" : "center",
      fontSize: isSmall ? 11 : 15,
      marginRight: isSmall ? 16 : 0,
    },
    itemCount: {
      fontSize: isSmall ? 30 : 44,
      lineHeight: isSmall ? 34 : 48,
      marginBottom: isSmall ? 0 : 12,
    },
    countersContainer: { width: isSmall ? "77%" : "74%" },
    counterButton: {
      paddingHorizontal: isSmall ? 3 : 7,
      paddingVertical: isSmall ? 1 : 3,
    },
  } as const);

interface IBookingItem {
  hotkey: string | number;
  text: string;
  value: number;
  onMinusPress: () => void;
  onPlusPress: () => void;
  isSmall: boolean;
}

export function BookingItem({
  hotkey,
  text,
  value,
  onMinusPress,
  onPlusPress,
  isSmall,
}: IBookingItem) {
  const dynamicStyles = useMemo(() => getDynamicStyles(isSmall), [isSmall]);

  return (
    <View style={dynamicStyles.container} testID="item">
      <Button style={styles.mainButton} disabled={true}>
        <View style={[styles.hotKey, dynamicStyles.hotKey]}>
          <Typography
            color={theme.colors.primary.contrastText}
            style={[styles.hotKeyText, dynamicStyles.hotKeyText]}>
            {hotkey}
          </Typography>
        </View>
        <VStack justifyContent="center" alignItems="center">
          <View style={dynamicStyles.titleContainer}>
            <Typography size="sm" style={[styles.title, dynamicStyles.title]}>
              {text}
            </Typography>
          </View>
          <Typography style={[styles.itemCount, dynamicStyles.itemCount]}>{value}</Typography>
          <HStack justifyContent="space-between" style={dynamicStyles.countersContainer}>
            <Button
              onPress={onMinusPress}
              style={[styles.counterButton, dynamicStyles.counterButton]}
              variant="outline">
              <Icon name="minus" size={isSmall ? 17 : 24} color={theme.colors.primary.main} />
            </Button>
            <Button
              onPress={onPlusPress}
              style={[styles.counterButton, dynamicStyles.counterButton]}
              variant="outline">
              <Icon name="plus" size={isSmall ? 17 : 24} color={theme.colors.primary.main} />
            </Button>
          </HStack>
        </VStack>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  mainButton: {
    paddingHorizontal: 0,
    paddingTop: 8,
    paddingBottom: 12,
    marginBottom: 12,
    position: "relative",
  },
  title: {
    color: theme.colors.primary.contrastText,
    fontWeight: "bold",
  },
  itemCount: {
    fontWeight: "bold",
    color: theme.colors.primary.contrastText,
  },
  counterButton: {
    borderRadius: 5,
    fontWeight: "400",
    textAlign: "center",
  },
  hotKey: {
    position: "absolute",
    borderWidth: 1,
    borderColor: "white",
    right: 8,
    top: 8,
    borderRadius: 3,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hotKeyText: {
    fontWeight: "600",
  },
});
