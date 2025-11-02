import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { ImageBuilderSticker } from "./ImageBuilderSticker";
import { StickerLarge } from "./stickers/StickerLarge";
import { StickerLargeNoStats } from "./stickers/StickerLargeNoStats";
import { StickerSmall } from "./stickers/StickerSmall";
import { StickerStats } from "./stickers/StickerStats";

export const ImageBuilderSlider: React.FC = () => {
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);

  const itemRefs = useRef<(ViewShot | null)[]>([]);

  const { setViewShot } = useViewShot();

  useEffect(() => {
    if (itemRefs.current[activeIndex]) {
      setViewShot(itemRefs.current[activeIndex]);
    }
  }, [activeIndex]);

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.min(
      items.length - 1,
      Math.max(0, Math.round(offsetX / (width - 16)))
    );
    setActiveIndex(index);
  };

  const items = [
    <ImageBuilderSticker>
      <StickerSmall />
    </ImageBuilderSticker>,
    <ImageBuilderSticker>
      <StickerLarge />
    </ImageBuilderSticker>,
    <ImageBuilderSticker>
      <StickerLargeNoStats />
    </ImageBuilderSticker>,
    <ImageBuilderSticker>
      <StickerStats />
    </ImageBuilderSticker>,
  ];

  return (
    <View>
      <ScrollView
        horizontal
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item, idx) => (
          <ViewShot
            key={idx}
            ref={(ref) => (itemRefs.current[idx] = ref)}
            options={{ format: "png", quality: 0.9 }}
          >
            <View style={[styles.item, { width: width - 32 }]}>{item}</View>
          </ViewShot>
        ))}
      </ScrollView>

      <View style={styles.dotsContainer}>
        {items.map((_, idx) => (
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
    height: 530,
    shadowColor: "#000",
    paddingHorizontal: 8,
    backgroundColor: "transparent",
  },
  item: {
    justifyContent: "center",
    alignItems: "center",
    marginHorizontal: 8,
    height: 500,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: "white",
  },
  dotsContainer: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: -16,
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
