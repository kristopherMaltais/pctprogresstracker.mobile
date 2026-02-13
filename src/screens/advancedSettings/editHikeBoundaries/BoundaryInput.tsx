import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { Location } from "@/src/models/location";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TextInput, View } from "react-native";
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
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles(theme).controlGroup}>
      <View style={styles(theme).textRow}>
        <Text style={styles(theme).minimalLabel}>{label}</Text>
        <View style={styles(theme).inputWrapper}>
          <TextInput
            style={styles(theme).minimalInput}
            keyboardType="numeric"
            value={Math.round(value.displayedLocation * max).toString()}
            onChangeText={(value: string) => onDisplayedLocationChange(Number(value) / max)}
            autoFocus={autoFocus}
          />
          <Text style={styles(theme).unitText}>{unit == MeasurementUnit.KILOMETER ? "km" : "mi"}</Text>
        </View>
      </View>
      <Slider
        onChange={(value: number) => onPathLocationchange(value / max)}
        maximum={max}
        value={value.pathLocation * max}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    controlGroup: {
      marginBottom: 20,
    },
    textRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "flex-end",
      marginBottom: 10,
      paddingHorizontal: 4,
    },
    minimalLabel: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    inputWrapper: {
      flexDirection: "row",
      alignItems: "center",
    },
    minimalInput: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      paddingHorizontal: 4,
      textAlign: "right",
      minWidth: 70,
    },
    unitText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginLeft: 4,
      opacity: 0.4,
    },
  });
