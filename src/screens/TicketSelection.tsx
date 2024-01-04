import { ScreenLayout } from "@layouts/ScreenLayout";
import React from "react";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import { useTranslation } from "react-i18next";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens, PropsWithTypedRoute } from "src/types/navigation";
import { Typography } from "@components/index";
import { useBookingStore } from "@hooks/useBookingStore";

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

  return (
    <ScreenLayout>
      <Typography variant="title">{route?.params.ticketType}</Typography>
      <Typography size="xs" style={styles.dateTimeText}>
        {departureDate} {departureTime}
      </Typography>
      <Typography size="xs" style={styles.routeText}>
        ({originCode}-{destinationCode})
      </Typography>
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
    marginTop: 4,
  },
  routeText: {
    textAlign: "center",
    lineHeight: 14,
  },
});
