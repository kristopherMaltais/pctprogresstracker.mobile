import { HikeProgressAnimation } from "@/src/common/components/HikeProgressAnimation";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const StickerMapLarge: React.FC = () => {
  const { displayedDistanceHiked, selectedHikeTotalDistance, selectedHike, measurementUnit, showLogo } =
    useUserChoices();

  const { getIcon } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.trailInformation}>
        <Text style={styles.trailName}>{selectedHike?.name}</Text>
        <Text style={styles.distanceHiked}>
          {displayedDistanceHiked} / {selectedHikeTotalDistance}{" "}
          {measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
        </Text>
      </View>
      <View>
        <HikeProgressAnimation size={1.5} />
      </View>
      {showLogo && <Image style={styles.logo} source={getIcon("iconWithTextBackground")} />}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 60,
    height: 55,
  },
  trailName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  distanceHiked: {
    color: "white",
    fontSize: 14,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  trailInformation: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
