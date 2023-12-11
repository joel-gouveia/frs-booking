import { Typography } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import { getTodayDateString } from "@utils/date";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { ScreenLayout } from "src/layouts/ScreenLayout";

export function BookingScreen() {
  const { originCode, destinationCode } = useBooking();

  const today = useMemo(() => getTodayDateString(), []);

  return (
    <ScreenLayout>
      <View>
        {/* What is Voyageleg? Is it a typo? In german Voyagebeleg is travel receipt. */}
        <Typography style={styles.headerText}>
          Voyageleg: {today} {originCode} - {destinationCode}
        </Typography>
      </View>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  headerText: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
  },
});
