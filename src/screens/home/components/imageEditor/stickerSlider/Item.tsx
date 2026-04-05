import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useMemo } from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";
import { StickerLayoutPreview } from "../stickerLayout/StickerLayoutPreview";

const ITEM_SIZE = 70;
const ITEM_SPACING = 20;
const ACTIVE_SCALE = 1.2;

interface StickerItemProps {
  index: number;
  currentIndex: number;
  translateX: SharedValue<number>;
  isPremium: boolean;
  isPremiumUnlocked: boolean;
  name: string;
  stickerId: string;
  onPress: (stickerId: string) => void;
  onSelectIndex: (index: number) => void;
}

export const StickerItem: React.FC<StickerItemProps> = ({
  index,
  currentIndex,
  translateX,
  isPremium,
  isPremiumUnlocked,
  name: _name,
  stickerId,
  onPress,
  onSelectIndex,
}) => {
  const { theme, isDarkMode, getIcon } = useTheme();

  const animatedStyle = useAnimatedStyle(() => {
    const centerPosition = index * (ITEM_SIZE + ITEM_SPACING);
    const distance = Math.abs(-translateX.value - centerPosition);
    const itemWidth = ITEM_SIZE + ITEM_SPACING;

    const scale = interpolate(distance, [0, itemWidth], [ACTIVE_SCALE, 0.8], Extrapolation.CLAMP);
    const opacity = interpolate(distance, [0, itemWidth], [1, 0.5], Extrapolation.CLAMP);

    return { transform: [{ scale }], opacity };
  });

  const isActive = index === currentIndex;
  const isLocked = isPremium && !isPremiumUnlocked;

  const dynamicStyles = useMemo(
    () => ({
      itemContent: {
        ...styles.itemContent,
        backgroundColor: isDarkMode ? theme.secondaryBackground : "#FFFFFF",
        borderColor: theme.primary,
      },
      activeItem: {
        ...shadows.medium,
        shadowColor: theme.primary,
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 8,
      },
    }),
    [theme, isDarkMode]
  );

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle, isActive && dynamicStyles.activeItem]}>
      <TouchableOpacity style={dynamicStyles.itemContent} onPress={() => isActive ? onPress(stickerId) : onSelectIndex(index)}>
        {isLocked ? (
          <Image source={getIcon("lock")} style={styles.lockIcon} />
        ) : (
          <StickerLayoutPreview stickerId={stickerId} color={theme.primary} />
        )}
      </TouchableOpacity>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  itemContainer: {
    width: ITEM_SIZE,
    height: ITEM_SIZE,
  },
  itemContent: {
    width: "100%",
    height: "100%",
    borderRadius: ITEM_SIZE / 2,
    borderWidth: 3,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  lockIcon: {
    width: 18,
    height: 23,
  },
});
