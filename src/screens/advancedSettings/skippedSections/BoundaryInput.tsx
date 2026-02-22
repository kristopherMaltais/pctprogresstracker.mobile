import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile } from "@/src/helpers/computeDistances";
import { Location } from "@/src/models/location";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React from "react";
import { StyleSheet, View } from "react-native";
import { InputNumber } from "../components/InputNumber";
import { Slider } from "../components/Slider";

type BoundaryInputProps = {
  value: Location;
  onDisplayedLocationChange: (value: number) => void;
  onPathLocationchange: (value: number) => void;
  autoFocus?: boolean;
  label: string;
  unit: string;
};

export const BoundaryInput: React.FC<BoundaryInputProps> = ({
  value,
  onDisplayedLocationChange,
  onPathLocationchange,
  autoFocus,
  label,
  unit,
}) => {
  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);
  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  return (
    <View style={styles.container}>
      <InputNumber
        max={
          measurementUnit == MeasurementUnit.KILOMETER
            ? selectedHikeTotalDistance
            : kilometerToMile(selectedHikeTotalDistance)
        }
        label={label}
        value={
          measurementUnit == MeasurementUnit.KILOMETER
            ? value.displayedLocation
            : kilometerToMile(value.displayedLocation)
        }
        autoFocus={autoFocus}
        onChange={(value: number) => onDisplayedLocationChange(value)}
        unit={unit == MeasurementUnit.KILOMETER ? "km" : "mi"}
      />
      <Slider
        maximum={
          measurementUnit == MeasurementUnit.KILOMETER
            ? selectedHikeTotalDistance
            : kilometerToMile(selectedHikeTotalDistance)
        }
        onChange={(value: number) => onPathLocationchange(value)}
        value={
          measurementUnit == MeasurementUnit.KILOMETER
            ? value.displayedLocation
            : kilometerToMile(value.displayedLocation)
        }
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
