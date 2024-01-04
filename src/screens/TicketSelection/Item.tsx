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
    <View style={styles.container}>
      <Button style={styles.mainButton}>
        <Typography style={styles.hotkeyText} size="xs">
          {hotkey}
        </Typography>
        <VStack justifyContent="center" alignItems="center">
          <Typography size="sm" style={{ color: theme.colors.primary.contrastText }}>
            {text}
          </Typography>
          <Typography style={styles.itemCount}>{value}</Typography>
          <HStack justifyContent="space-between" style={{ width: "72%" }}>
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
    paddingVertical: 8,
    position: "relative",
    marginBottom: 4,
  },
  hotkeyText: {
    position: "absolute",
    right: 6,
    top: 0,
  },
  counterButton: {
    borderRadius: 5,
    paddingHorizontal: 6,
    paddingVertical: 3,
    fontWeight: "400",
    textAlign: "center",
  },
  itemCount: {
    fontSize: 40,
    color: theme.colors.primary.contrastText,
  },
});
