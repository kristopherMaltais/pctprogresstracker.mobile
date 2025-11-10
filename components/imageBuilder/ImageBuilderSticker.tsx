import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  runOnJS,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ViewShot from "react-native-view-shot";
import { UserSettings } from "../userSettings/UserSettings";

type ImageBuilderStickerProps = {
  children: React.ReactNode;
  canTranslate?: boolean;
  canScale?: boolean;
};

export const imageBuilderStickerPanRef = {
  current: null as GestureType | null,
};

export const ImageBuilderSticker: React.FC<ImageBuilderStickerProps> = ({
  children,
  canTranslate = true,
  canScale = true,
}) => {
  const { backgroundImage } = useUserChoices();
  const { setViewShot } = useViewShot();

  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    if (viewShotRef.current) {
      setViewShot(viewShotRef.current);
    }
  }, [viewShotRef]);

  const triggerVibration = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
  };

  // Pan offsets
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Scale
  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);

  const isDragging = useSharedValue(false);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  const animatedContainerStyle = useAnimatedStyle(() => ({
    borderColor: isDragging.value ? "#FC5200" : "transparent",
    borderWidth: isDragging.value ? 2 : 0,
  }));

  const tapGesture = Gesture.Tap().onStart(() => {
    isDragging.value = false;
  });

  // Long press gesture
  const longPressGesture = Gesture.LongPress()
    .minDuration(150)
    .onStart(() => {
      runOnJS(triggerVibration)();
      isDragging.value = true;
    });

  // Pan gesture
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
    .withRef(imageBuilderStickerPanRef);

  // Pinch gesture
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
        if (scale.value < 1) scale.value = withSpring(1);
        if (scale.value > 3) scale.value = withSpring(3);
      }
    });

  const composedGesture = Gesture.Simultaneous(
    longPressGesture,
    Gesture.Simultaneous(panGesture, pinchGesture, tapGesture)
  );

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={{ position: "relative", height: "90%" }}>
        <UserSettings />
        <ViewShot ref={viewShotRef} style={styles.viewShot}>
          <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Animated.Image
              source={{ uri: backgroundImage }}
              style={[styles.backgroundImage, animatedStyle]}
            />
            {children}
          </Animated.View>
        </ViewShot>
      </View>
    </GestureDetector>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "100%",
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
  viewShot: {
    height: "100%",
    overflow: "hidden",
    backgroundColor: "red",
  },
});
