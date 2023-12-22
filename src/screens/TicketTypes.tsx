import { Button, HStack, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React from "react";
import TicketLogo from "@assets/images/ticket.svg";
import { theme } from "src/theme/theme";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import EnterKey from "@assets/images/enter-key.svg";
import { TextButton } from "@components/Button/TextButton";

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
        <TextButton hotkey="0">Passengers</TextButton>
        <TextButton hotkey="1">Vehicles</TextButton>
        <TextButton hotkey="2">Multitickets</TextButton>
        <TextButton hotkey="3">Others</TextButton>
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
