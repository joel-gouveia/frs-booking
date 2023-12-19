import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Divider, Typography, VStack } from "@components/index";
import { Input } from "@components/Input.v2/Input";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useTranslation } from "react-i18next";
import { UnauthLayout } from "@layouts/UnauthLayout";
import FlexWaysLogo from "@assets/images/logo.svg";
import { PasswordInput } from "@components/Input.v2/PasswordInput";

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
    <UnauthLayout>
      <FlexWaysLogo width={265} height={80} style={{ alignSelf: "center" }} fill="white" />
      <Typography fontSize={20} bold style={{ alignSelf: "center", color: "white" }}>
        {t("login.frs-account")}
      </Typography>
      <VStack gap={20} alignItems="flex-end">
        <Input
          testID="username-input"
          isDisabled={isLoadingAuth}
          value={username}
          onChangeText={setUsername}
          placeholder={`${t("login.username")}*`}
          placeholderTextColor="white"
          style={{
            borderBottomWidth: 1,
            borderColor: "white",
            borderWidth: 0,
            borderRadius: 0,
            paddingHorizontal: 4,
            paddingVertical: 4,
          }}
        />
        <PasswordInput
          testID="password-input"
          isDisabled={isLoadingAuth}
          value={password}
          onChangeText={setPassword}
          placeholder={`${t("login.password")}*`}
          placeholderTextColor="white"
          style={{
            borderBottomWidth: 1,
            borderColor: "white",
            borderWidth: 0,
            borderRadius: 0,
            paddingHorizontal: 4,
            paddingVertical: 4,
            color: "white",
          }}
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
    </UnauthLayout>
  );
}
