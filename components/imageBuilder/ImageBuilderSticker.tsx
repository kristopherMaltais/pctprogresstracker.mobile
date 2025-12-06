import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import React, { useEffect, useRef } from "react";
import { StyleSheet, View } from "react-native";
import {
  Gesture,
  GestureDetector,
  GestureType,
} from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated";
import ViewShot from "react-native-view-shot";
import { PremiumButton } from "../premium/PremiumButton";

type ImageBuilderStickerProps = {
  children: React.ReactNode;
};

export const imageBuilderStickerPanRef = {
  current: undefined as GestureType | undefined,
};

export const ImageBuilderSticker: React.FC<ImageBuilderStickerProps> = ({
  children,
}) => {
  const { backgroundImage, isStickerSelectedPremium } = useUserChoices();
  const { isPremiumUnlocked } = usePremium();
  const { setViewShot } = useViewShot();

  const viewShotRef = useRef<ViewShot>(null);

  useEffect(() => {
    if (viewShotRef.current) {
      setViewShot(viewShotRef.current);
    }
  }, [viewShotRef]);

  // Pan offsets
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  // Scale
  const scale = useSharedValue(1);
  const scaleOffset = useSharedValue(1);

  // Animated style
  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
      { scale: scale.value },
    ],
  }));

  // Pan gesture
  const panGesture = Gesture.Pan()
    .minPointers(2)
    .onUpdate((e) => {
      translateX.value = offsetX.value + e.translationX;
      translateY.value = offsetY.value + e.translationY;
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      scale.value = scaleOffset.value * e.scale;
    })
    .onEnd(() => {
      if (scale.value < 1) scale.value = withSpring(1);
      if (scale.value > 3) scale.value = withSpring(3);
    });

  const composedGesture = Gesture.Simultaneous(
    Gesture.Simultaneous(panGesture, pinchGesture)
  );

  const [shotWidth, setShotWidth] = React.useState(0);
  const [shotHeight, setShotHeight] = React.useState(0);

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={{ height: "90%" }}>
        {isStickerSelectedPremium && !isPremiumUnlocked && <PremiumButton />}
        <ViewShot
          options={{
            format: "png",
            quality: 1,
            result: "tmpfile",
            width: shotWidth * 3,
            height: shotHeight * 3,
          }}
          ref={viewShotRef}
          onLayout={(event) => {
            const { width, height } = event.nativeEvent.layout;
            setShotWidth(width);
            setShotHeight(height);
          }}
        >
          <Animated.View style={styles.container}>
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
    backgroundColor: "#E0E0E0",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 5,
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
});
