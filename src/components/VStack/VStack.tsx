import React from "react";
import { Stack, StackProps } from "@components/Stack/Stack";

interface Props extends StackProps {}

export function VStack(props: Props) {
  return (
    <Stack {...props} direction="column">
      {props.children}
    </Stack>
  );
}
