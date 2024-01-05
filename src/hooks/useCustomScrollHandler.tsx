import { useState, useEffect, useMemo } from "react";
import { CustomScrollableProps } from "@components/CustomScrollable/CustomScrollableProps";
import { Animated, LayoutChangeEvent, NativeSyntheticEvent, NativeScrollEvent } from "react-native";

interface Props extends CustomScrollableProps {}

export function useCustomScrollHandler({
  shouldIndicatorHide = false,
  hideTimeout = 500,
  indicatorHeight = 100,
  flexibleIndicator = true,
}: Props) {
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

  return {
    fadeAnimation,
    fromTop,
    indicatorFlexibleHeight,
    visibleScrollPartHeight,
    fullSizeContentHeight,
    isIndicatorHidden,
    scrollIndicatorContainerHeight,
    /**
     * If the content is smaller than the scrollable component, no scrollbar should be shown.
     */
    isContentSmallerThanScrollView,
    onLayout,
    onLayoutContainerScroll,
    onScroll,
    onContentSizeChange,
    onMomentumScrollEnd,
    onScrollBeginDrag,
    runHideTimer,
    showIndicator,
  };
}
