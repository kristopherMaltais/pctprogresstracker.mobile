import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import * as Haptics from "expo-haptics";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { runOnJS, useAnimatedStyle, useSharedValue, withSpring } from "react-native-reanimated";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { StickerItem } from "./StickerItem";

const { width: SCREEN_WIDTH } = Dimensions.get("window");
const ITEM_SIZE = 70;
const ITEM_SPACING = 20;
const ACTIVE_SCALE = 1.2;

export const StickerSlider: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { stickers, currentIndex, setCurrentSticker, stickerCount } = useSticker();
  const { isPremiumUnlocked } = usePremium();
  const insets = useSafeAreaInsets();

  const translateX = useSharedValue(0);
  const contextX = useSharedValue(0);

  // Center the slider on the current index
  useEffect(() => {
    translateX.value = withSpring(-currentIndex * (ITEM_SIZE + ITEM_SPACING), {
      damping: 20,
      stiffness: 90,
    });
    contextX.value = -currentIndex * (ITEM_SIZE + ITEM_SPACING);
  }, [currentIndex]);

  // Trigger haptic feedback
  const triggerHaptic = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
  };

  const panGesture = Gesture.Pan()
    .onUpdate((event) => {
      translateX.value = contextX.value + event.translationX;
    })
    .onEnd((event) => {
      const velocity = event.velocityX;

      // Calculate the final position based on translation and velocity
      const finalTranslateX = translateX.value + velocity * 0.1;

      // Calculate which item should be centered based on the final position
      const targetIndex = Math.round(-finalTranslateX / (ITEM_SIZE + ITEM_SPACING));

      // Clamp the index to valid range
      const newIndex = Math.max(0, Math.min(stickerCount - 1, targetIndex));

      // Update the sticker based on direction
      if (newIndex < currentIndex) {
        const steps = currentIndex - newIndex;
        for (let i = 0; i < steps; i++) {
          runOnJS(setCurrentSticker)("left");
          runOnJS(triggerHaptic)();
        }
      } else if (newIndex > currentIndex) {
        const steps = newIndex - currentIndex;
        for (let i = 0; i < steps; i++) {
          runOnJS(setCurrentSticker)("right");
          runOnJS(triggerHaptic)();
        }
      }

      // Snap back to centered position
      translateX.value = withSpring(-newIndex * (ITEM_SIZE + ITEM_SPACING), {
        damping: 20,
        stiffness: 90,
      });
      contextX.value = -newIndex * (ITEM_SIZE + ITEM_SPACING);
    });

  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: translateX.value }],
    };
  });

  return (
    <View style={[styles(theme, isDarkMode).wrapper, { paddingBottom: Math.max(insets.bottom, 16) }]}>
      <GestureDetector gesture={panGesture}>
        <Animated.View style={[styles(theme, isDarkMode).sliderContainer, animatedContainerStyle]}>
          {stickers.map((sticker, index) => (
            <StickerItem
              key={index}
              index={index}
              currentIndex={currentIndex}
              translateX={translateX}
              isPremium={sticker.isPremium}
              isPremiumUnlocked={isPremiumUnlocked}
              name={sticker.name}
            />
          ))}
        </Animated.View>
      </GestureDetector>
    </View>
  );
};

const styles = (theme: any, isDarkMode: boolean) =>
  StyleSheet.create({
    wrapper: {
      height: ITEM_SIZE * ACTIVE_SCALE + 20,
      marginTop: 8,
      overflow: "visible",
    },
    sliderContainer: {
      flexDirection: "row",
      alignItems: "center",
      height: "100%",
      paddingLeft: SCREEN_WIDTH / 2 - ITEM_SIZE / 2 - 16,
      gap: ITEM_SPACING,
    },
  });
