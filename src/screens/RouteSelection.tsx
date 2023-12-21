import React, { useState, useEffect } from "react";
import { Typography, TextButton, FlatListCustomScrollbar } from "@components/index";
import { View, StyleSheet } from "react-native";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route.service";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { IRoute } from "src/types/models/route";
import { useBookingStore } from "@hooks/useBookingStore";

import PaperAirplane from "@assets/images/paper-airplane.svg";
import PaperAirplaneTrack from "@assets/images/paper-airplane-track.svg";

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
    <>
      <PaperAirplane width={190} style={[styles.svg, styles.airplaneSvg]} />
      <ScreenLayout>
        <Typography fontSize={24} bold style={styles.title} testID="title">
          {t("routes.choose-route")}
        </Typography>
        <FlatListCustomScrollbar
          data={routes}
          keyExtractor={(route, index) => `${route.name}-${index}`}
          flatListStyle={styles.flatList}
          wrapperViewContainerStyle={styles.flatListWrapperStyle}
          ItemSeparatorComponent={() => <View style={styles.spacing} />}
          renderItem={({ item: route }) => (
            <TextButton
              onPress={handleRoutePress(route)}
              variant="outline"
              fontSize={24}
              testID="route-btn">
              {route.name}
            </TextButton>
          )}
        />
      </ScreenLayout>
      <PaperAirplaneTrack width={100} style={[styles.svg, styles.airplaneTrackSvg]} />
    </>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
  },
  flatListWrapperStyle: {
    height: 340,
    marginTop: 60,
  },
  flatList: {
    height: 340,
    paddingHorizontal: 5,
  },
  spacing: {
    height: 20,
  },
  svg: {
    position: "absolute",
  },
  airplaneSvg: {
    top: 50,
  },
  airplaneTrackSvg: {
    bottom: -10,
    right: -8,
  },
});
