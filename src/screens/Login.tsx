import React, { useState } from "react";
import { TouchableOpacity } from "react-native";

import { Button, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { PasswordInput } from "@components/Input/PasswordInput";
import useAuth from "@hooks/useAuth";

export function LoginScreen() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleLoginPressed = async () => {
    login(username, password);
  };

  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="flex-end">
        <HStack my={10}>
          <Typography>Log in to </Typography>
          <Typography bold>FRS Account</Typography>
        </HStack>
        <Input value={username} onChangeText={setUsername} placeholder="Username*" />
        <PasswordInput value={password} onChangeText={setPassword} placeholder="Password*" />
        <Button onPress={handleLoginPressed}>Login</Button>
        <Divider />
        <TouchableOpacity>
          <Typography>Forgot your Password?</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
