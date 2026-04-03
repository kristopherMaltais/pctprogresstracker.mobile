import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile, mileToKilometer } from "@/src/helpers/computeDistances";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "./components/Actions";
import { InputCheckbox } from "./components/InputCheckbox";
import { InputNumber } from "./components/InputNumber";
import { InputSwitch } from "./components/InputSwitch";
import { InputToggleText } from "./components/InputToggleText";

export const Preferences: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isPremiumUnlocked } = usePremium();

  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);
  const setMeasurementUnit = useUserSettingsStore((state) => state.setMeasurementUnit);
  const isReverse = useUserSettingsStore((state) => state.isReverse);
  const setIsReverse = useUserSettingsStore((state) => state.setIsReverse);
  const substractSkippedSections = useUserSettingsStore((state) => state.substractSkippedSections);
  const setSubstractSkippedSections = useUserSettingsStore((state) => state.setSubstractSkippedSections);
  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  const setSelectedHikeTotalDistance = useUserSettingsStore((state) => state.setSelectedHikeTotalDistance);

  const [_measurementUnit, _setMeasurementUnit] = useState<MeasurementUnit>(measurementUnit);
  const [_isReverse, _setIsReverse] = useState<boolean>(isReverse);
  const [_substractSkippedSections, _setSubstractSkippedSections] = useState<boolean>(substractSkippedSections);
  const [_hikeTotalDistance, _setHikeTotalDistance] = useState<number>(
    measurementUnit == MeasurementUnit.KILOMETER
      ? Math.round(selectedHikeTotalDistance)
      : Math.round(kilometerToMile(selectedHikeTotalDistance))
  );

  const handleMeasurementUnitToggle = () => {
    const newUnit = _measurementUnit === MeasurementUnit.KILOMETER ? MeasurementUnit.MILE : MeasurementUnit.KILOMETER;
    _setMeasurementUnit(newUnit);

    if (newUnit === MeasurementUnit.MILE) {
      _setHikeTotalDistance(Math.round(kilometerToMile(_hikeTotalDistance)));
    } else {
      _setHikeTotalDistance(Math.round(mileToKilometer(_hikeTotalDistance)));
    }
  };

  const saveSettings = () => {
    setSelectedHikeTotalDistance(
      _measurementUnit == MeasurementUnit.MILE ? mileToKilometer(_hikeTotalDistance) : _hikeTotalDistance
    );
    setMeasurementUnit(_measurementUnit);
    setIsReverse(_isReverse);
    setSubstractSkippedSections(_substractSkippedSections);
    navigation.goBack();
  };

  const getMeasurementUnitText = () => {
    return _measurementUnit === MeasurementUnit.KILOMETER ? "km" : "mile";
  };

  return (
    <ScrollView style={styles(theme).container}>
      <InputNumber
        label={t("advancedSettings:editHikeTotalDistance.totalDistance")}
        value={_hikeTotalDistance}
        onChange={_setHikeTotalDistance}
        unit={_measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
      />
      <InputCheckbox
        isDisabled={!isPremiumUnlocked}
        checked={_substractSkippedSections}
        toggleChecked={_setSubstractSkippedSections}
        label={t("advancedSettings:editHikeTotalDistance.substractSkippedSections")}
      />
      <InputToggleText
        value={getMeasurementUnitText()}
        onToggle={handleMeasurementUnitToggle}
        label={t("advancedSettings:preferences.measurementUnit")}
      />
      <InputSwitch value={_isReverse} onToggle={_setIsReverse} label={t("advancedSettings:preferences.direction")} />
      <Actions onSave={saveSettings} />
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
      paddingTop: 24,
      paddingHorizontal: 16,
    },
  });
