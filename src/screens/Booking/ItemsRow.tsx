import { HStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BookingItem } from "./Item";

interface IItemsRow {
  row: {
    name: string;
    value: number;
    hotkey: string;
    dispatcher: React.Dispatch<React.SetStateAction<number>>;
  }[];
}

export function ItemsRow({ row }: IItemsRow) {
  const decrement = (dispatcher: React.Dispatch<React.SetStateAction<number>>) => () => {
    dispatcher(val => Math.max(val - 1, 0));
  };

  const increment = (dispatcher: React.Dispatch<React.SetStateAction<number>>) => () => {
    dispatcher(val => val + 1);
  };

  return (
    <HStack alignItems="center" justifyContent="center">
      {row.map(({ name, hotkey, dispatcher, value }, index) => (
        <>
          <BookingItem
            key={name}
            text={name}
            hotkey={hotkey}
            value={value}
            onMinusPress={decrement(dispatcher)}
            onPlusPress={increment(dispatcher)}
          />
          {index !== row.length - 1 && <View style={styles.separator} />}
        </>
      ))}
    </HStack>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 50,
  },
});
