import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/index";
import { PasswordInput } from "@components/Input/PasswordInput";
import { useTranslation } from "react-i18next";

export function PasswordResetScreen() {
  const { t } = useTranslation();
  const { isLoadingAuth, isLoadingStorage } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");

  if (isLoadingStorage) return null;

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
          testID="email-input"
          isDisabled={isLoadingAuth}
          value={email}
          onChangeText={setEmail}
          placeholder={t("login.password")}
        />
        <TextButton isLoading={isLoadingAuth} testID="login-btn">
          {t("login.login")}
        </TextButton>
        <Divider />
      </VStack>
    </ScreenLayout>
  );
}
