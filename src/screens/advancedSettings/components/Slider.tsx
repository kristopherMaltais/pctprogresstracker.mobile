import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useEffect, useState } from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type SliderProps = {
  onChange: (newValue: number) => void;
  maximum: number;
  value: number;
};

export const Slider: React.FC<SliderProps> = ({ onChange, maximum, value }) => {
  const { theme } = useTheme();

  const [layoutWidth, setLayoutWidth] = useState(0);

  // Shared values
  const fillWidth = useSharedValue(0);
  const contextX = useSharedValue(0);

  // Sync value -> pixel width
  useEffect(() => {
    if (layoutWidth === 0) return;

    const clamped = Math.max(0, Math.min(value, maximum));
    fillWidth.value = (clamped / maximum) * layoutWidth;
  }, [value, maximum, layoutWidth]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = fillWidth.value;
    })
    .onUpdate((event) => {
      if (layoutWidth === 0) return;

      let newWidth = contextX.value + event.translationX;
      newWidth = Math.max(0, Math.min(newWidth, layoutWidth));

      fillWidth.value = newWidth;

      const newValue = (newWidth / layoutWidth) * maximum;
      runOnJS(onChange)(newValue);
    });

  // Cache color for Reanimated stability
  const primaryColor = theme.primary || "#FFD700";

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
    backgroundColor: primaryColor,
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles(theme).container} onLayout={(e) => setLayoutWidth(e.nativeEvent.layout.width)}>
        <Animated.View style={[styles(theme).filler, animatedFillStyle]} />
      </View>
    </GestureDetector>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 40,
      borderRadius: 12,
      backgroundColor: theme.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.primary,
      marginVertical: 10,
      overflow: "hidden",
      position: "relative",
    },
    filler: {
      position: "absolute",
      left: 0,
      height: "100%",
    },
  });
