import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

type ProgressBarProps = {
  percentage: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({ percentage }) => {
  const widthPercentage = Math.max(0, Math.min(100, percentage));

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
    <View style={styles.container}>
      <Animated.View style={[styles.filledBar, barStyle]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 20,
    borderWidth: 1,
    borderColor: "#FC5200",
    overflow: "hidden",
  },
  filledBar: {
    height: "100%",
    backgroundColor: "#FC5200",
  },
});
