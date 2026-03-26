import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { Sticker } from "@/src/models/sticker";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, ListRenderItem, StyleSheet, Text, View, ViewToken } from "react-native";
import { IndexIndicator } from "../../home/components/imageBuilder/slider/IndexIndicator";
import { SNAP_INTERVAL, StickerCard } from "./StickerCard";

type StickerCarouselProps = {
  stickers: Sticker[];
};

type ViewableItemsChangedInfo = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export const StickerCarousel: React.FC<StickerCarouselProps> = ({ stickers }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const stickerCount = stickers.length;
  const stickerCountText =
    stickerCount === 1
      ? `${stickerCount} ${t("hikeSearch:detail.stickerAvailable")}`
      : `${stickerCount} ${t("hikeSearch:detail.stickersAvailable")}`;

  const onViewableItemsChanged = useRef(({ viewableItems }: ViewableItemsChangedInfo) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const index = viewableItems[0].index;
      setActiveIndex(index);
    }
  }).current;

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem: ListRenderItem<Sticker> = ({ item, index }) => {
    return <StickerCard item={item} index={index} scrollX={scrollX} />;
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).stickerCount}>{stickerCountText}</Text>
      <Animated.FlatList
        data={stickers}
        renderItem={renderItem}
        keyExtractor={(_, index) => `sticker-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChanged}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{ alignItems: "center" }}
      />
      {stickerCount > 1 && <IndexIndicator indexCount={stickerCount} activeIndex={activeIndex} />}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginBottom: 24,
      marginTop: 16,
      height: 300,
    },
    stickerCount: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      paddingHorizontal: 16,
    },
  });
