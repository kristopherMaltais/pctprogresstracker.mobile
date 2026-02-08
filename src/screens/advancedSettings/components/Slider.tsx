import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { useCallback, useState } from "react";
import { LayoutChangeEvent, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type SliderProps = {
  onChange: (newValue: number) => void;
  maximum: number;
};

export const Slider: React.FC<SliderProps> = ({ onChange, maximum }) => {
  const { theme } = useTheme();
  const pathLocation = useUserSettingsStore((s) => s.location.pathLocation);

  const [layoutWidth, setLayoutWidth] = useState<number>(0);
  const fillWidth = useSharedValue(0);
  const contextX = useSharedValue(0);

  const updateWidth = useCallback(() => {
    if (layoutWidth > 0) {
      fillWidth.value = (pathLocation * layoutWidth) / maximum;
    }
  }, [layoutWidth, pathLocation, maximum]);

  // On lance l'update dès qu'on a les infos
  React.useEffect(() => {
    updateWidth();
  }, [updateWidth]);

  const onLayout = (event: LayoutChangeEvent) => {
    const { width } = event.nativeEvent.layout;
    if (width > 0 && width !== layoutWidth) {
      setLayoutWidth(width);
    }
  };

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextX.value = fillWidth.value;
    })
    .onUpdate((event) => {
      if (layoutWidth === 0) return;

      let newWidth = contextX.value + event.translationX;
      newWidth = Math.max(0, Math.min(newWidth, layoutWidth));
      fillWidth.value = newWidth;
      const newValue = (newWidth * maximum) / layoutWidth;
      runOnJS(onChange)(newValue);
    });

  const animatedFillStyle = useAnimatedStyle(() => ({
    width: fillWidth.value,
    backgroundColor: theme.primary || "#FFD700",
  }));

  return (
    <GestureDetector gesture={panGesture}>
      <View style={styles(theme).container} onLayout={onLayout}>
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
