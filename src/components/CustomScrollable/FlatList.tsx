import React from "react";
import { FlatList as RNFlatList, View, FlatListProps, StyleProp, ViewStyle } from "react-native";

import { useCustomScrollHandler } from "@hooks/useCustomScrollHandler";
import { flatListDefaultStyles } from "./styles";
import { CustomScrollableProps } from "./CustomScrollableProps";
import { ScrollIndicator } from "./ScrollIndicator";

interface Props<T> extends CustomScrollableProps, Omit<FlatListProps<T>, "style"> {
  /**
   * Styles applied to the flatlist component.
   */
  flatListStyle?: StyleProp<ViewStyle>;
}

export function FlatList<T>({
  flatListStyle,
  wrapperViewContainerStyle,
  shouldIndicatorHide = false,
  hideTimeout = 500,
  indicatorHeight = 100,
  flexibleIndicator = true,
  scrollIndicatorContainerStyle,
  scrollIndicatorStyle,
  ...restFlatListProps
}: Props<T>) {
  const {
    fadeAnimation,
    fromTop,
    indicatorFlexibleHeight,
    isContentSmallerThanScrollView,
    onLayout,
    onLayoutContainerScroll,
    onScroll,
    onContentSizeChange,
    onMomentumScrollEnd,
    onScrollBeginDrag,
  } = useCustomScrollHandler({
    shouldIndicatorHide,
    hideTimeout,
    indicatorHeight,
    flexibleIndicator,
  });

  return (
    <View style={wrapperViewContainerStyle}>
      <RNFlatList
        style={flatListStyle}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={onScroll}
        scrollEventThrottle={1}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        showsVerticalScrollIndicator={false}
        {...restFlatListProps}
      />
      <ScrollIndicator
        fromTop={fromTop}
        fadeAnimation={fadeAnimation}
        isVisible={!isContentSmallerThanScrollView}
        onLayoutContainerScroll={onLayoutContainerScroll}
        indicatorFlexibleHeight={indicatorFlexibleHeight}
        indicatorContainerStyles={[
          flatListDefaultStyles.scrollIndicatorContainer,
          scrollIndicatorContainerStyle,
        ]}
        indicatorStyles={[flatListDefaultStyles.scrollIndicator, scrollIndicatorStyle]}
      />
    </View>
  );
}
