import { Typography } from "@components/index";
import { View, StyleSheet, FlatList } from "react-native";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route.service";
import { Footer } from "@components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { RouteResponse } from "src/types/models/route";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { TextButton } from "@components/Button/TextButton";

export function RouteSelectionScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const setRouteStore = useBookingStore(state => state.setRoute);

  const [routes, setRoutes] = useState<RouteResponse[]>([]);

  useEffect(() => {
    getRoutes().then(res => setRoutes(res));
  }, []);

  const handleRoutePress = (route: RouteResponse) => () => {
    setRouteStore(route);
    navigate(NavigationScreens.DEPARTURE_TIME);
  };

  return (
    <ScreenLayout>
      <View style={styles.titleContainer} testID="title">
        <Typography style={styles.title}>{t("routes.choose-route")}</Typography>
      </View>
      <View style={styles.routesContainer}>
        <FlatList
          data={routes}
          renderItem={({ item: route }) => (
            <TextButton
              onPress={handleRoutePress(route)}
              variant="outline"
              textStyle={styles.routeBtnText}
              style={styles.routeBtn}
              testID="route-btn">
              {route.name}
            </TextButton>
          )}
          keyExtractor={route => route.name}
        />
      </View>
      <Footer>
        <MainMenuButton />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    backgroundColor: "#d9d9d9",
    paddingVertical: 12,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 6,
    marginBottom: 46,
  },
  title: {
    fontSize: 24,
  },
  routesContainer: {
    margin: -10,
  },
  routeBtn: {
    margin: 10,
  },
  routeBtnText: {
    fontSize: 30,
  },
});
