import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/index";
import { PasswordInput } from "@components/Input/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const { t } = useTranslation();
  const { navigate } = useNavigation<NavigationProps>();
  const { authenticate, isLoadingAuth, isLoadingStorage } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPressed = async () => {
    await authenticate(username, password);
    navigate(NavigationScreens.ROUTES);
  };

  if (isLoadingStorage) return null; // Can be a splash screen in the future.

  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="flex-end">
        <HStack my={10}>
          <Typography>{t("login.log-in-to")} </Typography>
          <Typography bold>{t("login.frs-account")}</Typography>
        </HStack>
        <Input
          testID="username-input"
          isDisabled={isLoadingAuth}
          value={username}
          onChangeText={setUsername}
          placeholder={t("login.username")}
        />
        <PasswordInput
          testID="password-input"
          isDisabled={isLoadingAuth}
          value={password}
          onChangeText={setPassword}
          placeholder={t("login.password")}
        />
        <TextButton onPress={handleLoginPressed} isLoading={isLoadingAuth} testID="login-btn">
          {t("login.login")}
        </TextButton>
        <Divider />
        <TouchableOpacity
          onPress={() => navigate(NavigationScreens.PASSWORD_RESET)}
          testID="forgot-password-btn">
          <Typography>{t("login.forgot-password?")}</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
