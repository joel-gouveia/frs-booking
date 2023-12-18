import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useBookingStore } from "@hooks/useBookingStore";
import { FooterButton } from "../FooterButton";

export function MainMenuButton() {
  const { t } = useTranslation();
  const setItemCounters = useBookingStore(state => state.setItemCounters);
  const { navigate } = useNavigation<NavigationProps>();

  const onPress = () => {
    setItemCounters({});
    navigate(NavigationScreens.MAIN_MENU);
  };

  return <FooterButton label={t("footer.main-menu")} onPress={onPress} />;
}
