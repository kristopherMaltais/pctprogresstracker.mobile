import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type MeasurementUnitSwitchProps = {};

export const MeasurementUnitSwitch: React.FC<
  MeasurementUnitSwitchProps
> = () => {
  const {
    measurementUnit,
    setMeasurementUnit,
    setDistanceHiked,
    distanceHiked,
  } = useUserChoices();
  const { getIcon } = useTheme();

  const handleToggle = () => {
    const isMiles = measurementUnit === MeasurementUnit.MILE;
    const newUnit = isMiles ? MeasurementUnit.KILOMETER : MeasurementUnit.MILE;
    setMeasurementUnit(newUnit);

    if (newUnit == MeasurementUnit.MILE) {
      setDistanceHiked(Math.round(distanceHiked * 0.621371));
    } else {
      setDistanceHiked(Math.round(distanceHiked / 0.621371));
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={handleToggle}>
      <Image style={styles.image} source={getIcon("measurementUnit")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 35, height: 35 },
});
