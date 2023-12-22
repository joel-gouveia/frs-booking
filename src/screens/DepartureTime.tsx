import { Typography } from "@components/index";
import React, { useState, useEffect } from "react";

import { ScreenLayout } from "@layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { getDepartures } from "@api/departure.service";
import { extractDateFromDateTime, extractTimeFromDateTime } from "@utils/date";
import { DepartureResponse } from "src/types/departure";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { TextButton } from "@components/Button/TextButton";

export function DepartureTimeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { originCode, destinationCode, setDepartureDate, setDepartureTime, setDepartureUUID } =
    useBookingStore(state => ({
      originCode: state.originCode,
      destinationCode: state.destinationCode,
      setDepartureDate: state.setDepartureDate,
      setDepartureTime: state.setDepartureTime,
      setDepartureUUID: state.setDepartureUUID,
    }));

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

  const onChooseDeparture = (departure: DepartureResponse) => () => {
    setDepartureTime(departure.departureTime);
    setDepartureUUID(departure.uuid);
    navigate(NavigationScreens.BOOKING);
  };

  // TODO: Add loader in place of the departure times, while waiting for a getDepartures response
  // TODO: Maybe call getDepartures before this screen, so there is no need to go to it when there is only 1(since when there is only 1, we are supposed to skip it)
  return (
    <ScreenLayout>
      <View style={styles.titleContainer}>
        <Typography style={styles.title}>{t("departure-times.choose-departure")}</Typography>
      </View>
      <View style={styles.routesContainer}>
        <FlatList
          data={departures}
          renderItem={({ item: departure }) => (
            <TextButton
              onPress={onChooseDeparture(departure)}
              variant="outline"
              style={styles.routeBtn}
              textStyle={styles.routeBtnText}
              testID="departure-btn">
              {departure.departureTime}
            </TextButton>
          )}
          keyExtractor={departure => departure.uuid}
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
    fontSize: 30,
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
