import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as Haptics from "expo-haptics";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { AdvancedSettings } from "./AdvancedSettings";
import { Direction } from "./Direction";
import { DistanceHikedInput } from "./distanceHikeInput/DistanceHikedInput";
import { MeasurementUnitSwitch } from "./MeasurementUnitSwitch";
import { Position } from "./position/Position";
import { PositionInput } from "./position/PositionInput";
import { Share } from "./Share";
import { ShowLogoSwitch } from "./ShowLogoSwitch";
import { UploadBackgroundImage } from "./UploadBackgroundImage";

type userSettingsProps = {
  disabled?: boolean;
  hide: boolean;
  closeMenu: boolean;
};
export const UserSettings: React.FC<userSettingsProps> = ({ disabled = false, hide, closeMenu }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPositionInputOpen, setIsPositionInputOpen] = useState<boolean>(false);
  const { getIcon, theme } = useTheme();
  const { isPremiumUnlocked } = usePremium();
  const { isStickerSelectedPremium } = useUserChoices();

  const position = useRef(new Animated.Value(35)).current;

  useEffect(() => {
    setIsMenuOpen(false);
  }, [closeMenu]);

  useEffect(() => {
    Animated.timing(position, {
      toValue: hide ? -130 : 35,
      duration: 50,
      useNativeDriver: false,
    }).start();
  }, [hide]);

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
            left: position,
          },
        ]}
      >
        {isPositionInputOpen ? (
          <PositionInput
            closePositionInput={() => {
              setIsPositionInputOpen(false);
              setIsMenuOpen(false);
            }}
          />
        ) : (
          <>
            <UploadBackgroundImage isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            <Share isMenuOpen={isMenuOpen} />
            <DistanceHikedInput isMenuOpen={isMenuOpen} setIsMenuOpen={setIsMenuOpen} />
            {isMenuOpen && (
              <>
                <MeasurementUnitSwitch isMenuOpen={isMenuOpen} />
                <Direction isMenuOpen={isMenuOpen} />
                <ShowLogoSwitch isMenuOpen={isMenuOpen} />
                <Position isMenuOpen={isMenuOpen} openPositionInput={() => setIsPositionInputOpen(true)} />
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
      left: 35,
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
