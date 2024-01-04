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

interface Props extends PropsWithTypedRoute<NavigationScreens.TICKET_SELECTION> {}

export function TicketSelectionScreen({ route }: Props) {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

  // TODO: Add loading animation
  return (
    <ScreenLayout>
      <Typography variant="title">{route?.params.ticketType}</Typography>
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

StyleSheet.create({});
