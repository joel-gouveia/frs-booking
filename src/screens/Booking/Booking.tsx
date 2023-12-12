import { HStack, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import { getTodayDateString } from "@utils/date";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { BookingItem } from "./BookingItem";

export function BookingScreen() {
  const { originCode, destinationCode } = useBooking();

  const today = useMemo(() => getTodayDateString(), []);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        {/* What is Voyageleg? Is it a typo? In german Voyagebeleg is travel receipt. */}
        <Typography size="small" style={styles.headerText}>
          Voyageleg: {today} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={50}>
        <HStack alignItems="center" justifyContent="center">
          <BookingItem hotkey="1" text="Adult - Standard" value={0} />
          <View style={styles.invisibleSeparator} />
          <BookingItem hotkey="2" text="Child - Standard" value={0} />
        </HStack>
        <HStack alignItems="center" justifyContent="center">
          <BookingItem hotkey="3" text="Bycicle - Standard" value={0} />
          <View style={styles.invisibleSeparator} />
          <BookingItem hotkey="4" text="Car up to 3 to" value={0} />
        </HStack>
      </VStack>
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
});
