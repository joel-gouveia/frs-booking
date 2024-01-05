import { Button, HStack, Typography, VStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { theme } from "src/theme/theme";

interface IBookingItem {
  hotkey: string;
  text: string;
  value: number;
  onMinusPress: () => void;
  onPlusPress: () => void;
}

export function BookingItem({ hotkey, text, value, onMinusPress, onPlusPress }: IBookingItem) {
  return (
    <View style={styles.container} testID="item">
      <Button style={styles.mainButton} disabled={true}>
        <View style={styles.hotKey}>
          <Typography color={theme.colors.primary.contrastText} style={styles.hotKeyText}>
            {hotkey}
          </Typography>
        </View>
        <VStack justifyContent="center" alignItems="center">
          <View style={styles.titleContainer}>
            <Typography size="sm" style={styles.title}>
              {text}
            </Typography>
          </View>
          <Typography style={styles.itemCount}>{value}</Typography>
          <HStack justifyContent="space-between" style={styles.countersContainer}>
            <Button onPress={onMinusPress} style={styles.counterButton} variant="outline">
              <Icon name="minus" size={24} color={theme.colors.primary.main} />
            </Button>
            <Button onPress={onPlusPress} style={styles.counterButton} variant="outline">
              <Icon name="plus" size={24} color={theme.colors.primary.main} style={{}} />
            </Button>
          </HStack>
        </VStack>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  mainButton: {
    paddingHorizontal: 0,
    paddingTop: 8,
    paddingBottom: 12,
    position: "relative",
    marginBottom: 4,
  },
  hotkeyText: {
    position: "absolute",
    right: 6,
    top: 0,
  },
  titleContainer: {
    height: 38,
  },
  title: {
    color: theme.colors.primary.contrastText,
    fontWeight: "bold",
    fontSize: 15,
    width: 90,
    textAlign: "center",
  },
  itemCount: {
    fontSize: 44,
    lineHeight: 48,
    fontWeight: "bold",
    color: theme.colors.primary.contrastText,
    marginBottom: 12,
  },
  countersContainer: {
    width: "74%",
  },
  counterButton: {
    borderRadius: 5,
    paddingHorizontal: 7,
    paddingVertical: 3,
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
    height: 16,
    width: 16,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  hotKeyText: {
    fontWeight: "600",
    lineHeight: 14,
    fontSize: 11,
  },
});
