import { Typography } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function DepartureTimeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <ScreenLayout>
      <View style={styles.title} testID="title">
        <Typography fontSize={24}>{t("routes.choose-route")}</Typography>
      </View>
      <View style={styles.routesContainer}>
        {/* <FlatList
          data={routes}
          renderItem={({ item: route }) => (
            <Button
              key={route.name}
              onPress={handleRoutePress(route)}
              variant="outline"
              fontSize={30}
              style={styles.routeBtn}
              testID="route-btn">
              {route.name}
            </Button>
          )}
          keyExtractor={route => route.name}
        /> */}
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
