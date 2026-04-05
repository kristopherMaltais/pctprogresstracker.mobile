import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
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
  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  const toDisplayUnit = useUserSettingsStore((state) => state.toDisplayUnit);
  return (
    <View style={styles.container}>
      <InputNumber
        max={toDisplayUnit(selectedHikeTotalDistance)}
        label={label}
        value={toDisplayUnit(value.displayedLocation)}
        autoFocus={autoFocus}
        onChange={(value: number) => onDisplayedLocationChange(value)}
        unit={unit == MeasurementUnit.KILOMETER ? "km" : "mi"}
        decimals={1}
      />
      <Slider
        maximum={toDisplayUnit(selectedHikeTotalDistance)}
        onChange={(value: number) => onPathLocationchange(value)}
        value={toDisplayUnit(value.displayedLocation)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
