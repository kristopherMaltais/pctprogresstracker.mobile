import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React, { useEffect, useRef, useState } from "react";
import { Animated, Image, StyleSheet, TouchableOpacity } from "react-native";
import { Direction } from "./Direction";
import { DistanceHikedInput } from "./distanceHikeInput/DistanceHikedInput";
import { MeasurementUnitSwitch } from "./MeasurementUnitSwitch";
import { Position } from "./Position";
import { Share } from "./Share";
import { UploadBackgroundImage } from "./UploadBackgroundImage";

type userSettingsProps = {
  disabled?: boolean;
  hide: boolean;
  closeMenu: boolean;
};
export const UserSettings: React.FC<userSettingsProps> = ({
  disabled = false,
  hide,
  closeMenu,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getIcon, theme } = useTheme();

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
        <UploadBackgroundImage
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        <Share isMenuOpen={isMenuOpen} />
        <DistanceHikedInput
          isMenuOpen={isMenuOpen}
          setIsMenuOpen={setIsMenuOpen}
        />
        {isMenuOpen && (
          <>
            <MeasurementUnitSwitch isMenuOpen={isMenuOpen} />
            <Direction isMenuOpen={isMenuOpen} />
            <Position isMenuOpen={isMenuOpen} />
          </>
        )}
        <TouchableOpacity
          style={styles(theme).toggleMenu}
          onPress={() => setIsMenuOpen((prev) => !prev)}
        >
          <Image
            style={{
              ...styles(theme).chevron,
              transform: [{ rotate: isMenuOpen ? "270deg" : "90deg" }],
            }}
            source={getIcon("rightChevron")}
          ></Image>
        </TouchableOpacity>
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
