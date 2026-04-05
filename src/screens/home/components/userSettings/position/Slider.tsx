import { useCalibrationContext } from "@/src/contexts/calibration/CalibrationContext";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type SliderProps = {
  maximum: number;
  value: number;
};

const CONTAINER_HEIGHT = Dimensions.get("window").height * 0.4;

export const Slider: React.FC<SliderProps> = ({ maximum, value }) => {
  const { theme } = useTheme();
  const { calibrationProgress, isRoundtrip, halfTotalDistance, onSliderChange } = useCalibrationContext();

  const [layoutHeight, setLayoutHeight] = useState(0);

  const fillHeight = useSharedValue(0);
  const contextY = useSharedValue(0);
  const latestValue = useSharedValue(0);

  const valueRef = useRef(value);
  valueRef.current = value;

  useEffect(() => {
    if (layoutHeight === 0) return;
    const clamped = Math.max(0, Math.min(valueRef.current, maximum));
    fillHeight.value = (clamped / maximum) * layoutHeight;
  }, [layoutHeight, maximum]);

  const panGesture = Gesture.Pan()
    .activeOffsetY([-10, 10])
    .failOffsetX([-5, 5])
    .onStart(() => {
      contextY.value = fillHeight.value;
    })
    .onUpdate((event) => {
      if (layoutHeight === 0) return;

      let newHeight = contextY.value - event.translationY;
      newHeight = Math.max(0, Math.min(newHeight, layoutHeight));

      fillHeight.value = newHeight;

      const newValue = (newHeight / layoutHeight) * maximum;
      latestValue.value = newValue;

      const adjusted =
        isRoundtrip.value && newValue > halfTotalDistance.value
          ? newValue - halfTotalDistance.value
          : newValue;
      calibrationProgress.value = adjusted;
    })
    .onEnd(() => {
      runOnJS(onSliderChange)(latestValue.value);
    });

  const animatedFillStyle = useAnimatedStyle(() => ({
    height: fillHeight.value,
    backgroundColor: theme.primary || "#FFD700",
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles(theme).container} onLayout={(e) => setLayoutHeight(e.nativeEvent.layout.height)}>
        <Animated.View style={[styles(theme).filler, animatedFillStyle]} />
      </View>
    </GestureDetector>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: CONTAINER_HEIGHT,
      width: 40,
      borderRadius: 12,
      backgroundColor: theme.secondaryBackground,
      borderWidth: 2,
      borderColor: theme.primary,
      margin: 10,
      overflow: "hidden",
      alignSelf: "center",
    },
    filler: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
  });
