import React from "react";
import {
  ScrollView as RNScrollView,
  View,
  ScrollViewProps,
  StyleProp,
  ViewStyle,
} from "react-native";

import { useCustomScrollHandler } from "@hooks/useCustomScrollHandler";
import { scrollViewDefaultStyles } from "./styles";
import { CustomScrollableProps } from "./CustomScrollableProps";
import { ScrollIndicator } from "./ScrollIndicator";

interface Props extends CustomScrollableProps, Omit<ScrollViewProps, "style"> {
  /**
   * Styles applied to the scrollView component.
   */
  scrollViewStyle?: StyleProp<ViewStyle>;
}

export function ScrollView({
  scrollViewStyle,
  wrapperViewContainerStyle,
  shouldIndicatorHide = false,
  hideTimeout = 500,
  indicatorHeight = 100,
  flexibleIndicator = true,
  scrollIndicatorContainerStyle,
  scrollIndicatorStyle,
  ...restScrollViewProps
}: Props) {
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
      <RNScrollView
        style={scrollViewStyle}
        onContentSizeChange={onContentSizeChange}
        onLayout={onLayout}
        onScroll={onScroll}
        scrollEventThrottle={1}
        onMomentumScrollEnd={onMomentumScrollEnd}
        onScrollBeginDrag={onScrollBeginDrag}
        showsVerticalScrollIndicator={false}
        {...restScrollViewProps}
      />

      <ScrollIndicator
        fromTop={fromTop}
        fadeAnimation={fadeAnimation}
        isVisible={!isContentSmallerThanScrollView}
        onLayoutContainerScroll={onLayoutContainerScroll}
        indicatorFlexibleHeight={indicatorFlexibleHeight}
        indicatorContainerStyles={[
          scrollViewDefaultStyles.scrollIndicatorContainer,
          scrollIndicatorContainerStyle,
        ]}
        indicatorStyles={[scrollViewDefaultStyles.scrollIndicator, scrollIndicatorStyle]}
      />
    </View>
  );
}
