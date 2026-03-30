import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { useEffect, useState } from "react";
import { Pressable, StyleSheet, View } from "react-native";
import { UserSettings } from "../userSettings/UserSettings";
import { Canvas } from "./Canvas";
import { StickerSlider } from "./stickerSlider/StickerSlider";

export const ImageEditor: React.FC = () => {
  const setIsStickerSelectedPremium = useUserSettingsStore((s) => s.setIsStickerSelectedPremium);

  const { isPremiumUnlocked } = usePremium();
  const { currentSticker } = useSticker();
  const { isDarkMode } = useTheme();

  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  useEffect(() => {
    setIsStickerSelectedPremium(currentSticker.isPremium);
  }, [currentSticker]);

  return (
    <View style={styles.container}>
      <Pressable
        onPress={() => setCloseMenu((prev) => !prev)}
        style={{ ...styles.canvasContainer, shadowOpacity: isDarkMode ? 1 : 0.3 }}
      >
        <Canvas>{currentSticker.sticker}</Canvas>
        <UserSettings disabled={currentSticker.isPremium && !isPremiumUnlocked} closeMenu={closeMenu} />
      </Pressable>
      <StickerSlider />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flex: 1,
    gap: 12,
    marginTop: -16,
    paddingHorizontal: 16,
  },
  canvasContainer: {
    flex: 1,
    ...shadows.medium,
  },
});
