import { Button } from "@components/index";
import React from "react";

import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";

export function MainMenuScreen() {
  const { t } = useTranslation();

  return (
    <ScreenLayout>
      <Button variant="outline" fontSize={30} testID="route-btn">
        {t("main-menu.sales")}
      </Button>
      <Button variant="outline" fontSize={30} testID="route-btn">
        {t("main-menu.boarding")}
      </Button>
      <Button variant="outline" fontSize={30} testID="route-btn">
        {t("main-menu.cancel")}
      </Button>
    </ScreenLayout>
  );
}
