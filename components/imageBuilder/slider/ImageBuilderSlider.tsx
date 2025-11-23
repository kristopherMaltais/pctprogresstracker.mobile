import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect, useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { editWrapperPanRef } from "../../common/GestureWrapper";
import { ImageBuilderPlaceholder } from "../ImageBuilderPlaceholder";
import {
  ImageBuilderSticker,
  imageBuilderStickerPanRef,
} from "../ImageBuilderSticker";
import { StickerSmall } from "../stickers/StickerSmall";
import { StickerStats } from "../stickers/StickerStats";
import { IndexIndicator } from "./IndexIndicator";

export const ImageBuilderSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedHike, setIsStickerSelectedPremium } = useUserChoices();

  const { height } = Dimensions.get("window");

  const stickers = [
    { isPremium: false, sticker: <StickerStats key="stats" /> },
    { isPremium: true, sticker: <StickerSmall key="small" /> },
  ];

  useEffect(() => {
    setIsStickerSelectedPremium(stickers[activeIndex].isPremium);
  }, [activeIndex]);

  const handleSwipe = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "left") {
        return prev === stickers.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? stickers.length - 1 : prev - 1;
      }
    });
  };

  const gesture = Gesture.Pan()
    .onEnd((event) => {
      const threshold = 50;
      if (event.translationX > threshold) {
        runOnJS(handleSwipe)("right");
      } else if (event.translationX < -threshold) {
        runOnJS(handleSwipe)("left");
      }
    })
    .simultaneousWithExternalGesture(imageBuilderStickerPanRef)
    .simultaneousWithExternalGesture(editWrapperPanRef);

  const combinedGesture = Gesture.Simultaneous(gesture);

  return (
    <View style={{ ...styles.container, height: height * 0.8 }}>
      {selectedHike ? (
        <GestureDetector gesture={combinedGesture}>
          <ImageBuilderSticker>
            {stickers[activeIndex].sticker}
          </ImageBuilderSticker>
        </GestureDetector>
      ) : (
        <ImageBuilderPlaceholder />
      )}

      {selectedHike && (
        <IndexIndicator
          indexCount={stickers.length}
          activeIndex={activeIndex}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 16,
  },
});
