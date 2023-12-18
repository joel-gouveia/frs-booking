import React, { useState } from "react";
import { useAuth } from "@hooks/useAuth";

import { TextButton, Divider, Input, Typography, VStack } from "@components/index";
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
        <Typography>{t("password-reset.reset-password")} </Typography>
        <Input
          isDisabled={isLoadingAuth}
          value={username}
          onChangeText={setUsername}
          placeholder={t("login.username")}
        />
        <PasswordInput
          isDisabled={isLoadingAuth}
          value={email}
          onChangeText={setEmail}
          placeholder={t("password-reset.email")}
        />
        <TextButton isLoading={isLoadingAuth}>{t("password-reset.send-email")}</TextButton>
        <Divider />
      </VStack>
    </ScreenLayout>
  );
}
