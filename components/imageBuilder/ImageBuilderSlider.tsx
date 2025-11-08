import React, { useState } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { editWrapperPanRef } from "../EditWrapper";
import {
  ImageBuilderSticker,
  imageBuilderStickerPanRef,
} from "./ImageBuilderSticker";
import { StickerLarge } from "./stickers/StickerLarge";
import { StickerLargeNoStats } from "./stickers/StickerLargeNoStats";
import { StickerSmall } from "./stickers/StickerSmall";
import { StickerStats } from "./stickers/StickerStats";

export const ImageBuilderSlider: React.FC = () => {
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);

  const stickers = [
    <StickerSmall key="small" />,
    <StickerLarge key="large" />,
    <StickerLargeNoStats key="largeNoStats" />,
    <StickerStats key="stats" />,
  ];

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
    <View style={[styles.container, { width: width - 32 }]}>
      <GestureDetector gesture={combinedGesture}>
        <View style={styles.inner}>
          <ImageBuilderSticker>{stickers[activeIndex]}</ImageBuilderSticker>
        </View>
      </GestureDetector>

      <View style={styles.dotsContainer}>
        {stickers.map((_, idx) => (
          <View
            key={idx}
            style={[
              styles.dot,
              idx === activeIndex ? styles.activeDot : styles.inactiveDot,
            ]}
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    height: 530,
    justifyContent: "center",
  },
  inner: {
    height: 500,
    borderRadius: 20,
    backgroundColor: "white",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 12,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginHorizontal: 4,
  },
  activeDot: {
    backgroundColor: "#FFCD3C",
  },
  inactiveDot: {
    backgroundColor: "#D1D1D1",
  },
});
