import { Button } from "@components/index";
import { View, Dimensions } from "react-native";
import React from "react";

interface IFooter {
  buttons?: { label: string; onPress: () => void }[];
}

export function Footer({ buttons = [] }: IFooter) {
  const screenWidth = Dimensions.get("window").width;

  return (
    <View
      style={{
        backgroundColor: "#d9d9d9",
        height: 70,
        position: "absolute",
        bottom: 0,
        width: screenWidth,
        display: "flex",
        flexDirection: "row",
        paddingVertical: 12,
      }}>
      {buttons.map(({ label, onPress }) => (
        <View style={{ width: "33%", paddingHorizontal: 16 }}>
          <Button
            onPress={onPress}
            variant="outline"
            style={{
              paddingVertical: 0,
              paddingHorizontal: 0,
              height: "100%",
              backgroundColor: "#e3e3e3",
            }}>
            {label}
          </Button>
        </View>
      ))}
    </View>
  );
}
