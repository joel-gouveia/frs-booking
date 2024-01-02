import React from "react";
import { StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";
import FontAwesome6Icon from "react-native-vector-icons/FontAwesome6";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";

import { Button, Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { useTranslation } from "react-i18next";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { theme } from "src/theme/theme";

export function MainMenuScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();

  const optionButtons = [
    {
      title: t("main-menu.booking"),
      onPress: () => navigate(NavigationScreens.DEPARTURE_TIME),
      icon: <FontAwesome6Icon name="ticket" size={22} color="white" />,
    },
    {
      title: t("main-menu.boarding"),
      onPress: () => {},
      icon: <FontAwesome6Icon name="sailboat" size={22} color="white" />,
    },
    {
      title: t("main-menu.cancel"),
      onPress: () => {},
      icon: <FontAwesomeIcon name="remove" size={22} color="white" />,
    },
  ];

  return (
    <ScreenLayout>
      <VStack gap={15} alignItems="center" justifyContent="center">
        <Typography bold style={styles.title} size="xl" color={theme.colors.text}>
          {t("main-menu.title")}
        </Typography>
        <Typography size="md" color={theme.colors.text}>
          {t("main-menu.route-number", { routeNumber: "XXXXX" })}
        </Typography>
      </VStack>
      <VStack gap={20} pt={30}>
        {optionButtons.map(({ title, onPress, icon }) => (
          <Button onPress={onPress} variant="solid" key={title} startIcon={icon} endIcon={icon}>
            <Typography bold size="xl" style={styles.buttonTitle}>
              {title}
            </Typography>
          </Button>
        ))}
      </VStack>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({
  title: {
    textAlign: "center",
    maxWidth: 180,
  },
  button: {
    fontSize: 30,
  },
  buttonTitle: {
    paddingVertical: 5,
    paddingHorizontal: 12,
    color: theme.colors.primary.contrastText,
  },
});
