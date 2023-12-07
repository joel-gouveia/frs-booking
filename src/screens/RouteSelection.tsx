import { Typography, Button } from "@components/index";
import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route";
import { Footer } from "@components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function RouteSelectionScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

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
      <View style={styles.routesContainer}>
        <FlatList
          data={routes}
          renderItem={({ item }) => (
            <Button
              key={item}
              onPress={() => navigate(NavigationScreens.MAIN_MENU)}
              variant="outline"
              fontSize={30}
              style={styles.routeBtn}
              testID="route-btn">
              {item}
            </Button>
          )}
          keyExtractor={item => item}
        />
      </View>
      <Footer
        buttons={[
          {
            label: t("footer.main-menu"),
            onPress: () => navigate(NavigationScreens.MAIN_MENU),
          },
        ]}
      />
    </ScreenLayout>
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
  routesContainer: {
    margin: -10,
  },
  routeBtn: {
    margin: 10,
  },
});
