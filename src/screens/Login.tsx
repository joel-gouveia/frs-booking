import React from "react";
import { TouchableOpacity } from "react-native";

import { Button, Divider, HStack, Input, Typography, VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";
import { PasswordInput } from "@components/Input/PasswordInput";

export function LoginScreen() {
  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="flex-end">
        <HStack my={10}>
          <Typography>Log in to </Typography>
          <Typography bold>FRS Account</Typography>
        </HStack>
        <Input placeholder="Username*" />
        <PasswordInput placeholder="Password*" />
        <Button>Login</Button>
        <Divider />
        <TouchableOpacity>
          <Typography>Forgot your Password?</Typography>
        </TouchableOpacity>
      </VStack>
    </ScreenLayout>
  );
}
