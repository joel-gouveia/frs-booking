import { Button } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Footer } from "@components/Footer/Footer";

export function MainMenuScreen() {
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <View style={styles.container}>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.sales")}
        </Button>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.boarding")}
        </Button>
        <Button variant="outline" fontSize={30} testID="route-btn">
          {t("main-menu.cancel")}
        </Button>
      </View>
      <Footer
        buttons={[
          {
            label: t("footer.logout"),
            onPress: () => {},
          },
        ]}
      />
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  container: {
    display: "flex",
    gap: 20,
    paddingTop: 50,
  },
});
