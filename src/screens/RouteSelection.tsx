import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList } from "react-native";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route.service";
import { Footer } from "@components/Footer/Footer";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { IRoute } from "src/types/route";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { TextButton } from "@components/Button/TextButton";

export function RouteSelectionScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const setRouteStore = useBookingStore(state => state.setRoute);

  const [routes, setRoutes] = useState<IRoute[]>([]);

  useEffect(() => {
    getRoutes().then(res => {
      setRoutes(res);
    });
  }, []);

  const handleRoutePress = (route: IRoute) => () => {
    setRouteStore(route.origin.code, route.destination.code);
    navigate(NavigationScreens.MAIN_MENU);
  };

  return (
    <ScreenLayout headerProps={{ title: t("routes.choose-route") }}>
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
