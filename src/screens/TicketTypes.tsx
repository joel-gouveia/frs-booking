import { Button, HStack, Typography } from "@components/index";
import { ScreenLayout } from "@layouts/ScreenLayout";
import React, { useEffect } from "react";
import Icon from "react-native-vector-icons/FontAwesome6";
import { theme } from "src/theme/theme";
import { FlatList, StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { FooterButton } from "@components/Footer/FooterButton";
import { ResetButton } from "@components/Footer/CustomButtons/ResetButton";
import EnterKey from "@assets/images/enter-key.svg";
import { TextButton } from "@components/Button/TextButton";
import { useTranslation } from "react-i18next";
import { getTransportables } from "@api/transportables.service";
import { useBookingStore } from "@hooks/useBookingStore";
import { useTicketTypesStore } from "@hooks/useTicketTypesStore";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function TicketTypesScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { route } = useBookingStore();
  const { isLoaded, setTicketTypes, ticketTypes } = useTicketTypesStore();

  useEffect(() => {
    if (!route) {
      return navigate(NavigationScreens.ROUTES);
    }

    const originCode = route.origin.code;
    const destinationCode = route.destination.code;

    if (!isLoaded(originCode, destinationCode)) {
      getTransportables({ originCode, destinationCode }).then(res =>
        setTicketTypes(res, originCode, destinationCode),
      );
    }
  }, [route, isLoaded, setTicketTypes, navigate]);

  const separator = () => <View style={styles.ticketTypeButtonSeparator} />;

  // TODO: Add loading animation
  return (
    <ScreenLayout>
      <Typography variant="title">{t("ticket-types.what-do-you-want-to-book")}</Typography>
      <Icon name="ticket" size={30} color={theme.colors.primary.main} style={styles.ticketLogo} />
      <View style={styles.ticketsContainer}>
        {route && isLoaded(route.origin.code, route.destination.code) && (
          <FlatList
            data={ticketTypes}
            renderItem={({ item: { key, name } }) => (
              // WARN: Remove the onPress
              <TextButton hotkey={key} testID="ticket-type-btn">
                {name}
              </TextButton>
            )}
            keyExtractor={({ key }) => String(key)}
            ItemSeparatorComponent={separator}
          />
        )}
      </View>
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
  ticketLogo: {
    marginTop: 16,
    marginBottom: 24,
    alignSelf: "center",
  },
  ticketsContainer: {
    flex: 1,
  },
  ticketTypeButtonSeparator: {
    height: 12,
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
