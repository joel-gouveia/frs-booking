import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import { getTodayDateString } from "@utils/date";
import React, { useState, useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { BookingItem } from "./BookingItem";

export function BookingScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const [numAdults, setNumAdults] = useState(0);
  const [numKids, setNumKids] = useState(0);
  const [numBikes, setNumBikes] = useState(0);
  const [numCars, setNumCars] = useState(0);

  const today = useMemo(() => getTodayDateString(), []);

  const decrement = (dispatcher: React.Dispatch<React.SetStateAction<number>>) => () => {
    dispatcher(val => Math.max(val - 1, 0));
  };

  const increment = (dispatcher: React.Dispatch<React.SetStateAction<number>>) => () => {
    dispatcher(val => Math.max(val + 1, 0));
  };

  const reset = () => {
    setNumAdults(0);
    setNumKids(0);
    setNumBikes(0);
    setNumCars(0);
  };

  const handlePressBook = () => {
    navigate(NavigationScreens.PAYMENT);
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        {/* What is Voyageleg? Is it a typo? In german Voyagebeleg is travel receipt. */}
        <Typography size="small" style={styles.headerText}>
          Voyageleg: {today} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={50} mb={75}>
        <HStack alignItems="center" justifyContent="center">
          <BookingItem
            hotkey="1"
            text="Adult - Standard"
            value={numAdults}
            onMinusPress={decrement(setNumAdults)}
            onPlusPress={increment(setNumAdults)}
          />
          <View style={styles.invisibleSeparator} />
          <BookingItem
            hotkey="2"
            text="Child - Standard"
            value={numKids}
            onMinusPress={decrement(setNumKids)}
            onPlusPress={increment(setNumKids)}
          />
        </HStack>
        <HStack alignItems="center" justifyContent="center">
          <BookingItem
            hotkey="3"
            text="Bycicle - Standard"
            value={numBikes}
            onMinusPress={decrement(setNumBikes)}
            onPlusPress={increment(setNumBikes)}
          />
          <View style={styles.invisibleSeparator} />
          <BookingItem
            hotkey="4"
            text="Car up to 3 to"
            value={numCars}
            onMinusPress={decrement(setNumCars)}
            onPlusPress={increment(setNumCars)}
          />
        </HStack>
      </VStack>
      <Button onPress={handlePressBook} variant="outline" style={styles.bookButton}>
        <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
        <Typography fontSize={20}>BOOK</Typography>
      </Button>
      <Footer
        buttons={[
          {
            label: t("footer.main-menu"),
            onPress: () => navigate(NavigationScreens.MAIN_MENU),
          },
          {
            label: "Summary",
            onPress: () => {},
          },
          {
            label: "Reset",
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
