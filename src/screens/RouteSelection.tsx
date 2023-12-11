import { Typography, Button } from "@components/index";
import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route";
import { Footer } from "@components/Footer/Footer";
import { useTranslation } from "react-i18next";

export function RouteSelectionScreen() {
  const { t } = useTranslation();

  const [routes, setRoutes] = useState<string[]>([]);

  useEffect(() => {
    getRoutes().then(res => {
      setRoutes(res.map(route => route.name));
    });
  }, []);

  return (
    <ScreenLayout>
      <View style={styles.title} testID="title">
        <Typography fontSize={24}>{t("routes.choose-route")}</Typography>
      </View>
      <FlatList
        data={routes}
        renderItem={({ item }) => (
          <Button
            key={item}
            variant="outline"
            fontSize={30}
            style={styles.routeBtn}
            testID="route-btn">
            {item}
          </Button>
        )}
        keyExtractor={item => item}
        contentContainerStyle={styles.routesList}
      />
      <Footer buttons={[{ label: t("footer.main-menu"), onPress: () => {} }]} />
    </ScreenLayout>
  );
}

const BTN_BORDER_RADIUS = 8;

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
  routesList: { borderRadius: BTN_BORDER_RADIUS, overflow: "hidden" },
  routeBtn: { borderRadius: BTN_BORDER_RADIUS },
});
