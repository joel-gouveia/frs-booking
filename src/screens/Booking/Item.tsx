import { Button, HStack, Typography, VStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";
import { theme } from "src/theme/theme";
import { TicketToSell } from "src/types/models/ticket";

interface IBookingItem {
  ticketToSell: TicketToSell;
  count: number;
  onMinusPress: () => void;
  onPlusPress: () => void;
}

export function BookingItem({ ticketToSell, count, onMinusPress, onPlusPress }: IBookingItem) {
  return (
    <View style={styles.container}>
      <Button style={styles.mainButton} variant="solid">
        <Typography style={styles.hotkeyText} size="xs">
          {ticketToSell.key}
        </Typography>
        <VStack justifyContent="center" alignItems="center">
          <Typography size="sm" style={styles.name}>
            {ticketToSell.name}
          </Typography>
          <Typography style={styles.itemCount}>{count}</Typography>
        </VStack>
      </Button>
      <HStack justifyContent="space-around">
        <Button onPress={onMinusPress} style={styles.counterButton} variant="outline">
          <Icon name="minus-circle" size={30} color="#71b96c" />
        </Button>
        <Button onPress={onPlusPress} style={styles.counterButton} variant="outline">
          <Icon name="plus-circle" size={30} color="#71b96c" />
        </Button>
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "44%",
    borderRadius: 15,
    marginBottom: 15,
    paddingVertical: 10,
    backgroundColor: theme.colors.primary.main,
  },
  mainButton: {
    paddingHorizontal: 0,
    paddingVertical: 8,
    position: "relative",
    marginBottom: 4,
  },
  hotkeyText: {
    color: theme.colors.primary.contrastText,
    position: "absolute",
    right: 6,
    top: 0,
  },
  counterButton: {
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
  itemCount: {
    fontSize: 40,
    color: theme.colors.primary.contrastText,
  },
  name: {
    color: theme.colors.primary.contrastText,
    textAlign: "center",
  },
});
