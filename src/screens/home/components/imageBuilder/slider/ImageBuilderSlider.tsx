import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useNavigation } from "expo-router";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import { runOnJS } from "react-native-reanimated";
import { UserSettings } from "../../userSettings/UserSettings";
import { ImageBuilder } from "../ImageBuilder";
import { IndexIndicator } from "./IndexIndicator";
import { SliderButton } from "./SliderButton";

export const ImageBuilderSlider: React.FC = () => {
  const [hideButtons, setHideButtons] = useState<boolean>(false);
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const setIsStickerSelectedPremium = useUserSettingsStore((s) => s.setIsStickerSelectedPremium);
  const { isDarkMode, theme, getIcon } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const { isPremiumUnlocked } = usePremium();
  const { currentSticker, setCurrentSticker, stickerCount, currentIndex } = useSticker();

  const { height } = Dimensions.get("window");
  const [closeMenu, setCloseMenu] = useState<boolean>(false);

  const openHikeList = () => navigation.navigate("hikeSearch");

  useEffect(() => {
    setIsStickerSelectedPremium(currentSticker.isPremium);
  }, [currentSticker]);

  const longPress = Gesture.LongPress()
    .onStart(() => {
      if (!currentSticker.isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(true);
      }
    })
    .onEnd(() => {
      if (!currentSticker.isPremium || isPremiumUnlocked) {
        runOnJS(setHideButtons)(false);
      }
    });

  const composedGesture = Gesture.Simultaneous(Gesture.Simultaneous(longPress));
  return (
    <Pressable
      onPress={() => setCloseMenu((prev) => !prev)}
      style={{
        ...styles(theme).container,
        height: height * 0.81,
        shadowOpacity: isDarkMode ? 1 : 0.2,
      }}
    >
      {selectedHike ? (
        <>
          <GestureDetector gesture={composedGesture}>
            <ImageBuilder>{currentSticker.sticker}</ImageBuilder>
          </GestureDetector>
          <UserSettings
            disabled={currentSticker.isPremium && !isPremiumUnlocked}
            hide={hideButtons}
            closeMenu={closeMenu}
          />
          <SliderButton direction="left" onPress={setCurrentSticker} hide={hideButtons} />
          <SliderButton direction="right" onPress={setCurrentSticker} hide={hideButtons} />
          {Platform.OS !== "android" && <IndexIndicator indexCount={stickerCount} activeIndex={currentIndex} />}
        </>
      ) : (
        <View style={styles(theme).emptyStateContainer}>
          <TouchableOpacity style={styles(theme).findHikeButton} onPress={openHikeList}>
            <Text style={styles(theme).findHikeButtonText}>{t("home:findMyHike")}</Text>
            <Image source={getIcon("search")} style={styles(theme).searchIcon} />
          </TouchableOpacity>
        </View>
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: -16,
      position: "relative",
      width: "100%",
      shadowColor: "#000000BF",
      shadowOffset: { width: 0, height: 3 },
      shadowRadius: 4,
      paddingHorizontal: 24,
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    findHikeButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    searchIcon: {
      width: 24,
      height: 24,
      tintColor: "#FFF",
    },
    findHikeButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  });
