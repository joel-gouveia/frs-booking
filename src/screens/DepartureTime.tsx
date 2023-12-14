import { Typography, TextButton } from "@components/index";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "@layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useBooking } from "@hooks/useBooking";
import { getDepartures } from "@api/departure.service";
import { extractDateFromDateTime, extractTimeFromDateTime } from "@utils/date";
import { DepartureResponse } from "src/types/departure";

export function DepartureTimeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { originCode, destinationCode, setDepartureDate, setDepartureTime } = useBooking();

  const [departures, setDepartures] = useState<DepartureResponse[]>([]);

  useEffect(() => {
    if (!originCode || !destinationCode) {
      return;
    }

    getDepartures({ originCode, destinationCode }).then(res => {
      if (res.length > 0) {
        setDepartureDate(extractDateFromDateTime(res[0].departureTime));
      }

      const transformedDepartures = res
        .map(departure => ({
          ...departure,
          departureTime: extractTimeFromDateTime(departure.departureTime),
        }))
        .filter(departure => departure.departureTime !== "");

      setDepartures(transformedDepartures);
    });
  }, [originCode, destinationCode, setDepartureDate]);

  const onChooseDepartureTime = (time: string) => () => {
    setDepartureTime(time);
    navigate(NavigationScreens.BOOKING);
  };

  // TODO: Add loader in place of the departure times, while waiting for a getDepartures response
  // TODO: Maybe call getDepartures before this screen, so there is no need to go to it when there is only 1(since when there is only 1, we are supposed to skip it)
  return (
    <ScreenLayout>
      <View style={styles.title}>
        <Typography fontSize={24}>{t("departure-times.choose-departure")}</Typography>
      </View>
      <View style={styles.routesContainer}>
        <FlatList
          data={departures}
          renderItem={({ item: departure }) => (
            <TextButton
              onPress={onChooseDepartureTime(departure.departureTime)}
              variant="outline"
              fontSize={30}
              style={styles.routeBtn}
              testID="departure-btn">
              {departure.departureTime}
            </TextButton>
          )}
          keyExtractor={departure => departure.uuid}
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
