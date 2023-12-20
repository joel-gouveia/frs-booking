import { useTranslation } from "react-i18next";
import { Button, HStack, Typography, VStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import Icon from "react-native-vector-icons/Feather";
import EnterKey from "@assets/images/enter-key.svg";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { FooterButton } from "@components/Footer/FooterButton";
import { Empty } from "@components/Footer/CustomButtons/Empty";
import { createBooking, getReceipt } from "@api/booking.service";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";
import { receiptUtils } from "@utils/receipt";
import useItemsText from "@hooks/useItemsText";

export function PaymentScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode, departureDate, departureTime, itemCounters, uuid } =
    useBookingStore(state => ({
      originCode: state.originCode,
      destinationCode: state.destinationCode,
      departureDate: state.departureDate,
      departureTime: state.departureTime,
      uuid: state.uuid,
      itemCounters: state.itemCounters,
    }));

  const passengersText = useItemsText({ itemCounters });

  const onConfirmBooking = async () => {
    try {
      // TODO: Refactor this on the ticket #29
      const tickets = Object.entries(itemCounters)
        .filter(([_, val]) => val > 0)
        .map(([key, val]) => ({ code: key, quantity: val }));

      const booking = await createBooking(uuid, tickets);
      const receipt = await getReceipt(booking.number);

      const printableReceipt = receiptUtils.generatePrintableReceipt(receipt);
      await Printer.printTcp({ payload: printableReceipt });
    } catch (error) {
      // TODO: Handle errors properly with toasters.
    }
  };

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}: {departureDate} {departureTime} {originCode} - {destinationCode}
        </Typography>
      </View>
      <VStack gap={24}>
        <Typography>{t("payment.payment-method")}</Typography>
        <HStack gap={20}>
          <Button variant="outline" style={styles.paymentButton}>
            <Typography size="xs" style={styles.paymentButtonHotkey}>
              1
            </Typography>
            <Icon name="dollar-sign" size={60} color="black" />
            <Typography fontSize={26} style={styles.paymentButtonLabel}>
              {t("payment.cash")}
            </Typography>
          </Button>
          <View style={styles.emptyContainer} />
        </HStack>
        <View>
          <Typography>{t("payment.payment-summary")}</Typography>
          <View style={styles.paymentSummaryContainer}>
            <Typography size="sm" mb={46}>
              {t("payment.passengers")}: {passengersText}
            </Typography>
            <Typography size="sm" mb={46}>
              {t("payment.vehicles")}:
            </Typography>
          </View>
        </View>
        <Typography fontSize={30} py={4} style={styles.price}>
          {t("payment.total")}: 123,45 €
        </Typography>
        <Button
          variant="outline"
          style={styles.confirmPaymentButton}
          onPress={onConfirmBooking}
          testID="confirm-payment-button">
          <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
          <Typography fontSize={20}>{t("payment.confirm-purchase")}</Typography>
        </Button>
      </VStack>
      <Footer>
        <MainMenuButton />
        <Empty />
        <FooterButton label={t("footer.reset")} />
      </Footer>
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
    paddingHorizontal: 0,
  },
  emptyContainer: {
    flex: 1,
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
