import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type MeasurementUnitSwitchProps = {
  show: boolean;
};

export const MeasurementUnitSwitch: React.FC<MeasurementUnitSwitchProps> = ({
  show,
}) => {
  const { measurementUnit, setMeasurementUnit } = useUserChoices();
  const isMiles = measurementUnit === MeasurementUnit.MILE;

  const handleToggle = () => {
    const newUnit = isMiles ? MeasurementUnit.KILOMETER : MeasurementUnit.MILE;
    setMeasurementUnit(newUnit);
  };

  return (
    <>
      {show && (
        <TouchableOpacity style={styles.container} onPress={handleToggle}>
          <Image
            style={styles.image}
            source={require("../../assets/images/rulerTest.png")}
          />
        </TouchableOpacity>
      )}
    </>
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
