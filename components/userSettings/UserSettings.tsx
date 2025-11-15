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

export const UserSettings: React.FC = () => {
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
        <TouchableOpacity onPress={() => setIsMenuOpen(!isMenuOpen)}>
          <Image style={styles.image} source={getIcon("userSettings")} />
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
});
