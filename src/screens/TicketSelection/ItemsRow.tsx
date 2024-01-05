import { HStack } from "@components/index";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { useBookingStore } from "@hooks/useBookingStore";
import { BookingItem } from "./Item";

interface IItemsRow {
  row: {
    name: string;
    key: string | number;
  }[];
  numCols: number;
}

export function ItemsRow({ row, numCols }: IItemsRow) {
  const { itemCounters, decrementItem, incrementItem } = useBookingStore(state => ({
    itemCounters: state.itemCounters,
    incrementItem: state.incrementItemCountersKey,
    decrementItem: state.decrementItemCountersKey,
  }));

  const emptyCols = useMemo(() => {
    let cnt = 0;
    return new Array(numCols - row.length).fill(undefined).map(() => (
      <React.Fragment key={`empty-${cnt++}`}>
        <View style={styles.separator} />
        <View style={styles.emptyEl} />
      </React.Fragment>
    ));
  }, [numCols, row.length]);

  return (
    <HStack alignItems="center" justifyContent="center">
      {row.map(({ name, key }, index) => {
        const counterValue = itemCounters[name] ?? 0;

        return (
          <React.Fragment key={name}>
            <BookingItem
              key={name}
              text={name}
              hotkey={String(key)}
              value={counterValue}
              onMinusPress={() => decrementItem(name)}
              onPlusPress={() => incrementItem(name)}
            />
            {index !== row.length - 1 && <View style={styles.separator} />}
          </React.Fragment>
        );
      })}
      {emptyCols}
    </HStack>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 34,
  },
  emptyEl: {
    flex: 1,
  },
});
