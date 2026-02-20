import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type SliderProps = {
  onChange: (newValue: number) => void;
};

const CONTAINER_HEIGHT = Dimensions.get("window").height * 0.4;

export const Slider: React.FC<SliderProps> = ({ onChange }) => {
  const { theme } = useTheme();

  const pathDistanceHiked = useUserSettingsStore((s) => s.location.pathLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  const fillHeight = useSharedValue(0);
  const contextY = useSharedValue(0);

  useEffect(() => {
    if (selectedHikeTotalDistance > 0) {
      const percentage = pathDistanceHiked / selectedHikeTotalDistance;
      fillHeight.value = withTiming(percentage * CONTAINER_HEIGHT);
    }
  }, [pathDistanceHiked, selectedHikeTotalDistance]);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = fillHeight.value;
    })
    .onUpdate((event) => {
      let newHeight = contextY.value - event.translationY;

      newHeight = Math.max(0, Math.min(newHeight, CONTAINER_HEIGHT));
      fillHeight.value = newHeight;

      if (selectedHikeTotalDistance > 0) {
        const newValue = (newHeight * selectedHikeTotalDistance) / CONTAINER_HEIGHT;
        runOnJS(onChange)(newValue);
      }
    });

  const animatedFillStyle = useAnimatedStyle(() => {
    return {
      height: fillHeight.value,
      backgroundColor: theme.primary || "#FFD700",
    };
  });

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles(theme).container}>
        {/* Le fond du slider */}
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
