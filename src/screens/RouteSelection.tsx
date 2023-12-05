import { Typography, Button } from "@components/index";
import { View } from "react-native";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";

export function RouteSelectionScreen() {
  return (
    <ScreenLayout>
      <View
        style={{
          backgroundColor: "#d9d9d9",
          paddingVertical: 12,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: 6,
          marginBottom: 46,
        }}>
        <Typography fontSize={24}>Choose Route</Typography>
      </View>
      <View>
        <Button variant="outline" fontSize={38}>
          Route
        </Button>
      </View>
    </ScreenLayout>
  );
}
