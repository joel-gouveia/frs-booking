import { useTranslation } from "react-i18next";
import { Typography } from "@components/index";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useBookingStore } from "@hooks/useBookingStore";

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

  const passengersText = useMemo(
    () =>
      Object.entries(itemCounters)
        .filter(([_, val]) => val > 0)
        .map(([key, val]) => `(${key}: ${val})`),
    [itemCounters],
  );

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
        <Typography mt={16}>{t("booking-summary.booking-summary")}</Typography>
        <View style={styles.paymentSummaryContainer}>
          <Typography size="sm" mb={46}>
            {t("payment.passengers")}: {passengersText}
          </Typography>
        </View>
      </View>
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
  paymentSummaryContainer: {
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
});
