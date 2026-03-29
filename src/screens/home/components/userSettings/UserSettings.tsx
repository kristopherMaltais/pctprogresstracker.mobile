import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import * as Haptics from "expo-haptics";
import React, { useEffect, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AdvancedSettings } from "./AdvancedSettings";
import { FindHike } from "./FindHike";
import { Position } from "./position/Position";
import { PositionInput } from "./position/PositionInput";
import { ProgressInput } from "./progressInput/ProgressInput";
import { Share } from "./Share";
import { ShowLogoSwitch } from "./ShowLogoSwitch";
import { UploadBackgroundImage } from "./UploadBackgroundImage";

type userSettingsProps = {
  disabled?: boolean;
  closeMenu: boolean;
};
export const UserSettings: React.FC<userSettingsProps> = ({ disabled = false, closeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getIcon, theme } = useTheme();
  const { isPremiumUnlocked } = usePremium();
  const isStickerSelectedPremium = useUserSettingsStore((s) => s.isStickerSelectedPremium);
  const setIsCalibratePositionOpen = useUserSettingsStore((s) => s.setIsCalibratePositionOpen);
  const isCalibratePositionOpen = useUserSettingsStore((s) => s.isCalibratePositionOpen);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [closeMenu]);

  useEffect(() => {
    if (disabled) {
      setIsMenuOpen(false);
    }
  }, [disabled]);

  if (!isPremiumUnlocked && isStickerSelectedPremium) {
    return null;
  }

  const openMenu = () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <>
      <Animated.View
        style={[
          styles(theme).container,
          {
            justifyContent: isMenuOpen ? "space-between" : "center",
          },
        ]}
      >
        {isCalibratePositionOpen ? (
          <PositionInput
            closePositionInput={() => {
              setIsCalibratePositionOpen(false);
              setIsMenuOpen(false);
            }}
          />
        ) : (
          <>
            <UploadBackgroundImage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Share isMenuOpen={isMenuOpen} />
            <ProgressInput isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && (
              <>
                <FindHike isMenuOpen={isMenuOpen} />
                <ShowLogoSwitch isMenuOpen={isMenuOpen} />
                <Position isMenuOpen={isMenuOpen} openPositionInput={() => setIsCalibratePositionOpen(true)} />
                <AdvancedSettings isMenuOpen={isMenuOpen} />
              </>
            )}
            <TouchableOpacity style={styles(theme).toggleMenu} onPress={openMenu}>
              <Image
                style={{
                  ...styles(theme).chevron,
                  transform: [{ rotate: isMenuOpen ? "270deg" : "90deg" }],
                }}
                source={getIcon("rightChevron")}
              ></Image>
            </TouchableOpacity>
          </>
        )}
      </Animated.View>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      gap: 8,
      position: "absolute",
      top: 10,
      left: 10,
      zIndex: 1,
    },
    toggleMenu: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.secondaryBackground,
      width: 45,
      height: 25,
      borderRadius: 50,
    },
    chevron: {
      width: 12,
      height: 12,
    },
  });
