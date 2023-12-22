import { TextButton, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React from "react";
import TicketLogo from "@assets/images/ticket.svg";
import { theme } from "src/theme/theme";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";

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
      <Footer>
        <FooterButton label="Main Menu" symbolColor="blue" />
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
