import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
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

  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  useEffect(() => {
    console.log(currentSticker.sticker);
    setIsStickerSelectedPremium(currentSticker.isPremium);
  }, [currentSticker]);

  return (
    <View style={styles.container}>
      <Pressable onPress={() => setCloseMenu((prev) => !prev)} style={styles.canvasContainer}>
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
    shadowColor: "#000000BF",
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 4,
    shadowOpacity: 0.7,
  },
});
