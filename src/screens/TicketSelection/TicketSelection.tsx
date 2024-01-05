import { ScreenLayout } from "@layouts/ScreenLayout";
import React, { useMemo } from "react";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens, PropsWithTypedRoute } from "src/types/navigation";
import { Button, HStack, Typography, VStack } from "@components/index";
import { useBookingStore } from "@hooks/useBookingStore";
import EnterKey from "@assets/images/enter-key.svg";
import { theme } from "src/theme/theme";
import { useTicketTypesStore } from "@hooks/useTicketTypesStore";
import { chunkArray } from "@utils/array";
import { ItemsRow } from "./ItemsRow";

const NUM_COLS = 2;

interface Props extends PropsWithTypedRoute<NavigationScreens.TICKET_SELECTION> {}

export function TicketSelectionScreen({ route }: Props) {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { originCode, destinationCode, departureDate, departureTime } = useBookingStore(state => ({
    originCode: state.originCode,
    destinationCode: state.destinationCode,
    departureDate: state.departureDate,
    departureTime: state.departureTime,
  }));
  const ticketTypes = useTicketTypesStore(state => state.ticketTypes);

  const transportables = useMemo(() => {
    const ticket = ticketTypes.find(({ name }) => route?.params.ticketType === name);

    if (!ticket) {
      return [];
    }

    return chunkArray(ticket.transportables, NUM_COLS);
  }, [route?.params.ticketType, ticketTypes]);

  return (
    <ScreenLayout>
      <Typography variant="title">{route?.params.ticketType}</Typography>
      <Typography size="xs" style={styles.dateTimeText}>
        {departureDate} {departureTime}
      </Typography>
      <Typography size="xs" style={styles.routeText}>
        ({originCode}-{destinationCode})
      </Typography>
      <VStack gap={10} mb={75} style={styles.itemsContainer}>
        {transportables.map(row => (
          <ItemsRow key={row[0].name} row={row} numCols={NUM_COLS} />
        ))}
      </VStack>
      <Button style={styles.bookButton}>
        <HStack gap={14}>
          <EnterKey height={24} width={24} fill="white" />
          <Typography color={theme.colors.primary.contrastText} style={styles.bookButtonText}>
            {t("ticket-types.book")}
          </Typography>
          <EnterKey height={24} width={24} fill="white" />
        </HStack>
      </Button>
      <Footer>
        <FooterButton
          label={t("footer.main-menu")}
          symbolColor="blue"
          onPress={() => navigate(NavigationScreens.MAIN_MENU)}
        />
        <FooterButton label={t("footer.summary")} symbolColor="green" />
        <ResetButton />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  dateTimeText: {
    textAlign: "center",
    marginTop: 2,
  },
  routeText: {
    textAlign: "center",
    lineHeight: 14,
    marginBottom: 12,
  },
  itemsContainer: {
    flex: 1,
  },
  bookButton: {
    paddingVertical: 8,
    marginBottom: 16,
  },
  bookButtonText: {
    fontWeight: "600",
    fontSize: 18,
  },
});
