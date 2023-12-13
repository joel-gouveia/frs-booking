import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import { getTodayDateString } from "@utils/date";
import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { chunkArray } from "@utils/array";
import { ItemsRow } from "./ItemsRow";

export function BookingScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureTime } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [numBikes, setNumBikes] = useState(0);
  const [numCars, setNumCars] = useState(0);

  const today = useMemo(() => getTodayDateString(), []);

  const reset = () => {
    setNumAdults(0);
    setNumKids(0);
    setNumBikes(0);
    setNumCars(0);
  };

  // TODO: This will not be hardcoded in the future, will depend on the API response
  const ITEMS = useMemo(
    () => [
      {
        name: t("booking.adult-standard"),
        value: numAdults,
        hotkey: "1",
        dispatcher: setNumAdults,
      },
      {
        name: t("booking.child-standard"),
        value: numKids,
        hotkey: "2",
        dispatcher: setNumKids,
      },
      {
        name: t("booking.bycicle-standard"),
        value: numBikes,
        hotkey: "3",
        dispatcher: setNumBikes,
      },
      {
        name: t("booking.car-up-to", { num: 3 }),
        value: numCars,
        hotkey: "4",
        dispatcher: setNumCars,
      },
    ],
    [numAdults, setNumAdults, numKids, setNumKids, numBikes, setNumBikes, numCars, setNumCars, t],
  );

  const itemsRows = useMemo(() => chunkArray(ITEMS, 2), [ITEMS]);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="small" style={styles.headerText}>
          {t("booking.voyageleg")}: {today} {departureTime} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={50} mb={75}>
        {itemsRows.map(row => (
          <ItemsRow key={row[0].name} row={row} />
        ))}
      </VStack>
      <Button variant="outline" style={styles.bookButton}>
        <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
        <Typography fontSize={20}>{t("booking.book")}</Typography>
      </Button>
      <Footer
        buttons={[
          {
            label: t("footer.main-menu"),
            onPress: () => navigate(NavigationScreens.MAIN_MENU),
          },
          {
            label: t("footer.summary"),
            onPress: () => {},
          },
          {
            label: t("footer.reset"),
            onPress: reset,
          },
        ]}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 80,
  },
  headerText: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
  invisibleSeparator: {
    width: 50,
  },
  bookButton: {
    marginHorizontal: 40,
    position: "relative",
    paddingVertical: 24,
  },
  enterKeyIcon: {
    position: "absolute",
    right: 4,
    top: 4,
  },
});
