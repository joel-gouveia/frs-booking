import React, { useState, useEffect } from "react";

import { ScreenLayout } from "@layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { FlatList, StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { getDepartures } from "@api/departure.service";
import { DepartureRequest, DepartureResponse } from "src/types/models/departure";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { TextButton } from "@components/Button/TextButton";
import MaterialIcons from "react-native-vector-icons/MaterialIcons";
import { theme } from "src/theme/theme";
import { departureUtils } from "@utils/departure";

export function DepartureTimeScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { route, setDeparture } = useBookingStore(state => ({
    route: state.route,
    setDeparture: state.setDeparture,
  }));

  const [departures, setDepartures] = useState<DepartureResponse[]>([]);

  useEffect(() => {
    if (!route) {
      return navigate(NavigationScreens.ROUTES);
    }

    const departureRequest: DepartureRequest = {
      originCode: route.origin.code,
      destinationCode: route.destination.code,
    };

    getDepartures(departureRequest).then(res => {
      if (res.length > 1) {
        setDepartures(res);
      } else {
        setDeparture(res[0]);
        navigate(NavigationScreens.MAIN_MENU);
      }
    });
  }, [route, setDeparture, navigate]);

  const onChooseDeparture = (selectedDeparture: DepartureResponse) => () => {
    setDeparture(selectedDeparture);
    navigate(NavigationScreens.TICKET_TYPES);
  };

  // TODO: Add loader in place of the departure times, while waiting for a getDepartures response
  // TODO: Maybe call getDepartures before this screen, so there is no need to go to it when there is only 1(since when there is only 1, we are supposed to skip it)
  return (
    <ScreenLayout
      headerProps={{
        title: t("departure-times.choose-departure"),
        icon: <MaterialIcons name="directions-boat" size={30} color={theme.colors.primary.main} />,
      }}>
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
              {departureUtils.formatTime(departure.departureTime)}
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
