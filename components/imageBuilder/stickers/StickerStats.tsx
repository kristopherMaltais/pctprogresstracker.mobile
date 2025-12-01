import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import { t } from "i18next";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";

export const StickerStats: React.FC = () => {
  const {
    selectedHike,
    distanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
  } = useUserChoices();

  const calculatePercentage = () =>
    (distanceHiked * 100) / selectedHike?.totalDistanceKilometer!;

  const getMeasurementUnit = () => {
    return measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi";
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.hikeName}>{selectedHike?.name}</Text>
        {/* <Image
          source={{ uri: selectedHike?.logo }}
          style={{
            width: 50,
            height: 50,
          }}
        /> */}
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Image
            source={require("../../../assets/images/icon.png")}
            style={{ width: 60, height: 60 }}
          />
        </View>
      </View>
      <View style={styles.body}>
        <View>
          <Text style={styles.label}>{t("index:sticker.total")}</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit()}
          </Text>
          <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {distanceHiked} {getMeasurementUnit()}
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
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
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
});
