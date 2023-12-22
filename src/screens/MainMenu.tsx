import { TextButton, VStack } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { Footer } from "@components/Footer/Footer";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { FooterButton } from "@components/Footer/FooterButton";
import { StyleSheet } from "react-native";

export function MainMenuScreen() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { navigate } = useNavigation<NavigationProps>();

  const handleLogout = async () => {
    await logout();
    navigate(NavigationScreens.LOGIN);
  };

  return (
    <ScreenLayout>
      <VStack gap={20} pt={50}>
        <TextButton
          onPress={() => navigate(NavigationScreens.TICKET_TYPES)}
          variant="outline"
          textStyle={styles.button}>
          {t("main-menu.sales")}
        </TextButton>
        <TextButton variant="outline" textStyle={styles.button}>
          {t("main-menu.boarding")}
        </TextButton>
        <TextButton variant="outline" textStyle={styles.button}>
          {t("main-menu.cancel")}
        </TextButton>
      </VStack>
      <Footer>
        <FooterButton label={t("footer.logout")} onPress={handleLogout} />
      </Footer>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  button: {
    fontSize: 30,
  },
});
