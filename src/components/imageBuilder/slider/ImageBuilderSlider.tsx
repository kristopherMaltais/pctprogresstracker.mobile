import { ModalPremium } from "@/src/components/premium/ModalPremium";
import { UserSettings } from "@/src/components/userSettings/UserSettings";
import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect, useState } from "react";
import { Dimensions, Platform, Pressable, StyleSheet } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { ImageBuilderPlaceholder } from "../ImageBuilderPlaceholder";
import { ImageBuilderSticker } from "../ImageBuilderSticker";
import { IndexIndicator } from "./IndexIndicator";
import { SliderButton } from "./SliderButton";

export const ImageBuilderSlider: React.FC = () => {
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const { selectedHike, setIsStickerSelectedPremium } = useUserChoices();
  const { isDarkMode } = useTheme();

  const { isPremiumModalVisible, setIsPremiumModalVisible, unlockPremium, isPremiumUnlocked } = usePremium();

  const { currentSticker, setCurrentSticker, stickerCount, currentIndex } = useSticker();

  const { height } = Dimensions.get("window");
  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsStickerSelectedPremium(currentSticker.isPremium);
  }, [currentSticker]);

  // Pan gesture
  const longPress = Gesture.LongPress()
    .onStart(() => {
      if (!currentSticker.isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(true);
      }
    })
    .onEnd(() => {
      if (!currentSticker.isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(false);
      }
    });

  const composedGesture = Gesture.Simultaneous(Gesture.Simultaneous(longPress));
  return (
    <Pressable
      onPress={() => setCloseMenu((prev) => !prev)}
      style={{
        ...styles.container,
        height: height * 0.8,
        shadowOpacity: isDarkMode ? 1 : 0.2,
      }}
    >
      {selectedHike ? (
        <GestureDetector gesture={composedGesture}>
          <ImageBuilderSticker>{currentSticker.sticker}</ImageBuilderSticker>
        </GestureDetector>
      ) : (
        <ImageBuilderPlaceholder />
      )}
      {selectedHike && (
        <>
          <UserSettings
            disabled={currentSticker.isPremium && !isPremiumUnlocked}
            hide={hideButtons}
            closeMenu={closeMenu}
          />
          <SliderButton direction="left" onPress={setCurrentSticker} hide={hideButtons} />
          <SliderButton direction="right" onPress={setCurrentSticker} hide={hideButtons} />
        </>
      )}

      {selectedHike && Platform.OS !== "android" && (
        <IndexIndicator indexCount={stickerCount} activeIndex={currentIndex} />
      )}
      <ModalPremium
        onConfirm={unlockPremium}
        onCancel={() => setIsPremiumModalVisible(false)}
        isVisible={isPremiumModalVisible}
      />
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: -16,
    width: "100%",
    shadowColor: "#000000BF",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    paddingHorizontal: 24,
  },
});
