import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { ProgressModes } from "@/src/models/progressModes";
import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { ScrollView, StyleSheet, Text } from "react-native";
import { Actions } from "../components/Actions";
import { ProgressInputModeCard } from "./ProgressInputModeCard";

export const ProgressInputModes: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation();

  const progressMode = useUserSettingsStore((s) => s.progressMode);
  const setProgressMode = useUserSettingsStore((s) => s.setProgressMode);

  const [progressModeSelected, setProgressModeSelected] = useState<ProgressModes>(progressMode);

  const saveSettings = () => {
    setProgressMode(progressModeSelected);
    navigation.goBack();
  };

  return (
    <ScrollView style={styles(theme).container} contentContainerStyle={{ paddingBottom: 40 }}>
      <Text style={styles(theme).title}>{t("advancedSettings:progressInputModes.title")}</Text>
      <ProgressInputModeCard
        mode={ProgressModes.MARKER}
        onPress={setProgressModeSelected}
        isSelected={progressModeSelected == ProgressModes.MARKER}
      />
      <ProgressInputModeCard
        mode={ProgressModes.MANUAL}
        onPress={setProgressModeSelected}
        isSelected={progressModeSelected == ProgressModes.MANUAL}
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
      padding: 16,
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
