import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, { Easing, useAnimatedStyle, useSharedValue, withTiming } from "react-native-reanimated";

type ProgressBarProps = {
  percentage: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const widthPercentage = Math.max(0, Math.min(100, percentage));
  const { theme } = useTheme();

  const animatedWidth = useSharedValue(0);

  useEffect(() => {
    animatedWidth.value = withTiming(widthPercentage, {
      duration: 2000,
      easing: Easing.out(Easing.quad),
    });
  }, [widthPercentage, animatedWidth]);

  const barStyle = useAnimatedStyle(() => {
    return {
      width: `${animatedWidth.value}%`,
    };
  });

  return (
    <View style={styles(theme).container}>
      <Animated.View style={[styles(theme).filledBar, barStyle]} />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: "100%",
      height: 20,
      borderWidth: 1,
      borderColor: theme.pathColored,
      overflow: "hidden",
    },
    filledBar: {
      height: "100%",
      backgroundColor: theme.pathColored,
    },
  });
