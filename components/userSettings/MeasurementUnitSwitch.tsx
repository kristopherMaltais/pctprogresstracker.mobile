import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type MeasurementUnitSwitchProps = {};

export const MeasurementUnitSwitch: React.FC<
  MeasurementUnitSwitchProps
> = ({}) => {
  const { measurementUnit, setMeasurementUnit } = useUserChoices();
  const { t } = useTranslation();
  const isMiles = measurementUnit === MeasurementUnit.MILE;

  const handleToggle = () => {
    const newUnit = isMiles ? MeasurementUnit.KILOMETER : MeasurementUnit.MILE;
    setMeasurementUnit(newUnit);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>{t("index:userSettings.unit")}</Text>
      <Pressable style={styles.switchContainer} onPress={handleToggle}>
        <View
          style={[
            styles.option,
            measurementUnit === MeasurementUnit.KILOMETER &&
              styles.activeOption,
          ]}
        >
          <Text
            style={[
              styles.text,
              measurementUnit === MeasurementUnit.KILOMETER &&
                styles.activeText,
            ]}
          >
            km
          </Text>
        </View>
        <View
          style={[
            styles.option,
            measurementUnit === MeasurementUnit.MILE && styles.activeOption,
          ]}
        >
          <Text
            style={[
              styles.text,
              measurementUnit === MeasurementUnit.MILE && styles.activeText,
            ]}
          >
            mi
          </Text>
        </View>
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  label: {
    fontSize: 18,
  },
  switchContainer: {
    flexDirection: "row",
    backgroundColor: "#E0E0E0",
    borderRadius: 10,
    overflow: "hidden",
    width: 120,
    height: 40,
  },
  option: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  activeOption: {
    backgroundColor: "#FFCD3C",
  },
  text: {
    fontSize: 16,
    fontWeight: "600",
    color: "#555",
  },
  activeText: {
    color: "#fff",
  },
});
