import React, { useEffect, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { useBookingStore } from "@hooks/useBookingStore";
import { FooterButton } from "@components/Footer/FooterButton";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";
import { receiptUtils } from "@utils/receipt";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { createBooking, getReceipt } from "@api/booking.service";
import { getTotalPrice } from "@api/price.service";
import { Price } from "src/types/models/price";
import { Summary } from "./Summary";

export function PaymentScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();

  const [totalPrice, setTotalPrice] = useState<Price>({ currency: "EUR", value: 0 });

  const { departure, route, getGroupTickets, getTickets } = useBookingStore(state => ({
    departure: state.departure,
    route: state.route,
    getGroupTickets: state.getGroupTickets,
    getTickets: state.getTickets,
  }));

  const tickets = useMemo(() => getTickets(), [getTickets]);

  useEffect(() => {
    if (!departure || !route) return;
    getTotalPrice({ uuid: departure?.uuid, tickets }).then(price => setTotalPrice(price));
  }, [departure, route, tickets]);

  const onConfirmBooking = async () => {
    try {
      if (!departure || !route) return;

      const booking = await createBooking(departure.uuid, tickets);
      const receipt = await getReceipt(booking.number);

      const printableReceipt = receiptUtils.generatePrintableReceipt(receipt);
      await Printer.printTcp({ payload: printableReceipt });
    } catch (error) {
      // TODO: Handle errors properly with toasters.
    }
  };

  const onPressMainMenu = () => navigation.navigate(NavigationScreens.MAIN_MENU);

  const onPressSummary = () => navigation.navigate(NavigationScreens.BOOKING_SUMMARY);

  const summaryData = useMemo(
    () => [
      ...getGroupTickets().map(entry => ({
        title: entry.group,
        content: entry.tickets,
      })),
      {
        title: "Total",
        content: totalPrice,
      },
    ],
    [getGroupTickets, totalPrice],
  );

  return (
    <ScreenLayout>
      <VStack alignItems="center">
        <Typography variant="title" mb={-12}>
          {t("payment.screen-title")}
        </Typography>
        {/* TODO: Will be updated on pr #23 */}
        {/* <VStack alignItems="center">
          <Typography size="xs">
            {departureDate} {departureTime}
          </Typography>
          <Typography size="xs">
            ({originCode} - {destinationCode})
          </Typography>
        </VStack> */}
      </VStack>
      <Summary onConfirmBooking={onConfirmBooking} data={summaryData} />
      <Footer>
        <FooterButton label={t("footer.main-menu")} symbolColor="blue" onPress={onPressMainMenu} />
        <FooterButton label={t("footer.summary")} symbolColor="green" onPress={onPressSummary} />
        <ResetButton />
      </Footer>
    </ScreenLayout>
  );
}
