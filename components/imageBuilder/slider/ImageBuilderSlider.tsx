import { ModalPremium } from "@/components/premium/ModalPremium";
import { UserSettings } from "@/components/userSettings/UserSettings";
import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { ImageBuilderPlaceholder } from "../ImageBuilderPlaceholder";
import { ImageBuilderSticker } from "../ImageBuilderSticker";
import { StickerMap } from "../stickers/stickerMap/StickerMap";
import { StickerMapLarge } from "../stickers/stickerMapLarge";
import { StickerStats } from "../stickers/stickerStats/StickerStats";
import { IndexIndicator } from "./IndexIndicator";
import { SliderButton } from "./SliderButton";

export const ImageBuilderSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const { selectedHike, setIsStickerSelectedPremium } = useUserChoices();
  const { isDarkMode } = useTheme();

  const {
    isPremiumModalVisible,
    setIsPremiumModalVisible,
    unlockPremium,
    isPremiumUnlocked,
  } = usePremium();

  const { height } = Dimensions.get("window");

  const stickers = [
    { isPremium: false, sticker: <StickerMap key="small" /> },
    { isPremium: true, sticker: <StickerStats key="stats" /> },
    { isPremium: true, sticker: <StickerMapLarge key="large" /> },
  ];

  useEffect(() => {
    setIsStickerSelectedPremium(stickers[activeIndex].isPremium);
  }, [activeIndex]);

  const changeIndex = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "right") {
        return prev === stickers.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? stickers.length - 1 : prev - 1;
      }
    });
  };

  // Pan gesture
  const longPress = Gesture.LongPress()
    .onStart(() => {
      if (!stickers[activeIndex].isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(true);
      }
    })
    .onEnd(() => {
      if (!stickers[activeIndex].isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(false);
      }
    });

  const composedGesture = Gesture.Simultaneous(Gesture.Simultaneous(longPress));
  return (
    <View
      style={{
        ...styles.container,
        height: height * 0.8,
        shadowOpacity: isDarkMode ? 1 : 0.2,
      }}
    >
      {selectedHike ? (
        <GestureDetector gesture={composedGesture}>
          <ImageBuilderSticker>
            {stickers[activeIndex].sticker}
          </ImageBuilderSticker>
        </GestureDetector>
      ) : (
        <ImageBuilderPlaceholder />
      )}
      {selectedHike && (
        <>
          <UserSettings
            disabled={stickers[activeIndex].isPremium && !isPremiumUnlocked}
            hide={hideButtons}
          />
          <SliderButton
            direction="left"
            onPress={changeIndex}
            hide={hideButtons}
          />
          <SliderButton
            direction="right"
            onPress={changeIndex}
            hide={hideButtons}
          />
        </>
      )}

      {selectedHike && (
        <IndexIndicator
          indexCount={stickers.length}
          activeIndex={activeIndex}
        />
      )}
      <ModalPremium
        onConfirm={unlockPremium}
        onCancel={() => setIsPremiumModalVisible(false)}
        isVisible={isPremiumModalVisible}
      />
    </View>
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
