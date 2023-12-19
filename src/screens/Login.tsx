import React, { useState } from "react";
import { TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Divider, Typography } from "@components/index";
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
      <Typography bold style={{ alignSelf: "center", color: "white", fontSize: 20 }}>
        {t("login.frs-account")}
      </Typography>
      <Input
        testID="username-input"
        isDisabled={isLoadingAuth}
        value={username}
        onChangeText={setUsername}
        placeholder={`${t("login.username")}*`}
        style={{ marginBottom: 32 }}
      />
      <PasswordInput
        testID="password-input"
        isDisabled={isLoadingAuth}
        value={password}
        onChangeText={setPassword}
        placeholder={`${t("login.password")}*`}
        style={{ marginBottom: 8 }}
      />
      <TouchableOpacity
        onPress={() => navigate(NavigationScreens.PASSWORD_RESET)}
        testID="forgot-password-btn">
        <Typography color="white" style={{ fontSize: 12 }}>
          {t("login.forgot-password?")} Click{" "}
          <Typography bold color="white" style={{ fontSize: 12 }}>
            here
          </Typography>
        </Typography>
      </TouchableOpacity>
      <TextButton onPress={handleLoginPressed} isLoading={isLoadingAuth} testID="login-btn">
        {t("login.login")}
      </TextButton>
      <Divider />
    </UnauthLayout>
  );
}
