import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@components/index";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useBookingStore } from "@hooks/useBookingStore";
import useItemsText from "@hooks/useItemsText";

export function BookingSummaryScreen() {
  const { t } = useTranslation();
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
    <ScreenLayout
      headerProps={{
        title: t("booking-summary.booking-summary"),
        subtitles: [`${departureDate} ${departureTime}`, `(${originCode} - ${destinationCode})`],
      }}>
      <View style={styles.bookingSummaryContainer}>
        <Typography size="sm" mb={46}>
          {t("payment.passengers")}: {passengersText}
        </Typography>
        <Typography size="sm" mb={46}>
          {t("payment.vehicles")}:
        </Typography>
      </View>
      <Typography mt={50} style={styles.price}>
        {t("payment.total")}: 123,45 €
      </Typography>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bookingSummaryContainer: {
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  price: {
    textAlign: "center",
    fontSize: 30,
  },
});
