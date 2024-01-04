import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Typography, VStack } from "@components/index";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { chunkArray } from "@utils/array";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { FooterButton } from "@components/Footer/FooterButton";
import { ItemsRow } from "./ItemsRow";

// TODO: This will come from the API in the future
const ITEM_NAMES = ["Adult - Standard", "Child", "Car", "Bycicle"];

export function BookingScreen() {
  const { t } = useTranslation();
  const { itemCounters, resetCounters, originCode, destinationCode, departureDate, departureTime } =
    useBookingStore(state => ({
      originCode: state.originCode,
      destinationCode: state.destinationCode,
      departureDate: state.departureDate,
      departureTime: state.departureTime,
      itemCounters: state.itemCounters,
      resetCounters: state.resetItemCounters,
    }));
  const { navigate } = useNavigation<NavigationProps>();

  const itemsRows = useMemo(() => {
    const items = ITEM_NAMES.map((name, index) => ({
      name,
      hotkey: String(index + 1),
    }));

    return chunkArray(items, 2);
  }, []);

  const handlePressBook = () => {
    if (Object.values(itemCounters).every(val => val === 0)) {
      return;
    }

    navigate(NavigationScreens.PAYMENT);
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack>
        {itemsRows.map(row => (
          <ItemsRow key={row[0].name} row={row} />
        ))}
      </VStack>
      <Button onPress={handlePressBook} variant="outline" style={styles.bookButton}>
        <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
        <Typography style={styles.bookButtonText}>{t("booking.book")}</Typography>
      </Button>
      <Footer>
        <MainMenuButton />
        <FooterButton
          label={t("footer.summary")}
          onPress={() => navigate(NavigationScreens.BOOKING_SUMMARY)}
        />
        <FooterButton label={t("footer.reset")} onPress={resetCounters} />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    // marginBottom: 80,
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
  bookButtonText: {
    fontSize: 20,
  },
  enterKeyIcon: {
    position: "absolute",
    right: 4,
    top: 4,
  },
});
