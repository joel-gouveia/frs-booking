import React from "react";

import { VStack } from "@components/index";
import { ScreenLayout } from "src/layouts/ScreenLayout";

export function MainMenuScreen() {
  return (
    <ScreenLayout>
      <VStack gap={20} alignItems="center" justifyContent="space-between" />
    </ScreenLayout>
  );
}
