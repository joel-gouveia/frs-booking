import { useBooking } from "@hooks/useBooking";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { FooterButton } from "../FooterButton";

export function MainMenuButton() {
  const { t } = useTranslation();
  const { setItemCounters } = useBooking();
  const { navigate } = useNavigation<NavigationProps>();

  const onPress = () => {
    setItemCounters({});
    navigate(NavigationScreens.MAIN_MENU);
  };

  return <FooterButton label={t("footer.main-menu")} onPress={onPress} />;
}
