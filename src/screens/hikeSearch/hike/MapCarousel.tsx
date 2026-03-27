import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { Map } from "@/src/models/map";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Animated, ListRenderItem, StyleSheet, Text, View, ViewToken } from "react-native";
import { IndexIndicator } from "../../home/components/imageBuilder/slider/IndexIndicator";
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
  const { t } = useTranslation();
  const scrollX = useRef(new Animated.Value(0)).current;
  const [activeIndex, setActiveIndex] = useState(0);

  const mapCount = maps.length;
  const mapCountText =
    mapCount === 1
      ? `${mapCount} ${t("hikeSearch:detail.mapAvailable")}`
      : `${mapCount} ${t("hikeSearch:detail.mapsAvailable")}`;

  const onViewableItemsChangedRef = useRef(({ viewableItems }: ViewableItemsChangedInfo) => {
    if (viewableItems.length > 0 && viewableItems[0].index !== null) {
      const index = viewableItems[0].index;
      setActiveIndex(index);
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
      <View style={styles(theme).mapInfoContainer}>
        <Text style={styles(theme).mapName}>{currentMap.name}</Text>
        {currentMap.description && <Text style={styles(theme).mapDescription}>{currentMap.description}</Text>}
      </View>
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
      marginBottom: 24,
      marginTop: 16,
    },
    mapInfoContainer: {
      paddingHorizontal: 16,
      marginBottom: 16,
      minHeight: 40,
    },
    mapName: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    mapDescription: {
      fontSize: 14,
      fontWeight: "400",
      color: theme.text,
      opacity: 0.7,
      lineHeight: 20,
    },
  });
