import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { DistanceHikedInput } from "./distanceHikeInput/DistanceHikedInput";
import { MeasurementUnitSwitch } from "./MeasurementUnitSwitch";
import { Share } from "./Share";
import { ShowBordersSwitch } from "./ShowBordersSwitch";
import { UploadBackgroundImage } from "./UploadBackgroundImage";

type userSettingsProps = {
  disabled?: boolean;
  hide: boolean;
};
export const UserSettings: React.FC<userSettingsProps> = ({
  disabled = false,
  hide,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getIcon, theme } = useTheme();

  const screenHeight = Dimensions.get("window").height;
  const heightAnim = useRef(new Animated.Value(50)).current;
  const position = useRef(new Animated.Value(35)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isMenuOpen ? screenHeight * 0.4 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  useEffect(() => {
    Animated.timing(position, {
      toValue: hide ? -100 : 35,
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
            height: heightAnim,
            justifyContent: isMenuOpen ? "space-between" : "center",
            left: position,
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => !disabled && setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            style={disabled ? styles(theme).imageLock : styles(theme).image}
            source={getIcon(disabled ? "lock" : "userSettings")}
          />
        </TouchableOpacity>
        {isMenuOpen && (
          <>
            <UploadBackgroundImage />
            <ShowBordersSwitch />
            <MeasurementUnitSwitch />
            <DistanceHikedInput />
            <Share />
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
      alignItems: "center",
      position: "absolute",
      width: 50,
      top: 10,
      left: 35,
      zIndex: 1,
      borderRadius: 15,
      backgroundColor: theme.secondaryBackground,
      padding: 16,
      overflow: "hidden",
    },
    image: {
      width: 25,
      height: 25,
    },
    imageLock: {
      width: 25,
      height: 25,
    },
  });
