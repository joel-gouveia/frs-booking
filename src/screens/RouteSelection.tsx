import { Typography, FlatList } from "@components/index";
import { View, StyleSheet } from "react-native";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { getRoutes } from "@api/route.service";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { IRoute } from "src/types/models/route";
import { useBookingStore } from "@hooks/useBookingStore";

import PaperAirplane from "@assets/images/paper-airplane.svg";
import PaperAirplaneTrack from "@assets/images/paper-airplane-track.svg";
import { theme } from "src/theme/theme";
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

  const separator = () => <View style={styles.spacing} />;

  return (
    <>
      <ScreenLayout>
        <Typography variant="title" color={theme.colors.text}>
          {t("routes.choose-route")}
        </Typography>
        <FlatList
          data={routes}
          keyExtractor={(route, index) => `${route.name}-${index}`}
          flatListStyle={styles.flatList}
          wrapperViewContainerStyle={styles.flatListWrapperStyle}
          ItemSeparatorComponent={separator}
          renderItem={({ item: route }) => (
            <TextButton onPress={handleRoutePress(route)} variant="solid" testID="route-btn">
              {route.name}
            </TextButton>
          )}
        />
      </ScreenLayout>
      <PaperAirplane width={190} style={[styles.svg, styles.airplaneSvg]} />
      <PaperAirplaneTrack width={100} style={[styles.svg, styles.airplaneTrackSvg]} />
    </>
  );
}

const styles = StyleSheet.create({
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
    left: 0,
  },
  airplaneTrackSvg: {
    bottom: -10,
    right: -8,
  },
});
