import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import { t } from "i18next";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import { ProgressBar } from "./ProgressBar";

export const StickerStats: React.FC = () => {
  const {
    selectedHike,
    displayedDistanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showLogo,
  } = useUserChoices();

  const { getIcon } = useTheme();

  const calculatePercentage = () => {
    return (displayedDistanceHiked * 100) / selectedHikeTotalDistance;
  };

  const getMeasurementUnit = () => {
    return measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi";
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
            {showLogo && (
              <Image
                source={getIcon("iconWithTextBackground")}
                style={styles.logo}
              />
            )}
          </View>
        </View>

        <ProgressBar percentage={Math.round(calculatePercentage())} />
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.label}>{t("index:sticker.total")}</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit()}
          </Text>
          <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {displayedDistanceHiked} {getMeasurementUnit()}
          </Text>
        </View>
        <Text style={styles.percentage}>
          {Math.round(calculatePercentage())}%
        </Text>
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
    textShadowColor: "black",
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
  },
  value: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
  percentage: {
    marginTop: 60,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  logo: { width: 58, height: 50, marginBottom: 10 },
});
