import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect, useRef } from "react";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";

interface EditWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const editWrapperPanRef = useRef<GestureType>(undefined);

export const GestureWrapper: React.FC<EditWrapperProps> = ({
  children,
  disabled = false,
}) => {
  const { selectedHike, distanceHiked, selectedHikeTotalDistance } =
    useUserChoices();

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
  }));

  const panGesture = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = offsetX.value + e.translationX;
      translateY.value = offsetY.value + e.translationY;
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
      isDragging.value = false;
    })
    .withRef(editWrapperPanRef);

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      if (!disabled) {
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
      if (!disabled) {
        rotation.value = rotationOffset.value + e.rotation;
      }
    })
    .onEnd(() => {
      rotationOffset.value = rotation.value;
    });

  const composedGesture = Gesture.Simultaneous(
    panGesture,
    pinchGesture,
    rotationGesture
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <Animated.View style={animatedStickerStyle}>{children}</Animated.View>
    </GestureDetector>
  );
};
