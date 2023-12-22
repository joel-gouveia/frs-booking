import React, { useState, useEffect, useMemo } from "react";
import {
  FlatList,
  View,
  StyleSheet,
  Animated,
  FlatListProps,
  StyleProp,
  ViewStyle,
  LayoutChangeEvent,
  NativeSyntheticEvent,
  NativeScrollEvent,
} from "react-native";
import { theme } from "src/theme/theme";

interface Props<T> extends Omit<FlatListProps<T>, "style"> {
  /**
   * Styles applied to the view container.
   */
  wrapperViewContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Styles applied to the flatlist component.
   */
  flatListStyle?: StyleProp<ViewStyle>;

  /**
   * Whether the indicator should hide after a timeout
   * @default false
   */
  shouldIndicatorHide?: boolean;

  /**
   * Timeout to hide the indicator
   * @default 500
   */
  hideTimeout?: number;

  /**
   * Height of the indicator
   * @default 100
   */
  indicatorHeight?: number;

  /**
   * Whether the indicator should be flexible
   * @default true
   */
  flexibleIndicator?: boolean;

  /**
   * Styles applied to the scroll indicator container.
   */
  scrollIndicatorContainerStyle?: StyleProp<ViewStyle>;

  /**
   * Styles applied to the scroll indicator.
   */
  scrollIndicatorStyle?: StyleProp<ViewStyle>;
}

export function FlatListCustomScrollbar<T>({
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
  const [fadeAnimation] = useState(new Animated.Value(shouldIndicatorHide ? 0 : 1));
  const [fromTop, setFromTop] = useState(0);

  const [indicatorFlexibleHeight, setIndicatorFlexibleHeight] = useState(indicatorHeight);
  const [visibleScrollPartHeight, setVisibleScrollPartHeight] = useState(1);

  const [fullSizeContentHeight, setFullSizeContentHeight] = useState(1);
  const [isIndicatorHidden, setIsIndicatorHidden] = useState(shouldIndicatorHide);

  const [scrollIndicatorContainerHeight, setScrollIndicatorContainerHeight] = useState(1);

  useEffect(() => {
    if (shouldIndicatorHide) {
      Animated.timing(fadeAnimation, {
        toValue: isIndicatorHidden ? 0 : 1,
        duration: hideTimeout,
        useNativeDriver: true,
      }).start();
    }
  }, [fadeAnimation, hideTimeout, isIndicatorHidden, shouldIndicatorHide]);

  useEffect(() => {
    if (flexibleIndicator) {
      setIndicatorFlexibleHeight(
        visibleScrollPartHeight * (visibleScrollPartHeight / fullSizeContentHeight),
      );
    }
  }, [visibleScrollPartHeight, fullSizeContentHeight, flexibleIndicator]);

  /**
   * If the flatList content is smaller than the scrollview, we don't need any scrollbar
   */
  const isContentSmallerThanScrollView = useMemo(() => {
    return fullSizeContentHeight - visibleScrollPartHeight <= 0;
  }, [fullSizeContentHeight, visibleScrollPartHeight]);

  const onLayout = (event: LayoutChangeEvent) => {
    setVisibleScrollPartHeight(event.nativeEvent.layout.height);
  };

  const onLayoutContainerScroll = (event: LayoutChangeEvent) =>
    setScrollIndicatorContainerHeight(event.nativeEvent.layout.height);

  const onScroll = ({ nativeEvent }: NativeSyntheticEvent<NativeScrollEvent>) => {
    const { contentOffset } = nativeEvent;
    const movePercent = contentOffset.y / (fullSizeContentHeight - visibleScrollPartHeight);
    const position = (scrollIndicatorContainerHeight - indicatorFlexibleHeight) * movePercent;
    setFromTop(position);
  };

  const onContentSizeChange = (width: number, height: number) => {
    if (height) setFullSizeContentHeight(height);
  };

  const onMomentumScrollEnd = () => runHideTimer();

  const onScrollBeginDrag = () => showIndicator();

  const runHideTimer = () => shouldIndicatorHide && setIsIndicatorHidden(true);

  const showIndicator = () => shouldIndicatorHide && setIsIndicatorHidden(false);

  return (
    <View style={wrapperViewContainerStyle}>
      <FlatList
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

      {!isContentSmallerThanScrollView && (
        <Animated.View
          onLayout={onLayoutContainerScroll}
          style={[
            defaultStyles.scrollIndicatorContainer,
            { opacity: fadeAnimation },
            scrollIndicatorContainerStyle,
          ]}>
          <View
            style={[
              defaultStyles.scrollIndicator,
              { top: fromTop, height: indicatorFlexibleHeight },
              scrollIndicatorStyle,
            ]}
          />
        </Animated.View>
      )}
    </View>
  );
}

const defaultStyles = StyleSheet.create({
  scrollIndicatorContainer: {
    position: "absolute",
    top: 0,
    bottom: 0,
    right: -10,
    overflow: "hidden",
    width: 5,
    borderRadius: 100,
    backgroundColor: theme.colors.border,
  },
  scrollIndicator: {
    position: "absolute",
    right: 0,
    width: 5,
    borderRadius: 100,
    opacity: 1,
    backgroundColor: theme.colors.primary.main,
  },
});
