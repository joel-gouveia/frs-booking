import React from "react";
import { useTranslation } from "react-i18next";
import { Typography } from "@components/index";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useBookingStore } from "@hooks/useBookingStore";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useNavigation } from "@react-navigation/native";
import { departureUtils } from "@utils/departure";

export function BookingSummaryScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { route, departure } = useBookingStore(state => ({
    route: state.route,
    departure: state.departure,
  }));

  if (!route || !departure) {
    navigate(NavigationScreens.ROUTES);
    return null;
  }

  return (
    <ScreenLayout
      headerProps={{
        title: t("booking-summary.booking-summary"),
        subtitles: [
          departureUtils.formatDateAndTime(departure.departureTime),
          `(${route?.origin.code} - ${route?.destination.code})`,
        ],
      }}>
      <View style={styles.bookingSummaryContainer}>
        <Typography size="sm" mb={46}>
          {/* TODO: Will be refactored with a different structure */}
        </Typography>
        <Typography size="sm" mb={46}>
          {t("payment.vehicles")}:
        </Typography>
      </View>
      <Typography mt={50} style={styles.price}>
        {t("payment.total")}: 123,45 €
      </Typography>
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
