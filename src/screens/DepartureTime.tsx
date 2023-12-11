import { Button, Typography } from "@components/index";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useBooking } from "@hooks/useBooking";
import { getDepartures } from "@api/departure.service";
import { extractTimeFromDateTime } from "@utils/date";

export function DepartureTimeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { originCode, destinationCode } = useBooking();

  const [departureTimes, setDepartureTimes] = useState<string[]>([]);

  useEffect(() => {
    if (!originCode || !destinationCode) {
      return;
    }

    getDepartures({ originCode, destinationCode }).then(res => {
      const times = res
        .map(departure => extractTimeFromDateTime(departure.departureTime))
        .filter(time => time !== "");

      setDepartureTimes(times);
    });
  }, [originCode, destinationCode]);

  // TODO: Add loader in place of the departure times, while waiting for a getDepartures response
  // TODO: Maybe call getDepartures before this screen, so there is no need to go to it when there is only 1(since when there is only 1, we are supposed to skip it)
  return (
    <ScreenLayout>
      <View style={styles.title} testID="title">
        <Typography fontSize={24}>{t("departure-times.choose-departure")}</Typography>
      </View>
      <View style={styles.routesContainer}>
        <FlatList
          data={departureTimes}
          renderItem={({ item: departureTime }) => (
            <Button
              key={departureTime}
              onPress={() => {}}
              variant="outline"
              fontSize={30}
              style={styles.routeBtn}
              testID="route-btn">
              {departureTime}
            </Button>
          )}
          keyExtractor={departureTime => departureTime}
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
