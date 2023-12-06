import React, { useEffect, useState } from "react";
import { TouchableOpacity } from "react-native";

import { Button, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "@layouts/index";
import { PasswordInput } from "@components/Input/PasswordInput";
import useAuth from "@hooks/useAuth";
import { useNavigation } from "@react-navigation/native";
import { NavigationProps, NavigationSreens } from "src/types/navigation";

export function LoginScreen() {
  const { login, isAuthenticating, loadStorageData } = useAuth();
  const navigation = useNavigation<NavigationProps>();

  const [isLoadingStorage, setIsLoadingStorage] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPressed = async () => {
    await login(username, password);
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
          <Typography>Log in to </Typography>
          <Typography bold>FRS Account</Typography>
        </HStack>
        <Input
          isDisabled={isAuthenticating}
          value={username}
          onChangeText={setUsername}
          placeholder="Username*"
        />
        <PasswordInput
          isDisabled={isAuthenticating}
          value={password}
          onChangeText={setPassword}
          placeholder="Password*"
        />
        <Button onPress={handleLoginPressed} isLoading={isAuthenticating}>
          Login
        </Button>
        <Divider />
        <TouchableOpacity>
          <Typography>Forgot your Password?</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
