import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Button, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { PasswordInput } from "@components/Input/PasswordInput";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationSreens } from "src/types/navigation";
import { useTranslation } from "react-i18next";

export function LoginScreen() {
  const { t } = useTranslation();
  const { login } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPressed = async () => {
    await login(username, password);
    navigation.navigate(NavigationSreens.ROUTES);
  };

  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="flex-end">
        <HStack my={10}>
          <Typography>{t("login.log-in-to")} </Typography>
          <Typography bold>{t("login.frs-account")}</Typography>
        </HStack>
        <Input value={username} onChangeText={setUsername} placeholder={t("login.username")} />
        <PasswordInput
          value={password}
          onChangeText={setPassword}
          placeholder={t("login.password")}
        />
        <Button onPress={handleLoginPressed}>{t("login.login")}</Button>
        <Divider />
        <TouchableOpacity>
          <Typography>{t("login.forgot-password?")}</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
