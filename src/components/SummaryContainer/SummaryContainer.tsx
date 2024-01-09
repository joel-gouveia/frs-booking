import React, { PropsWithChildren } from "react";
import { StyleSheet, ListRenderItem } from "react-native";

import { theme } from "src/theme/theme";
import { CustomScrollableProps } from "@components/CustomScrollable/CustomScrollableProps";
import { Button } from "../Button/Button";
import { Typography } from "../Typography/Typography";
import { VStack } from "../VStack/VStack";
import { FlatList } from "../CustomScrollable/FlatList";
import { HStack } from "../HStack/HStack";

interface Props extends PropsWithChildren {
  /**
   * The props of the button displayed at the bottom of the container.
   * If this prop is not provided, the button will not be displayed.
   */
  buttonProps?: {
    onPress: () => void;
    title: string;
    iconElement: JSX.Element;
  };
  flatListData?: Array<{ title: string; content: JSX.Element }> | null;
  flatListRenderItem?: ListRenderItem<{ title: string; content: JSX.Element }> | null;
  flatListProps?: CustomScrollableProps;
}

export function SummaryContainer(props: Props) {
  const separator = () => <HStack mx={30} my={20} style={styles.separator} />;

  return (
    <VStack mt={20} px={20} py={20} style={styles.container}>
      <FlatList
        wrapperViewContainerStyle={[
          styles.wrapperViewContainerStyle,
          props?.flatListProps?.wrapperViewContainerStyle,
        ]}
        scrollIndicatorContainerStyle={[
          styles.scrollIndicatorContainerStyle,
          props?.flatListProps?.scrollIndicatorContainerStyle,
        ]}
        ItemSeparatorComponent={separator}
        data={props.flatListData}
        renderItem={props.flatListRenderItem}
      />
      {props.buttonProps && (
        <Button
          onPress={props.buttonProps.onPress}
          startIcon={props.buttonProps.iconElement}
          endIcon={props.buttonProps.iconElement}
          style={styles.button}>
          <Typography
            bold
            style={styles.buttonText}
            color={theme.colors.primary.contrastText}
            mx={12}>
            {props.buttonProps.title}
          </Typography>
        </Button>
      )}
    </VStack>
  );
}

const styles = StyleSheet.create({
  container: {
    position: "relative",
    borderRadius: 12,
    borderWidth: 2,
    borderColor: theme.colors.primary.main,
    maxHeight: 355,
  },
  wrapperViewContainerStyle: {
    height: 260,
    marginBottom: 10,
  },
  scrollIndicatorContainerStyle: {
    right: -4,
  },
  separator: { height: 1.5, backgroundColor: theme.colors.border },
  button: {
    paddingVertical: 10,
    borderRadius: 12,
  },
  buttonText: {
    fontSize: 18,
  },
});
