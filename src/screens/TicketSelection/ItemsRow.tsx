import { HStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { useBookingStore } from "@hooks/useBookingStore";
import { BookingItem } from "./Item";

interface IItemsRow {
  row: {
    name: string;
    hotkey: string;
  }[];
}

export function ItemsRow({ row }: IItemsRow) {
  const { itemCounters, decrementItem, incrementItem } = useBookingStore(state => ({
    itemCounters: state.itemCounters,
    incrementItem: state.incrementItemCountersKey,
    decrementItem: state.decrementItemCountersKey,
  }));

  return (
    <HStack alignItems="center" justifyContent="center">
      {row.map(({ name, hotkey }, index) => {
        const counterValue = itemCounters[name] ?? 0;

        return (
          <React.Fragment key={name}>
            <BookingItem
              key={name}
              text={name}
              hotkey={hotkey}
              value={counterValue}
              onMinusPress={() => decrementItem(name)}
              onPlusPress={() => incrementItem(name)}
            />
            {index !== row.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        );
      })}
    </HStack>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 34,
  },
});
