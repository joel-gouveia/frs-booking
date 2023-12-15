import { HStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { BookingItem } from "./Item";

interface IItemsRow {
  row: {
    name: string;
    value: number;
    hotkey: string;
    setItems: React.Dispatch<React.SetStateAction<Record<string, number>>>;
  }[];
}

export function ItemsRow({ row }: IItemsRow) {
  const decrementFromKey =
    (key: string, dispatcher: React.Dispatch<React.SetStateAction<Record<string, number>>>) =>
    () => {
      dispatcher(obj => {
        const count = obj[key] ?? 0;
        const newCount = Math.max(count - 1, 0);
        return { ...obj, [key]: newCount };
      });
    };

  const incrementFromKey =
    (key: string, dispatcher: React.Dispatch<React.SetStateAction<Record<string, number>>>) =>
    () => {
      dispatcher(obj => {
        const count = obj[key] ?? 0;
        return { ...obj, [key]: count + 1 };
      });
    };

  return (
    <HStack alignItems="center" justifyContent="center">
      {row.map(({ name, hotkey, setItems, value }, index) => (
        <React.Fragment key={name}>
          <BookingItem
            key={name}
            text={name}
            hotkey={hotkey}
            value={value}
            onMinusPress={decrementFromKey(name, setItems)}
            onPlusPress={incrementFromKey(name, setItems)}
          />
          {index !== row.length - 1 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </HStack>
  );
}

const styles = StyleSheet.create({
  separator: {
    width: 50,
  },
});
