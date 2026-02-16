import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { removeSkippedSection } from "@/src/helpers/removeSkippedSectionDistance";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const StickerMapLarge: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const displayedLocation = useUserSettingsStore((s) => s.location.displayedLocation);
  const showLogo = useUserSettingsStore((s) => s.showLogo);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const substractSkippedSections = useUserSettingsStore((s) => s.substractSkippedSections);

  const { getIcon } = useTheme();

  return (
    <View style={styles.container}>
      <View style={styles.trailInformation}>
        <Text style={styles.trailName}>{selectedHike?.name}</Text>
        <Text style={styles.distanceHiked}>
          {removeSkippedSection(displayedLocation, skippedSections)} /{" "}
          {substractSkippedSections
            ? removeSkippedSection(selectedHikeTotalDistance, skippedSections)
            : selectedHikeTotalDistance}
          {getMeasurementUnit(measurementUnit)}
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
