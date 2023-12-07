import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";
import useAuth from "@hooks/useAuth";

import { Button, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/index";
import { PasswordInput } from "@components/Input/PasswordInput";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationSreens } from "src/types/navigation";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const { t } = useTranslation();
  const { authenticate, isLoading, loadStorageData } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const [isLoadingStorage, setIsLoadingStorage] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPressed = async () => {
    await authenticate(username, password);
    navigation.navigate(NavigationSreens.ROUTES);
  };

  useEffect(() => {
    setIsLoadingStorage(true);
    loadStorageData().finally(() => setIsLoadingStorage(false));
  }, [loadStorageData]);

  if (isLoadingStorage) return null; // Can be a splash screen in the future.

  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="flex-end">
        <HStack my={10}>
          <Typography>{t("login.log-in-to")} </Typography>
          <Typography bold>{t("login.frs-account")}</Typography>
        </HStack>
        <Input
          isDisabled={isLoading}
          value={username}
          onChangeText={setUsername}
          placeholder="Username*"
        />
        <PasswordInput
          isDisabled={isLoading}
          value={password}
          onChangeText={setPassword}
          placeholder="Password*"
        />
        <Button onPress={handleLoginPressed} isLoading={isLoading}>
          Login
        </Button>
        <Divider />
        <TouchableOpacity>
          <Typography>{t("login.forgot-password?")}</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
