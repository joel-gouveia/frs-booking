import React from "react";
import FlexWaysLogo from "@assets/images/logo.svg";
import { theme } from "src/theme/theme";

export function HeaderLogo() {
  return <FlexWaysLogo width={100} height={40} fill={theme.colors.primary} />;
}
