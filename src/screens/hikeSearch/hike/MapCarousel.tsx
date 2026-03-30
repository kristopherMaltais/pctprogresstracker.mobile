import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { Map } from "@/src/models/map";
import * as Haptics from "expo-haptics";
import React, { useRef, useState } from "react";
import { Animated, ListRenderItem, StyleSheet, View, ViewToken } from "react-native";
import { IndexIndicator } from "./IndexIndicator";
import { MapCard, SNAP_INTERVAL } from "./MapCard";

type MapCarouselProps = {
  maps: Map[];
  onMapChange?: (index: number) => void;
  currentMap: Map;
};

type ViewableItemsChangedInfo = {
  viewableItems: ViewToken[];
  changed: ViewToken[];
};

export const MapCarousel: React.FC<MapCarouselProps> = ({ maps, onMapChange, currentMap }) => {
  const { theme } = useTheme();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const mapCount = maps.length;

  const onViewableItemsChangedRef = useRef(({ viewableItems }: ViewableItemsChangedInfo) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const index = viewableItems[0].index;
      setActiveIndex(index);
      Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
      if (onMapChange) {
        onMapChange(index);
      }
    }
  });

  const viewabilityConfig = useRef({
    viewAreaCoveragePercentThreshold: 50,
  }).current;

  const renderItem: ListRenderItem<Map> = ({ item, index }) => {
    return <MapCard item={item} index={index} scrollX={scrollX} />;
  };

  return (
    <View style={styles(theme).container}>
      <Animated.FlatList
        data={maps}
        renderItem={renderItem}
        keyExtractor={(_, index) => `map-${index}`}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={SNAP_INTERVAL}
        decelerationRate="fast"
        bounces={false}
        onScroll={Animated.event([{ nativeEvent: { contentOffset: { x: scrollX } } }], { useNativeDriver: true })}
        scrollEventThrottle={16}
        onViewableItemsChanged={onViewableItemsChangedRef.current}
        viewabilityConfig={viewabilityConfig}
        contentContainerStyle={{ alignItems: "center" }}
      />
      {mapCount > 1 && <IndexIndicator indexCount={mapCount} activeIndex={activeIndex} />}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 24,
      marginBottom: 24,
      minHeight: 290,
    },

    mapInfoContainer: {
      display: "flex",
      alignItems: "center",
      paddingHorizontal: 16,
    },
    mapDescription: {
      fontSize: 16,
      fontWeight: "400",
      color: theme.text,
      fontStyle: "italic",
    },
  });
