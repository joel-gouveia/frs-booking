import React from "react";
import { ICustomButtonLabel, IFooterButton } from "src/types/interfaces/footer";
import { EmptyButton } from "./CustomButtons/EmptyButton";
import { GenericFooterButton } from "./GenericFooterButton";
import { MainMenuButton } from "./CustomButtons/MainMenuButton";

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
