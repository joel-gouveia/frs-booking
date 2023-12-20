import React from "react";
import { StyleSheet, View } from "react-native";
import FlexWaysLogo from "@assets/images/logo.svg";
import { theme } from "src/theme/theme";
import Icon from "react-native-vector-icons/Ionicons";
import { HStack } from "..";

export function Header() {
  return (
    <View style={styles.container}>
      <HStack style={styles.containerInner} alignItems="center" justifyContent="space-between">
        <FlexWaysLogo width={90} height={30} color={theme.colors.primary} />
        <Icon name="menu" size={36} color={theme.colors.primary} />
      </HStack>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: "5%",
  },
  containerInner: {
    paddingHorizontal: 4,
    borderBottomWidth: 1,
    borderColor: "#D9D9FB",
    height: 46,
  },
});
