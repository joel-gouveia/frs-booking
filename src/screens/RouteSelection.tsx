import { Typography, Button } from "@components/index";
import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route";
import { Footer } from "@components/Footer/Footer";

export function RouteSelectionScreen() {
  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    getRoutes().then(res => {
      setRoutes(res.map(route => route.name));
    });
  }, []);

  return (
    <>
      <ScreenLayout>
        <View style={styles.title}>
          <Typography fontSize={24}>Choose Route</Typography>
        </View>
        {routes.map(routeName => (
          <Button key={routeName} variant="outline" fontSize={30}>
            {routeName}
          </Button>
        ))}
        <Footer buttons={[{ label: "Main Menu", onPress: () => {} }]} />
      </ScreenLayout>
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 46,
  },
});
