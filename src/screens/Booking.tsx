import { Button, HStack, Typography, VStack } from "@components/index";
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
      <View style={styles.header}>
        {/* What is Voyageleg? Is it a typo? In german Voyagebeleg is travel receipt. */}
        <Typography size="small" style={styles.headerText}>
          Voyageleg: {today} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={50}>
        <HStack alignItems="center" justifyContent="center">
          <Button
            style={{
              flex: 1,
              paddingHorizontal: 0,
              paddingVertical: 6,
              position: "relative",
              gap: 0,
            }}
            variant="outline">
            <Typography
              style={{
                position: "absolute",
                right: 4,
                top: 0,
              }}
              fontSize={10}>
              1
            </Typography>
            <VStack justifyContent="center" alignItems="center">
              <Typography size="small">Adult - Standard</Typography>
              <Typography fontSize={40}>0</Typography>
            </VStack>
          </Button>
          <View style={{ width: 50 }} />
          <Button
            style={{
              flex: 1,
              paddingHorizontal: 0,
              paddingVertical: 6,
              position: "relative",
              gap: 0,
            }}
            variant="outline">
            <Typography
              style={{
                position: "absolute",
                right: 4,
                top: 0,
              }}
              fontSize={10}>
              2
            </Typography>
            <VStack justifyContent="center" alignItems="center">
              <Typography size="small">Child - Standard</Typography>
              <Typography fontSize={40}>0</Typography>
            </VStack>
          </Button>
        </HStack>
        <HStack alignItems="center" justifyContent="center">
          <Button
            style={{
              flex: 1,
              paddingHorizontal: 0,
              paddingVertical: 6,
              position: "relative",
              gap: 0,
            }}
            variant="outline">
            <Typography
              style={{
                position: "absolute",
                right: 4,
                top: 0,
              }}
              fontSize={10}>
              3
            </Typography>
            <VStack justifyContent="center" alignItems="center">
              <Typography size="small">Bycicle - Standard</Typography>
              <Typography fontSize={40}>0</Typography>
            </VStack>
          </Button>
          <View style={{ width: 50 }} />
          <Button
            style={{
              flex: 1,
              paddingHorizontal: 0,
              paddingVertical: 6,
              position: "relative",
              gap: 0,
            }}
            variant="outline">
            <Typography
              style={{
                position: "absolute",
                right: 4,
                top: 0,
              }}
              fontSize={10}>
              4
            </Typography>
            <VStack justifyContent="center" alignItems="center">
              <Typography size="small">Car up to 3 to</Typography>
              <Typography fontSize={40}>0</Typography>
            </VStack>
          </Button>
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
});
