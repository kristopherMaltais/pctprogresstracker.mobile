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
  max: number;
  autoFocus?: boolean;
  label: string;
  unit: string;
};

export const BoundaryInput: React.FC<BoundaryInputProps> = ({
  value,
  onDisplayedLocationChange,
  onPathLocationchange,
  max,
  autoFocus,
  label,
  unit,
}) => {
  return (
    <View style={styles.container}>
      <InputNumber
        label={label}
        value={value.displayedLocation}
        autoFocus={autoFocus}
        onChange={(value: number) => onDisplayedLocationChange(value)}
        unit={unit == MeasurementUnit.KILOMETER ? "km" : "mi"}
      />
      <Slider onChange={(value: number) => onPathLocationchange(value)} maximum={max} value={value.pathLocation} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
});
