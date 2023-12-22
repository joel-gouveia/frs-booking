import { Typography } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React from "react";
import TicketLogo from "@assets/images/ticket.svg";
import { theme } from "src/theme/theme";
import { StyleSheet } from "react-native";

export function TicketTypesScreen() {
  return (
    <ScreenLayout>
      <Typography variant="title">What do you want to book?</Typography>
      <TicketLogo
        width={40}
        height={26}
        color={theme.colors.primary.main}
        style={styles.ticketLogo}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  ticketLogo: {
    marginVertical: 16,
    alignSelf: "center",
  },
});
