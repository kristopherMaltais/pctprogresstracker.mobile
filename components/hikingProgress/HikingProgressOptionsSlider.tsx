import { useScroll } from "@/contexts/scrollProvider/ScrollContextProvider";
import React, { useState } from "react";
import { Dimensions, ScrollView, StyleSheet, View } from "react-native";
import { HikingProgressMap } from "./hikingProgressTypes/HikingProgressMap";
import { HikingProgressSticker } from "./hikingProgressTypes/HikingProgressSticker";

export const HikingProgressOptionsSlider: React.FC = () => {
  const { scrollEnabled } = useScroll();
  const { width } = Dimensions.get("window");
  const [activeIndex, setActiveIndex] = useState(0);

  const items = [
    <HikingProgressSticker key="sticker" />,
    <HikingProgressMap key="map" />,
  ];

  const handleScroll = (event: any) => {
    const offsetX = event.nativeEvent.contentOffset.x;
    const index = Math.min(
      items.length - 1,
      Math.max(0, Math.round(offsetX / (width - 16)))
    );
    setActiveIndex(index);
  };

  return (
    <View style={styles.container}>
      <ScrollView
        scrollEnabled={scrollEnabled}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width - 16}
        decelerationRate="fast"
        contentContainerStyle={{ paddingRight: 16 }}
        onScroll={handleScroll}
        scrollEventThrottle={16}
      >
        {items.map((item, idx) => (
          <View key={idx} style={[styles.item, { width: width - 32 }]}>
            {item}
          </View>
        ))}
      </ScrollView>

      {/* Index indicator (dots) */}
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
    marginTop: 8,
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
