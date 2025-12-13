import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React from "react";
import { Setting } from "./Setting";

type MeasurementUnitSwitchProps = {
  isMenuOpen: boolean;
};

export const MeasurementUnitSwitch: React.FC<MeasurementUnitSwitchProps> = ({
  isMenuOpen,
}) => {
  const {
    measurementUnit,
    setMeasurementUnit,
    setDistanceHiked,
    distanceHiked,
  } = useUserChoices();

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
    <Setting
      icon="measurementUnit"
      showLabel={isMenuOpen}
      label="Unit"
      onPress={handleToggle}
    />
  );
};
