import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, useWindowDimensions, View } from "react-native";
import { UserSettings } from "../userSettings/UserSettings";
import { Canvas } from "./Canvas";
import { StickerSlider } from "./stickerSlider/StickerSlider";
import { StickerSliderSmallScreen } from "./stickerSlider/StickerSliderSmallScreen";

const SMALL_SCREEN_HEIGHT_THRESHOLD = 700;

export const ImageEditor: React.FC = () => {
  const setIsStickerSelectedPremium = useUserSettingsStore((s) => s.setIsStickerSelectedPremium);

  const { isPremiumUnlocked } = usePremium();
  const { currentSticker } = useSticker();
  const { isDarkMode } = useTheme();
  const { height } = useWindowDimensions();

  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  const isSmallScreen = height < SMALL_SCREEN_HEIGHT_THRESHOLD;

  useEffect(() => {
    setIsStickerSelectedPremium(currentSticker.isPremium);
  }, [currentSticker]);

  return (
    <View style={[styles.container, isSmallScreen && styles.containerSmall]}>
      <Pressable
        onPress={() => setCloseMenu((prev) => !prev)}
        style={{ ...styles.canvasContainer, shadowOpacity: isDarkMode ? 1 : 0.3 }}
      >
        <Canvas>{currentSticker.sticker}</Canvas>
        <UserSettings disabled={currentSticker.isPremium && !isPremiumUnlocked} closeMenu={closeMenu} />
        {isSmallScreen && <StickerSliderSmallScreen />}
      </Pressable>
      {!isSmallScreen && <StickerSlider />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 8,
    marginTop: -16,
    paddingHorizontal: 16,
  },
  containerSmall: {
    paddingBottom: 16,
  },
  canvasContainer: {
    flex: 1,
    ...shadows.medium,
    overflow: "visible",
  },
});
