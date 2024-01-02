import { Button, HStack, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React, { useEffect, useState } from "react";
import TicketLogo from "@assets/images/ticket.svg";
import { theme } from "src/theme/theme";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import EnterKey from "@assets/images/enter-key.svg";
import { TextButton } from "@components/Button/TextButton";
import { useTranslation } from "react-i18next";
import { getTransportables } from "@api/transportables.service";
import { useBookingStore } from "@hooks/useBookingStore";
import { TransportableResponse } from "src/types/transportables";

export function TicketTypesScreen() {
  const { t } = useTranslation();
  const { originCode, destinationCode } = useBookingStore();

  const [ticketTypes, setTicketTypes] = useState<TransportableResponse[]>([]);

  useEffect(() => {
    getTransportables(originCode, destinationCode).then(setTicketTypes);
  }, [originCode, destinationCode]);

  return (
    <ScreenLayout>
      <Typography variant="title">{t("ticket-types.what-do-you-want-to-book")}</Typography>
      <TicketLogo
        width={40}
        height={23}
        color={theme.colors.primary.main}
        style={styles.ticketLogo}
      />
      <VStack gap={12}>
        {ticketTypes.map(({ key, name }) => (
          <TextButton key={key} hotkey={key}>
            {name}
          </TextButton>
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
        <FooterButton label={t("footer.main-menu")} symbolColor="blue" />
        <FooterButton label={t("footer.summary")} symbolColor="green" />
        <ResetButton />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  ticketLogo: {
    marginTop: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
  bookButton: {
    marginTop: 50,
    paddingVertical: 8,
  },
  bookButtonText: {
    fontWeight: "600",
    fontSize: 18,
  },
});
