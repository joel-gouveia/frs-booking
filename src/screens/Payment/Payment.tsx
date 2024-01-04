import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";

import { Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { useBookingStore } from "@hooks/useBookingStore";
import { FooterButton } from "@components/Footer/FooterButton";
import { createBooking, getReceipt } from "@api/booking.service";
import { Printer } from "@modules/ThermalPrinter/ThermalPrinter";
import { receiptUtils } from "@utils/receipt";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { Ticket, TicketTypeGroup } from "src/types/models/ticket";
import { getTotalPrice } from "@api/price.service";
import { Price } from "src/types/models/price";
import { Summary } from "./Summary";

export function PaymentScreen() {
  const navigation = useNavigation<NavigationProps>();
  const { t } = useTranslation();

  const [totalPrice, setTotalPrice] = useState<Price>({ currency: "EUR", value: 0 });

  const { originCode, destinationCode, departureDate, departureTime, /* itemCounters , */ uuid } =
    useBookingStore(state => ({
      originCode: state.originCode,
      destinationCode: state.destinationCode,
      departureDate: state.departureDate,
      departureTime: state.departureTime,
      uuid: state.uuid,
      // itemCounters: state.itemCounters,
    }));

  // TODO: itemCounters should look like this:
  const itemCounters: {
    ticketTypeGroupName: TicketTypeGroup["name"];
    tickets: Ticket[];
  }[] = [
    {
      ticketTypeGroupName: "Passengers",
      tickets: [
        { code: "Adult", quantity: 2 },
        { code: "Children", quantity: 1 },
      ],
    },
  ];

  // TODO: this could also come from the store.
  const tickets: Ticket[] = itemCounters.flatMap(({ tickets }) => tickets);

  useEffect(() => {
    getTotalPrice({ uuid, tickets }).then(price => setTotalPrice(price));
  }, [uuid, tickets]);

  // Talk to João about...
  // 1 - How can we restrucure the store to make it easier to get the data the way above?
  // 2 - Should we save the total price in the store?

  const onConfirmBooking = async () => {
    try {
      const booking = await createBooking(uuid, tickets);
      const receipt = await getReceipt(booking.number);

      const printableReceipt = receiptUtils.generatePrintableReceipt(receipt);
      await Printer.printTcp({ payload: printableReceipt });
    } catch (error) {
      // TODO: Handle errors properly with toasters.
    }
  };

  const onPressMainMenu = () => navigation.navigate(NavigationScreens.MAIN_MENU);

  const onPressSummary = () => navigation.navigate(NavigationScreens.BOOKING_SUMMARY);

  const summaryData = [
    ...itemCounters.map(({ ticketTypeGroupName, tickets }) => ({
      title: ticketTypeGroupName,
      content: tickets,
    })),
    {
      title: "Total",
      content: totalPrice,
    },
  ];

  return (
    <ScreenLayout>
      <VStack alignItems="center">
        <Typography variant="title" mb={-12}>
          {t("payment.screen-title")}
        </Typography>
        <VStack alignItems="center">
          <Typography size="xs">
            {departureDate} {departureTime}
          </Typography>
          <Typography size="xs">
            ({originCode} - {destinationCode})
          </Typography>
        </VStack>
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
