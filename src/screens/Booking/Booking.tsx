import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { Button, Typography, VStack } from "@components/index";
import React from "react";
import { StyleSheet, View } from "react-native";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { Footer } from "@components/Footer/Footer";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import EnterKey from "@assets/images/enter-key.svg";
import { useBookingStore } from "@hooks/useBookingStore";
import { MainMenuButton } from "@components/Footer/CustomButtons/MainMenuButton";
import { FooterButton } from "@components/Footer/FooterButton";
import { extractDateFromDateTime, extractTimeFromDateTime } from "@utils/date";
import { useTicketTypesStore } from "@hooks/useTicketTypesStore";
import { TicketToSell } from "src/types/models/ticket";
import { get } from "underscore";
import { BookingItem } from "./Item";

export function BookingScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

  const ticketTypes = useTicketTypesStore(state => state.ticketTypes);
  const { route, departure, itemCounters, increment, decrement } = useBookingStore(state => ({
    route: state.route,
    departure: state.departure,
    itemCounters: state.itemCounters,
    decrement: state.decrement,
    increment: state.increment,
    getGroupTickets: state.getGroupTickets,
    getTickets: state.geTickets,
  }));

  // Let's suppose we are on the Passengers screen selecting its tickets...
  const ticketGroup = ticketTypes[0]; // Passengers ticket group

  const onPlusPress = (ticket: TicketToSell) => increment(ticketGroup.name, ticket);
  const onMinusPress = (ticket: TicketToSell) => decrement(ticketGroup.name, ticket);

  return (
    <ScreenLayout>
      <View style={styles.header}>
        <Typography size="sm" style={styles.headerText}>
          {t("common.voyageleg")}:{departure && extractDateFromDateTime(departure.departureTime)}{" "}
          {departure && extractTimeFromDateTime(departure.departureTime)}
          {route?.origin.code} - {route?.destination.code}
        </Typography>
      </View>
      <VStack gap={12} mb={30} style={styles.ticketsWrapper}>
        {ticketGroup.transportables.map((ticket: TicketToSell) => (
          <BookingItem
            count={get(itemCounters, [ticketGroup.name, ticket.code, "quantity"], 0)}
            key={ticket.code}
            ticketToSell={ticket}
            onMinusPress={() => onMinusPress(ticket)}
            onPlusPress={() => onPlusPress(ticket)}
          />
        ))}
      </VStack>
      <Button onPress={() => {}} variant="outline" style={styles.bookButton}>
        <EnterKey height={30} width={30} style={styles.enterKeyIcon} />
        <Typography style={styles.bookButtonText}>{t("booking.book")}</Typography>
      </Button>
      <Footer>
        <MainMenuButton />
        <FooterButton
          label={t("footer.summary")}
          onPress={() => navigate(NavigationScreens.BOOKING_SUMMARY)}
        />
        <FooterButton label={t("footer.reset")} onPress={() => {}} />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  header: {
    marginBottom: 20,
  },
  ticketsWrapper: {
    flexWrap: "wrap",
    flexDirection: "row",
    justifyContent: "flex-start",
  },
  headerText: {
    backgroundColor: "#d9d9d9",
    alignSelf: "flex-start",
    paddingHorizontal: 4,
    paddingVertical: 2,
    borderRadius: 6,
  },
  invisibleSeparator: {
    width: 50,
  },
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
