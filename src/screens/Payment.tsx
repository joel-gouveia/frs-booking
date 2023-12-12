import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import { getTodayDateString } from "@utils/date";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function PaymentScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const today = useMemo(() => getTodayDateString(), []);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="small" style={styles.headerText}>
          Voyageleg: {today} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={20}>
        <Typography size="small">Payment Method</Typography>
      </VStack>
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
            onPress: () => {},
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
