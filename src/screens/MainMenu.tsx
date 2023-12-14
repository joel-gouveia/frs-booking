import { TextButton, VStack } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import { useAuth } from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function MainMenuScreen() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <ScreenLayout>
      <VStack gap={20} style={styles.container}>
        <TextButton
          onPress={() => navigate(NavigationScreens.DEPARTURE_TIME)}
          variant="outline"
          fontSize={30}>
          {t("main-menu.sales")}
        </TextButton>
        <TextButton variant="outline" fontSize={30}>
          {t("main-menu.boarding")}
        </TextButton>
        <TextButton variant="outline" fontSize={30}>
          {t("main-menu.cancel")}
        </TextButton>
      </VStack>
      <Footer
        buttons={[
          {
            label: t("footer.logout"),
            onPress: async () => {
              await logout();
              navigate(NavigationScreens.LOGIN);
            },
          },
        ]}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: 50,
  },
});
