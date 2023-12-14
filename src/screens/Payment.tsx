import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Typography, VStack } from "@components/index";
import { useBooking } from "@hooks/useBooking";
import React, { useMemo } from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import Icon from "react-native-vector-icons/Feather";
import EnterKey from "@assets/images/enter-key.svg";

export function PaymentScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureDate, departureTime, itemCounters } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const passengersText = useMemo(
    () => Object.entries(itemCounters).map(([key, val]) => `(${key}: ${val})`),
    [itemCounters],
  );

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="small" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={24}>
        <Typography>{t("payment.payment-method")}</Typography>
        <HStack gap={20}>
          <Button variant="outline" style={styles.paymentButton}>
            <Typography size="tiny" style={styles.paymentButtonHotkey}>
              1
            </Typography>
            <Icon name="dollar-sign" size={60} color="black" />
            <Typography fontSize={26} style={styles.paymentButtonLabel}>
              {t("payment.cash")}
            </Typography>
          </Button>
          <Button variant="outline" style={styles.paymentButton}>
            <Typography size="tiny" style={styles.paymentButtonHotkey}>
              2
            </Typography>
            <Icon name="credit-card" size={60} color="black" />
            <Typography fontSize={26} style={styles.paymentButtonLabel}>
              {t("payment.card")}
            </Typography>
          </Button>
        </HStack>
        <View>
          <Typography>{t("payment.payment-summary")}</Typography>
          <View style={styles.paymentSummaryContainer}>
            <Typography size="small" mb={46}>
              {t("payment.passengers")}: {passengersText}
            </Typography>
          </View>
        </View>
        <Typography fontSize={30} py={4} style={styles.price}>
          {t("payment.total")}: 123,45 €
        </Typography>
        <Button variant="outline" style={styles.confirmPaymentButton}>
          <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
          <Typography fontSize={20}>{t("payment.confirm-purchase")}</Typography>
        </Button>
      </VStack>
      <Footer
        buttons={[
          {
            label: t("footer.main-menu"),
            onPress: () => navigate(NavigationScreens.MAIN_MENU),
          },
          {
            label: "empty",
          },
          {
            label: t("footer.reset"),
            onPress: () => {},
          },
        ]}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 24,
  },
  headerText: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  paymentButton: {
    flex: 1,
    paddingVertical: 40,
    marginRight: 10,
  },
  paymentButtonHotkey: {
    position: "absolute",
    right: 4,
    top: 4,
  },
  paymentButtonLabel: {
    position: "absolute",
    bottom: 6,
  },
  paymentSummaryContainer: {
    backgroundColor: "#d9d9d9",
    padding: 8,
    borderRadius: 6,
    marginTop: 8,
  },
  price: {
    textAlign: "center",
  },
  confirmPaymentButton: {
    marginHorizontal: 40,
    position: "relative",
    paddingVertical: 10,
  },
  enterKeyIcon: {
    position: "absolute",
    right: 4,
  },
});
