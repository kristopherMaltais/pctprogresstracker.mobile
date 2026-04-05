import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import * as Haptics from "expo-haptics";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";
import { Path, Svg } from "react-native-svg";

const BUTTON_SIZE = 44;
const SIDE_OVERLAP = BUTTON_SIZE / 4;
const BOTTOM_OFFSET = 8;

const CycleIcon: React.FC<{ color: string }> = ({ color }) => (
  <Svg width={18} height={18} viewBox="0 0 24 24">
    <Path
      d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6a6 6 0 0 1-6 6 6 6 0 0 1-6-6H4a8 8 0 0 0 8 8 8 8 0 0 0 8-8 8 8 0 0 0-8-8z"
      fill={color}
    />
  </Svg>
);

export const StickerSliderSmallScreen: React.FC = () => {
  const { setCurrentSticker, cycleVariant, currentSticker } = useSticker();
  const { theme, getIcon } = useTheme();

  const handlePress = (direction: "left" | "right") => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    setCurrentSticker(direction);
  };

  const handleVariantPress = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Light);
    cycleVariant(currentSticker.id);
  };

  return (
    <>
      <TouchableOpacity
        style={[styles.button, styles.buttonLeft, { backgroundColor: theme.primary }]}
        onPress={() => handlePress("left")}
        activeOpacity={0.8}
      >
        <Image source={getIcon("rightChevron")} style={[styles.icon, styles.iconFlipped]} />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonCenter, { backgroundColor: theme.primary }]}
        onPress={handleVariantPress}
        activeOpacity={0.8}
      >
        <CycleIcon color="#FFFFFF" />
      </TouchableOpacity>

      <TouchableOpacity
        style={[styles.button, styles.buttonRight, { backgroundColor: theme.primary }]}
        onPress={() => handlePress("right")}
        activeOpacity={0.8}
      >
        <Image source={getIcon("rightChevron")} style={styles.icon} />
      </TouchableOpacity>
    </>
  );
};

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    borderRadius: BUTTON_SIZE / 2,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 10,
    ...shadows.medium,
  },
  buttonLeft: {
    left: -SIDE_OVERLAP,
    bottom: BOTTOM_OFFSET,
  },
  buttonRight: {
    right: -SIDE_OVERLAP,
    bottom: BOTTOM_OFFSET,
  },
  buttonCenter: {
    alignSelf: "center",
    bottom: BOTTOM_OFFSET,
  },
  icon: {
    width: 18,
    height: 18,
    tintColor: "#FFFFFF",
  },
  iconFlipped: {
    transform: [{ scaleX: -1 }],
  },
});
