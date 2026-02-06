import { PremiumButton } from "@/src/common/components/premium/PremiumButton";
import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { StyleSheet, View } from "react-native";
import { Gesture, GestureDetector, GestureType } from "react-native-gesture-handler";
import Animated, { useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import ViewShot from "react-native-view-shot";

type ImageBuilderProps = {
  children: React.ReactNode;
};

export const imageBuilderPanRef = {
  current: undefined as GestureType | undefined,
};

export const ImageBuilder: React.FC<ImageBuilderProps> = ({ children }) => {
  const { backgroundImage, isStickerSelectedPremium, selectedHike } = useUserChoices();
  const { isPremiumUnlocked } = usePremium();
  const { setViewShot } = useViewShot();
  const { theme, isDarkMode } = useTheme();

  const viewShotCallbackRef = React.useCallback(
    (node: ViewShot | null) => {
      if (node !== null) {
        console.log("ViewShot est prêt et enregistré dans le contexte !");
        setViewShot(node);
      }
    },
    [setViewShot]
  );

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
    transform: [{ translateX: translateX.value }, { translateY: translateY.value }, { scale: scale.value }],
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

  const composedGesture = Gesture.Simultaneous(Gesture.Simultaneous(panGesture, pinchGesture));

  return (
    <GestureDetector gesture={composedGesture}>
      <View style={{ height: "90%" }}>
        {selectedHike && (
          <>
            {isStickerSelectedPremium && !isPremiumUnlocked && <PremiumButton />}

            <ViewShot
              options={{
                format: "png",
                quality: 1,
              }}
              ref={viewShotCallbackRef}
            >
              <Animated.View
                style={{
                  ...styles().container,
                  backgroundColor: isDarkMode ? theme.background : "#E0E0E0",
                }}
              >
                <Animated.Image source={{ uri: backgroundImage }} style={[styles().backgroundImage, animatedStyle]} />
                {children}
              </Animated.View>
            </ViewShot>
          </>
        )}
      </View>
    </GestureDetector>
  );
};

const styles = () =>
  StyleSheet.create({
    container: {
      height: "100%",
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
