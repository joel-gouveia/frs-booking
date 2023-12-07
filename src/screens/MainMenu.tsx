import { Button, VStack } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { Footer } from "@components/Footer/Footer";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";

export function MainMenuScreen() {
  const { t } = useTranslation();
  const { logout } = useAuth();
  const { navigate } = useNavigation<NavigationProps>();

  return (
    <ScreenLayout>
      <VStack gap={20} style={styles.container}>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.sales")}
        </Button>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.boarding")}
        </Button>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.cancel")}
        </Button>
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
