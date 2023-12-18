import { useTranslation } from "react-i18next";
import { Typography } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useBookingStore } from "@hooks/useBookingStore";

export function BookingSummaryScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureDate, departureTime } = useBookingStore(state => ({
    originCode: state.originCode,
    destinationCode: state.destinationCode,
    departureDate: state.departureDate,
    departureTime: state.departureTime,
  }));

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
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
});
