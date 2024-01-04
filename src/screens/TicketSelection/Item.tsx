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
          <Typography size="sm" style={styles.title}>
            {text}
          </Typography>
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
  title: {
    color: theme.colors.primary.contrastText,
    fontWeight: "bold",
    fontSize: 15,
  },
  itemCount: {
    fontSize: 44,
    fontWeight: "bold",
    color: theme.colors.primary.contrastText,
    marginTop: 4,
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
});
