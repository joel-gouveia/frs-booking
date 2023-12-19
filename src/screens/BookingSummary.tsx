import { useTranslation } from "react-i18next";
import { Button, Typography } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useBookingStore } from "@hooks/useBookingStore";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useNavigation } from "@react-navigation/native";
import useItemsText from "@hooks/useItemsText";

export function BookingSummaryScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { originCode, destinationCode, departureDate, departureTime, itemCounters } =
    useBookingStore(state => ({
      originCode: state.originCode,
      destinationCode: state.destinationCode,
      departureDate: state.departureDate,
      departureTime: state.departureTime,
      itemCounters: state.itemCounters,
    }));

  const passengersText = useItemsText({ itemCounters });

  return (
    <ScreenLayout>
      <Button
        onPress={() => navigate(NavigationScreens.BOOKING)}
        variant="outline"
        style={styles.backButton}>
        <Typography>{t("common.back")}</Typography>
        <View style={styles.backButtonSymbol} />
      </Button>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
        <Typography mt={12}>{t("booking-summary.booking-summary")}</Typography>
        <View style={styles.bookingSummaryContainer}>
          <Typography size="sm" mb={46}>
            {t("payment.passengers")}: {passengersText}
          </Typography>
          <Typography size="sm" mb={46}>
            {t("payment.vehicles")}:
          </Typography>
        </View>
        <Typography fontSize={30} mt={50} style={styles.price}>
          {t("payment.total")}: 123,45 €
        </Typography>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  backButton: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 12,
    alignSelf: "flex-start",
    paddingVertical: 8,
    paddingHorizontal: 8,
    marginBottom: 20,
  },
  backButtonSymbol: {
    backgroundColor: "#d24a4a",
    width: 15,
    height: 10,
  },
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
  bookingSummaryContainer: {
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  price: {
    textAlign: "center",
  },
});
