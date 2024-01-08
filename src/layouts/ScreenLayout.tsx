import React, { PropsWithChildren } from "react";
import { VStack } from "@components/index";
import { StyleSheet } from "react-native";
import { theme } from "src/theme/theme";
import { ScreenLayoutHeader } from "./ScreenLayoutHeader";

interface Props extends PropsWithChildren {
  headerProps?: {
    title: string;
    subtitles?: string[];
    icon?: JSX.Element;
  };
}

export function ScreenLayout(props: Props) {
  return (
    <VStack flex={1} p={22} style={styles.container}>
      {props.headerProps && <ScreenLayoutHeader {...props.headerProps} />}
      {props.children}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: theme.colors.background,
    paddingBottom: theme.sizes.footerHeight,
  },
});
