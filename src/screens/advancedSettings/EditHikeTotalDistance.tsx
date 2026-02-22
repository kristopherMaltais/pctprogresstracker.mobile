import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile, mileToKilometer } from "@/src/helpers/computeDistances";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "./components/Actions";
import { InputCheckbox } from "./components/InputCheckbox";
import { InputNumber } from "./components/InputNumber";

export const EditHikeTotalDistance: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();
  const { isPremiumUnlocked } = usePremium();

  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);
  const substractSkippedSections = useUserSettingsStore((state) => state.substractSkippedSections);
  const setSubstractSkippedSections = useUserSettingsStore((state) => state.setSubstractSkippedSections);
  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  const setSelectedHikeTotalDistance = useUserSettingsStore((state) => state.setSelectedHikeTotalDistance);

  const [_substractSkippedSections, _setSubstractSkippedSections] = useState<boolean>(substractSkippedSections);
  const [_hikeTotalDistance, _setHikeTotalDistance] = useState<number>(
    measurementUnit == MeasurementUnit.KILOMETER
      ? selectedHikeTotalDistance
      : kilometerToMile(selectedHikeTotalDistance)
  );

  const saveSettings = () => {
    setSelectedHikeTotalDistance(
      measurementUnit == MeasurementUnit.MILE ? mileToKilometer(_hikeTotalDistance) : _hikeTotalDistance
    );
    setSubstractSkippedSections(_substractSkippedSections);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>{t("advancedSettings:editHikeTotalDistance.title")}</Text>
      <InputNumber
        label={t("advancedSettings:editHikeTotalDistance.totalDistance")}
        value={_hikeTotalDistance}
        onChange={_setHikeTotalDistance}
        unit={measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
      />
      <InputCheckbox
        isDisabled={!isPremiumUnlocked}
        checked={_substractSkippedSections}
        toggleChecked={_setSubstractSkippedSections}
        label={t("advancedSettings:editHikeTotalDistance.substractSkippedSections")}
      />
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
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
      textAlign: "center",
      marginBottom: 30,
      textTransform: "uppercase",
    },
  });
