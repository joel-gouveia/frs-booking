import React from "react";
import { View, Animated, StyleProp, ViewStyle, LayoutChangeEvent } from "react-native";

interface Props {
  isVisible: boolean;
  fromTop: number;
  indicatorFlexibleHeight: number;
  fadeAnimation: Animated.Value;
  onLayoutContainerScroll: (event: LayoutChangeEvent) => void;
  indicatorContainerStyles: StyleProp<ViewStyle>[];
  indicatorStyles: StyleProp<ViewStyle>[];
}

export function ScrollIndicator(props: Props) {
  if (!props.isVisible) return null;

  return (
    <Animated.View
      onLayout={props.onLayoutContainerScroll}
      style={[{ opacity: props.fadeAnimation }, ...props.indicatorContainerStyles]}>
      <View
        style={[
          { top: props.fromTop, height: props.indicatorFlexibleHeight },
          ...props.indicatorStyles,
        ]}
      />
    </Animated.View>
  );
}
