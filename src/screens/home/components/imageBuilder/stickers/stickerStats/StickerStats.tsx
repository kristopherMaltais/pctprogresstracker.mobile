import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile } from "@/src/helpers/computeDistances";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { removeSkippedSection } from "@/src/helpers/removeSkippedSectionDistance";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { t } from "i18next";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "./ProgressBar";

export const StickerStats: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const displayedLocation = useUserSettingsStore((s) => s.location.displayedLocation);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const showLogo = useUserSettingsStore((s) => s.showLogo);
  const substractSkippedSections = useUserSettingsStore((s) => s.substractSkippedSections);

  const { getIcon } = useTheme();

  const calculatePercentage = () => {
    if (substractSkippedSections) {
      return (
        (removeSkippedSection(displayedLocation, skippedSections) * 100) /
        removeSkippedSection(selectedHikeTotalDistance, skippedSections)
      );
    } else {
      return (removeSkippedSection(displayedLocation, skippedSections) * 100) / selectedHikeTotalDistance;
    }
  };

  const getTotalDistance = () => {
    var distance = selectedHikeTotalDistance;

    if (substractSkippedSections) {
      distance = removeSkippedSection(selectedHikeTotalDistance, skippedSections);
    }

    if (measurementUnit == MeasurementUnit.MILE) {
      distance = kilometerToMile(distance);
    }

    return distance;
  };

  const getDistanceHiked = () => {
    var distance = removeSkippedSection(displayedLocation, skippedSections);
    return measurementUnit == MeasurementUnit.KILOMETER ? distance : kilometerToMile(distance);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.title}>
          <Text style={styles.hikeName}>{selectedHike?.name}</Text>
          <View
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            {showLogo && <Image source={getIcon("iconWithTextBackground")} style={styles.logo} />}
          </View>
        </View>

        <ProgressBar percentage={Math.round(calculatePercentage())} />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.label}>{t("home:sticker.total")}</Text>
          <Text style={styles.value}>
            {getTotalDistance()} {getMeasurementUnit(measurementUnit)}
          </Text>
          <Text style={styles.label}>{t("home:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {getDistanceHiked()} {getMeasurementUnit(measurementUnit)}
          </Text>
        </View>
        <Text style={styles.percentage}>{calculatePercentage().toFixed(1)}%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 70,
    width: "100%",
    paddingHorizontal: 24,
  },
  header: {
    display: "flex",
    flexDirection: "column",
  },
  title: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    minHeight: 60,
  },
  hikeName: {
    color: "white",
    fontSize: 20,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  body: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 14,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  value: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  percentage: {
    marginTop: 60,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  logo: { width: 58, height: 50, marginBottom: 10 },
});
