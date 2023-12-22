import React, { useRef } from "react";
import { Animated, StyleSheet } from "react-native";

interface IFloatingLabel {
  label: string;
  isFloat: boolean;
}

export function FloatingLabel({ label, isFloat }: IFloatingLabel) {
  const animatedIsFocused = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    Animated.timing(animatedIsFocused, {
      toValue: isFloat ? 1 : 0,
      duration: 150,
      useNativeDriver: false,
    }).start();
  }, [isFloat, animatedIsFocused]);

  const labelAnimatedStyle = {
    top: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [6, -10],
    }),
    fontSize: animatedIsFocused.interpolate({
      inputRange: [0, 1],
      outputRange: [16, 12],
    }),
  };

  return <Animated.Text style={[styles.label, labelAnimatedStyle]}>{label}</Animated.Text>;
}

const styles = StyleSheet.create({
  label: {
    position: "absolute",
    left: 4,
    color: "white",
  },
});
