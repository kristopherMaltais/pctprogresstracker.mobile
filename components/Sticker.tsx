import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedProps,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

interface StickerProps {}

export const panRef = React.useRef<GestureType>(Gesture.Pan());

const AnimatedPath = Animated.createAnimatedComponent(Path);

const triggerVibration = () => {
  Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
};

export const Sticker: React.FC<StickerProps> = () => {
  // const panRef = usePanRef();

  const {
    selectedHike,
    distanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
  } = useUserChoices();

  const calculatePercentage = () =>
    (distanceHiked * 100) / selectedHike?.totalDistanceKilometer!;

  // Shared values

  const progress = useSharedValue(0);
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);
  const rotation = useSharedValue(0);
  const rotationOffset = useSharedValue(0);
  const isDragging = useSharedValue(false);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: selectedHike?.pathLength! - progress.value,
  }));

  const getMeasurementUnit = () => {
    return measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi";
  };

  useEffect(() => {
    const ratio = Math.max(
      0,
      Math.min(1, distanceHiked / selectedHikeTotalDistance)
    );
    progress.value = withTiming(ratio * selectedHike?.pathLength!, {
      duration: 2000,
    });
  }, [distanceHiked, selectedHikeTotalDistance]);

  const animatedStickerStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
      { rotateZ: `${rotation.value}rad` },
    ],
    opacity: isDragging.value ? 0.9 : 1,
    borderWidth: isDragging.value ? 1.5 : 0,
    borderColor: isDragging.value ? "#FC5200" : "transparent",
    borderRadius: 8,
  }));

  // LONG PRESS - temporary scale
  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .onStart(() => {
      runOnJS(triggerVibration)();
      isDragging.value = true;
    });

  const tapGesture = Gesture.Tap().onStart(() => {
    isDragging.value = false;
  });

  // PAN gesture
  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isDragging.value) {
        translateX.value = offsetX.value + e.translationX;
        translateY.value = offsetY.value + e.translationY;
      }
    })
    .onEnd(() => {
      if (isDragging.value) {
        offsetX.value = translateX.value;
        offsetY.value = translateY.value;
        isDragging.value = false;
      }
    })
    .withRef(panRef);

  // PINCH gesture - persist scale
  const pinchGesture = Gesture.Pinch()
    .onUpdate((e) => {
      if (isDragging.value) {
        scale.value = scaleOffset.value * e.scale;
      }
    })
    .onEnd(() => {
      if (isDragging.value) {
        scaleOffset.value = scale.value;
      }
    });

  // ROTATION gesture - persist rotation
  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      if (isDragging.value) {
        rotation.value = rotationOffset.value + e.rotation;
      }
    })
    .onEnd(() => {
      if (isDragging.value) {
        rotationOffset.value = rotation.value;
      }
    });

  const composedGesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    rotationGesture,
    longPressGesture,
    tapGesture
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={[styles.container, animatedStickerStyle]}>
        <Svg
          style={{ marginTop: 5 }}
          width={75}
          height={200}
          viewBox="0 0 223 962"
        >
          <Path
            d={selectedHike?.path}
            stroke="#BFBFBF"
            strokeWidth={30}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <AnimatedPath
            d={selectedHike?.path}
            stroke="#FC5200"
            strokeWidth={20}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeDasharray={selectedHike?.pathLength}
            animatedProps={animatedProps}
          />
        </Svg>

        <View style={styles.statsContainer}>
          <Image
            source={require("@/assets/images/pctNoBackground.png")}
            style={{ width: 75, height: 75 }}
          />
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit()}
          </Text>
          <Text style={styles.label}>Distance Hiked</Text>
          <Text style={styles.value}>
            {distanceHiked} {getMeasurementUnit()}
          </Text>
          <Text style={styles.percentage}>
            {Math.round(calculatePercentage())}%
          </Text>
        </View>
      </Animated.View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: 100,
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 10,
  },
  value: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  percentage: {
    marginTop: 18,
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
