import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TouchableOpacity } from "react-native";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Typography } from "@components/index";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationScreens } from "src/types/navigation";
import { useTranslation } from "react-i18next";
import { UnauthLayout } from "@layouts/UnauthLayout";
import FlexWaysLogo from "@assets/images/logo.svg";
import { Input } from "@components/Input/Input";
import { PasswordInput } from "@components/Input/PasswordInput";

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
      <FlexWaysLogo width={265} height={80} style={styles.logo} fill="white" />
      <Typography bold style={styles.subLogo}>
        {t("login.frs-account")}
      </Typography>
      <KeyboardAvoidingView keyboardVerticalOffset={20} behavior="position">
        <Input
          testID="username-input"
          isDisabled={isLoadingAuth}
          value={username}
          onChangeText={setUsername}
          placeholder={`${t("login.username")}*`}
          style={styles.usernameInput}
        />
        <PasswordInput
          testID="password-input"
          isDisabled={isLoadingAuth}
          value={password}
          onChangeText={setPassword}
          placeholder={`${t("login.password")}*`}
          style={styles.passwordInput}
        />
      </KeyboardAvoidingView>
      <TouchableOpacity
        onPress={() => navigate(NavigationScreens.PASSWORD_RESET)}
        testID="forgot-password-btn">
        <Typography color="white" size="xs">
          {t("login.forgot-password?")} {t("login.click")}{" "}
          <Typography bold color="white" size="xs">
            {t("login.here")}
          </Typography>
        </Typography>
      </TouchableOpacity>
      <TextButton
        style={styles.loginButton}
        onPress={handleLoginPressed}
        isLoading={isLoadingAuth}
        testID="login-btn">
        {t("login.login")}
      </TextButton>
    </UnauthLayout>
  );
}

const styles = StyleSheet.create({
  logo: {
    alignSelf: "center",
    marginTop: 50,
  },
  subLogo: {
    alignSelf: "center",
    color: "white",
    fontSize: 20,
    marginBottom: 140,
  },
  usernameInput: {
    marginBottom: 32,
  },
  passwordInput: {
    marginBottom: 8,
  },
  loginButton: {
    marginTop: 60,
    paddingVertical: 10,
  },
});
