import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useMemo } from "react";
import { Image, StyleSheet, Text, TouchableOpacity } from "react-native";
import Animated, { Extrapolation, interpolate, SharedValue, useAnimatedStyle } from "react-native-reanimated";

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
}

export const StickerItem: React.FC<StickerItemProps> = ({
  index,
  currentIndex,
  translateX,
  isPremium,
  isPremiumUnlocked,
  name,
  stickerId,
  onPress,
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
      nameText: {
        ...styles.nameText,
        color: theme.text,
      },
    }),
    [theme, isDarkMode]
  );

  return (
    <Animated.View style={[styles.itemContainer, animatedStyle, isActive && dynamicStyles.activeItem]}>
      <TouchableOpacity style={dynamicStyles.itemContent} onPress={() => onPress(stickerId)}>
        {isLocked ? (
          <Image source={getIcon("lock")} style={styles.lockIcon} />
        ) : (
          <Text style={dynamicStyles.nameText} numberOfLines={2}>
            {name}
          </Text>
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
  lockBody: {
    position: "absolute",
    bottom: 0,
    left: 4,
    width: 16,
    height: 16,
    backgroundColor: "#FFFFFF",
    borderRadius: 3,
  },
  lockShackle: {
    position: "absolute",
    top: 0,
    left: 7,
    width: 10,
    height: 12,
    borderWidth: 2,
    borderColor: "#FFFFFF",
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    borderBottomWidth: 0,
  },
  nameText: {
    fontSize: 14,
    fontWeight: "600",
    textAlign: "center",
    paddingHorizontal: 4,
  },
});
