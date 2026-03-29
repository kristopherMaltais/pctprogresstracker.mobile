import { HikeProgressStatic } from "@/src/common/components/hikeProgressAnimation/HikeProgressStatic";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Map } from "@/src/models/map";
import React from "react";
import { Animated, Dimensions, StyleSheet, View } from "react-native";

const { width } = Dimensions.get("window");

const SPACING = 16;
export const CARD_WIDTH = width - SPACING * 2;
export const SNAP_INTERVAL = CARD_WIDTH + SPACING * 2;

type MapCardProps = {
  item: Map;
  index: number;
  scrollX: Animated.Value;
};

export const MapCard: React.FC<MapCardProps> = ({ item, index, scrollX }) => {
  const { theme, isDarkMode } = useTheme();

  const inputRange = [(index - 1) * SNAP_INTERVAL, index * SNAP_INTERVAL, (index + 1) * SNAP_INTERVAL];

  const scale = scrollX.interpolate({
    inputRange,
    outputRange: [0.9, 1, 0.9],
    extrapolate: "clamp",
  });

  return (
    <Animated.View style={[styles(theme).cardContainer, { transform: [{ scale }] }]}>
      <View
        style={{
          ...styles(theme).card,
          backgroundColor: theme.secondaryBackground,
        }}
      >
        <HikeProgressStatic sticker={item} size={1} />
      </View>
    </Animated.View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    cardContainer: {
      width: SNAP_INTERVAL,
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: SPACING,
    },
    card: {
      width: CARD_WIDTH,
      borderRadius: 24,
      padding: 20,
      alignItems: "center",
      justifyContent: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
      minHeight: 240,
    },
  });
