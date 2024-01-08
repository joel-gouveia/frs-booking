import React from "react";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, HStack, Typography } from "@components/index";
import { StyleSheet } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { FooterButton } from "@components/Footer/FooterButton";
import { useTicketTypesStore } from "@hooks/useTicketTypesStore";
import { TicketToSell } from "src/types/models/ticket";
import { get } from "underscore";
import { departureUtils } from "@utils/departure";
import { BookingItem } from "./Item";

export function BookingScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

  const { ticketTypes } = useTicketTypesStore();
  const { route, departure, itemCounters, increment, decrement, resetCounters } = useBookingStore(
    state => ({
      route: state.route,
      departure: state.departure,
      itemCounters: state.itemCounters,
      decrement: state.decrement,
      increment: state.increment,
      resetCounters: state.resetCounters,
    }),
  );

  // Let's suppose we are on the Passengers screen selecting its tickets...
  const ticketGroup = ticketTypes[0]; // Passengers ticket group

  const onPlusPress = (ticket: TicketToSell) => increment(ticketGroup.name, ticket);
  const onMinusPress = (ticket: TicketToSell) => decrement(ticketGroup.name, ticket);

  // TODO: This is handled in another PR
  const onPressBook = () => navigate(NavigationScreens.BOOKING_SUMMARY);

  return (
    <ScreenLayout
      headerProps={{
        title: t("booking.book"),
        subtitles: [
          departureUtils.formatDateAndTime(departure?.departureTime),
          `(${route?.origin.code} - ${route?.destination.code})`,
        ],
      }}>
      <HStack gap={50} mb={75}>
        {ticketGroup.transportables.map((ticket: TicketToSell) => (
          <BookingItem
            count={get(itemCounters, [ticketGroup.name, ticket.code, "quantity"], 0)}
            key={ticket.code}
            ticketToSell={ticket}
            onMinusPress={() => onMinusPress(ticket)}
            onPlusPress={() => onPlusPress(ticket)}
          />
        ))}
      </HStack>
      <Button onPress={onPressBook} variant="outline" style={styles.bookButton}>
        <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
        <Typography style={styles.bookButtonText}>{t("booking.book")}</Typography>
      </Button>
      <Footer>
        <MainMenuButton />
        <FooterButton
          label={t("footer.summary")}
          onPress={() => navigate(NavigationScreens.BOOKING_SUMMARY)}
        />
        <FooterButton label={t("footer.reset")} onPress={resetCounters} />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  bookButton: {
    marginHorizontal: 40,
    position: "relative",
    paddingVertical: 24,
  },
  bookButtonText: {
    fontSize: 20,
  },
  enterKeyIcon: {
    position: "absolute",
    right: 4,
    top: 4,
  },
});
