import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue } from "react-native-reanimated";

type SliderProps = {
  onChange: (newValue: number) => void;
};

const CONTAINER_HEIGHT = Dimensions.get("window").height * 0.4;

export const Slider: React.FC<SliderProps> = ({ onChange }) => {
  const { theme } = useTheme();

  const pathDistanceHiked = useUserSettingsStore((s) => s.location.pathLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  const fillHeight = useSharedValue((pathDistanceHiked * CONTAINER_HEIGHT) / selectedHikeTotalDistance);
  const contextY = useSharedValue(0);

  const panGesture = Gesture.Pan()
    .onStart(() => {
      contextY.value = fillHeight.value;
    })
    .onUpdate((event) => {
      let newHeight = contextY.value - event.translationY;

      newHeight = Math.max(0, Math.min(newHeight, CONTAINER_HEIGHT));
      fillHeight.value = newHeight;
      const newValue = (newHeight * selectedHikeTotalDistance) / CONTAINER_HEIGHT;

      runOnJS(onChange)(newValue / selectedHikeTotalDistance);
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
        <Animated.View style={[styles(theme).filler, animatedFillStyle]} />
      </View>
    </GestureDetector>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      height: CONTAINER_HEIGHT,
      borderRadius: 8,
      backgroundColor: theme.secondaryBackground,
      borderWidth: 1,
      borderColor: theme.primary,
      margin: 6,
      overflow: "hidden",
      position: "relative",
    },
    filler: {
      position: "absolute",
      bottom: 0,
      width: "100%",
    },
  });
