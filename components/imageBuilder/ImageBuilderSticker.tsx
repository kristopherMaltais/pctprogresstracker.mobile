import { usePremium } from "@/contexts/premium/PremiumContextProvider";
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
import { ModalPremium } from "../premium/ModalPremium";
import { PremiumButton } from "../premium/PremiumButton";
import { UserSettings } from "../userSettings/UserSettings";

type ImageBuilderStickerProps = {
  children: React.ReactNode;
};

export const imageBuilderStickerPanRef = {
  current: null as GestureType | null,
};

export const ImageBuilderSticker: React.FC<ImageBuilderStickerProps> = ({
  children,
}) => {
  const { backgroundImage, isStickerSelectedPremium } = useUserChoices();
  const {
    isPremiumUnlocked,
    isPremiumModalVisible,
    setIsPremiumModalVisible,
    buyPremiumSticker,
  } = usePremium();
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
    .withRef(imageBuilderStickerPanRef);

  // Pinch gesture
  const pinchGesture = Gesture.Pinch()
    .onBegin(() => {
      scaleOffset.value = scale.value;
    })
    .onUpdate((e) => {
      if (isDragging.value) {
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

  const [shotWidth, setShotWidth] = React.useState(0);
  const [shotHeight, setShotHeight] = React.useState(0);

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={{ height: "90%" }}>
        <UserSettings
          disabled={isStickerSelectedPremium && !isPremiumUnlocked}
        />
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
          <Animated.View style={[styles.container, animatedContainerStyle]}>
            <Animated.Image
              source={{ uri: backgroundImage }}
              style={[styles.backgroundImage, animatedStyle]}
            />
            {children}
          </Animated.View>
        </ViewShot>
        <ModalPremium
          onConfirm={buyPremiumSticker}
          onCancel={() => setIsPremiumModalVisible(false)}
          isVisible={isPremiumModalVisible}
        />
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
  },
  backgroundImage: {
    width: "100%",
    height: "100%",
    position: "absolute",
    resizeMode: "cover",
  },
});
