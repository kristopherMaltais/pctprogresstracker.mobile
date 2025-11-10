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
        <TouchableOpacity
          onPress={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            height: 35,
            width: 35,
            borderRadius: 8,
          }}
        >
          <Image
            style={{ width: 35, height: 35 }}
            source={require("../../assets/images/grid.png")}
          />
        </TouchableOpacity>
        <UploadBackgroundImage show={isMenuOpen} />
        <ShowBordersSwitch show={isMenuOpen} />
        <MeasurementUnitSwitch show={isMenuOpen} />
        <DistanceHikedInput show={isMenuOpen} />
        <Share show={isMenuOpen} />
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
    top: 8,
    left: 8,
    zIndex: 1,
    borderRadius: 8,
    backgroundColor: "white",
    padding: 16,
    overflow: "hidden",
  },
  settingContainer: {
    height: 40,
    width: 40,
    borderRadius: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
});
