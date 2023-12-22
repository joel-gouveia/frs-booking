import React from "react";
import { StyleSheet, View, ViewProps } from "react-native";
import { ShortcutProps, defaultShortcuts } from "@styles/shortcuts";

interface DividerProps extends ViewProps, ShortcutProps {}

export function Divider(props: DividerProps) {
  const { style, children, ...restProps } = props;

  return (
    <View style={[styles.divider, defaultShortcuts(props), style]} {...restProps}>
      {children}
    </View>
  );
}

Divider.defaultProps = {
  w: "100%",
  h: 1,
};

const styles = StyleSheet.create({
  divider: {
    // TODO: Will come from design system once there is one
    backgroundColor: "lightgray",
  },
});
