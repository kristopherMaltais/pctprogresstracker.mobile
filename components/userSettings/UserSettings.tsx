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
};
export const UserSettings: React.FC<userSettingsProps> = ({
  disabled = false,
}) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { getIcon } = useTheme();

  const screenHeight = Dimensions.get("window").height;
  const heightAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isMenuOpen ? screenHeight * 0.4 : 50,
      duration: 300,
      useNativeDriver: false,
    }).start();
  }, [isMenuOpen]);

  useEffect(() => {
    if (disabled) {
      setIsMenuOpen(false);
    }
  }, [disabled]);

  return (
    <>
      <Animated.View
        style={[
          styles.container,
          {
            height: heightAnim,
            justifyContent: isMenuOpen ? "space-between" : "center",
          },
        ]}
      >
        <TouchableOpacity
          onPress={() => !disabled && setIsMenuOpen(!isMenuOpen)}
        >
          <Image
            style={disabled ? styles.imageLock : styles.image}
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

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    position: "absolute",
    width: 50,
    top: 10,
    left: 10,
    zIndex: 1,
    borderRadius: 15,
    backgroundColor: "white",
    padding: 16,
    overflow: "hidden",
  },
  image: {
    width: 35,
    height: 35,
  },
  imageLock: {
    width: 25,
    height: 25,
  },
});
