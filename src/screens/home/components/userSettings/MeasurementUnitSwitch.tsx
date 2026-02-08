import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type MeasurementUnitSwitchProps = {
  isMenuOpen: boolean;
};

export const MeasurementUnitSwitch: React.FC<MeasurementUnitSwitchProps> = ({ isMenuOpen }) => {
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const setMeasurementUnit = useUserSettingsStore((s) => s.setMeasurementUnit);
  const setLocation = useUserSettingsStore((s) => s.setLocation);
  const pathLoaction = useUserSettingsStore((s) => s.location.pathLocation);
  const changeSelectedHikeTotalDistance = useUserSettingsStore((s) => s.changeSelectedHikeTotalDistance);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  const { t } = useTranslation();

  const handleToggle = () => {
    const isMiles = measurementUnit === MeasurementUnit.MILE;
    const newUnit = isMiles ? MeasurementUnit.KILOMETER : MeasurementUnit.MILE;
    setMeasurementUnit(newUnit);

    if (newUnit == MeasurementUnit.MILE) {
      setLocation(Math.round(pathLoaction * 0.621371));
      changeSelectedHikeTotalDistance(Math.round(selectedHikeTotalDistance * 0.621371));
    } else {
      setLocation(Math.round(pathLoaction / 0.621371));
      changeSelectedHikeTotalDistance(Math.round(selectedHikeTotalDistance / 0.621371));
    }
  };

  return (
    <Setting
      icon="measurementUnit"
      showLabel={isMenuOpen}
      label={measurementUnit == MeasurementUnit.MILE ? t("home:userSettings.mile") : t("home:userSettings.kilometer")}
      onPress={handleToggle}
    />
  );
};
