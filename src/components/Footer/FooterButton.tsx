import React from "react";
import { EmptyButton } from "./CustomButtons/EmptyButton";
import { GenericFooterButton } from "./GenericFooterButton";
import { MainMenuButton } from "./CustomButtons/MainMenuButton";

export type ICustomButtonLabel = "empty" | "main-menu";

export interface IFooterButton {
  label: string;
  onPress: () => void;
}

const customButtonConfig: Record<ICustomButtonLabel, () => JSX.Element> = {
  empty: EmptyButton,
  "main-menu": MainMenuButton,
};

export function FooterButton({ button }: { button: IFooterButton | ICustomButtonLabel }) {
  const isCustom = typeof button === "string";
  if (isCustom) {
    const CustomButton = customButtonConfig[button];
    return <CustomButton />;
  }

  return <GenericFooterButton label={button.label} onPress={button.onPress} />;
}
