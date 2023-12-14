import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { chunkArray } from "@utils/array";
import { ItemsRow } from "./ItemsRow";

// TODO: This will come from the API in the future
const ITEM_NAMES = ["Adult - Standard", "Child", "Car", "Bycicle"];

export function BookingScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureDate, departureTime } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const [itemCounters, setItemCounters] = useState<Record<string, number>>({});

  const reset = () => {
    setItemCounters(obj =>
      Object.keys(obj).reduce(
        (prev, curr) => ({ ...prev, [curr]: 0 }),
        {} as Record<string, number>,
      ),
    );
  };

  const itemsRows = useMemo(() => {
    const items = ITEM_NAMES.map((name, index) => ({
      name,
      value: itemCounters[name] ?? 0,
      hotkey: String(index + 1),
      setItems: setItemCounters,
    }));

    return chunkArray(items, 2);
  }, [itemCounters, setItemCounters]);

  const handlePressBook = () => {
    /* if (numAdults === 0 && numKids === 0 && numBikes === 0 && numCars === 0) {
      return;
    }

    setPassengers(numAdults, numKids, numBikes, numCars); */
    navigate(NavigationScreens.PAYMENT);
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="small" style={styles.headerText}>
          {t("booking.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={50} mb={75}>
        {itemsRows.map(row => (
          <ItemsRow key={row[0].name} row={row} />
        ))}
      </VStack>
      <Button onPress={handlePressBook} variant="outline" style={styles.bookButton}>
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
    borderRadius: 6,
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
