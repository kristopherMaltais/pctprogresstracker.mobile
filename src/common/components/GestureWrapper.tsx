import React from "react";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface EditWrapperProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const GestureWrapper: React.FC<EditWrapperProps> = ({
  children,
  disabled = false,
}) => {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);
  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);
  const rotation = useSharedValue(0);
  const rotationOffset = useSharedValue(0);
  const isDragging = useSharedValue(false);

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
    });

  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      if (!disabled) {
        scale.value = scaleOffset.value * e.scale;
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
