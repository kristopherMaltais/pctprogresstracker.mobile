import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface EditWrapperProps {
  borderSize: number;
  children: React.ReactNode;
  canScale?: boolean;
  canRotate?: boolean;
  canTranslate?: boolean;
}

export const editWrapperPanRef = useRef<GestureType>(undefined);

export const GestureWrapper: React.FC<EditWrapperProps> = ({
  children,
  borderSize,
  canScale = true,
  canRotate = true,
  canTranslate = true,
}) => {
  const { selectedHike, distanceHiked, selectedHikeTotalDistance } =
    useUserChoices();

  const triggerVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

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
    borderWidth: borderSize,
    borderColor: isDragging.value ? "#FC5200" : "transparent",
  }));

  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .onStart(() => {
      runOnJS(triggerVibration)();
      isDragging.value = true;
    });

  const tapGesture = Gesture.Tap().onStart(() => {
    isDragging.value = false;
  });

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      if (isDragging.value && canTranslate) {
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
    .withRef(editWrapperPanRef);

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      if (isDragging.value && canScale) {
        scale.value = scaleOffset.value * e.scale;
      }
    })
    .onEnd(() => {
      if (isDragging.value) {
        // Optional: smooth finish
        scale.value = withTiming(scale.value, { duration: 150 });
      }
    });

  const rotationGesture = Gesture.Rotation()
    .onUpdate((e) => {
      if (isDragging.value && canRotate) {
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
      <Animated.View style={animatedStickerStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
