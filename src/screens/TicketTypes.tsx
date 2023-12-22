import { Button, HStack, TextButton, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React from "react";
import TicketLogo from "@assets/images/ticket.svg";
import { theme } from "src/theme/theme";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import EnterKey from "@assets/images/enter-key.svg";

export function TicketTypesScreen() {
  return (
    <ScreenLayout>
      <Typography variant="title">What do you want to book?</Typography>
      <TicketLogo
        width={40}
        height={23}
        color={theme.colors.primary.main}
        style={styles.ticketLogo}
      />
      <VStack gap={12}>
        <TextButton>Passengers</TextButton>
        <TextButton>Vehicles</TextButton>
        <TextButton>Multitickets</TextButton>
        <TextButton>Others</TextButton>
      </VStack>
      <Button style={{ marginTop: 50, paddingVertical: 8 }}>
        <HStack gap={14}>
          <EnterKey height={24} width={24} fill="white" />
          <Typography
            color={theme.colors.primary.contrastText}
            style={{ fontWeight: "600", fontSize: 18 }}>
            Book
          </Typography>
          <EnterKey height={24} width={24} fill="white" />
        </HStack>
      </Button>
      <Footer>
        <FooterButton label="Main Menu" symbolColor="blue" />
        <FooterButton label="Summary" symbolColor="green" />
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
});
