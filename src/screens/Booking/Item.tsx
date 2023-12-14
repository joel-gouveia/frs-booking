import { Button, HStack, Typography, VStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import Icon from "react-native-vector-icons/Feather";

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
      <Button style={styles.mainButton} variant="outline">
        <Typography style={styles.hotkeyText} size="tiny">
          {hotkey}
        </Typography>
        <VStack justifyContent="center" alignItems="center">
          <Typography size="small">{text}</Typography>
          <Typography fontSize={40}>{value}</Typography>
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
    paddingHorizontal: 6,
    paddingVertical: 6,
  },
});
