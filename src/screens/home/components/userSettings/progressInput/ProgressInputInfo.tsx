import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProgressInputInfoProps = {
  onCloseInfo: () => void;
  navigateToProgressInputModes: () => void;
};

export const ProgressInputInfo: React.FC<ProgressInputInfoProps> = ({ onCloseInfo, navigateToProgressInputModes }) => {
  const { t } = useTranslation();
  const { theme, getIcon } = useTheme();
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const progressMode = useUserSettingsStore((s) => s.progressMode);

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Image style={styles(theme).icon} source={getIcon("info")} />
        <Text style={styles(theme).title}>
          {t(`home:userSettings.progressInput.${progressMode}.information.title`, {
            unitMeasurement: measurementUnit,
          })}
        </Text>
      </View>
      <View>
        <Text style={styles(theme).message}>
          {t(`home:userSettings.progressInput.${progressMode}.information.description`, {
            unitMeasurement: measurementUnit,
          })}
        </Text>
      </View>
      <View style={styles(theme).action}>
        <TouchableOpacity style={styles(theme).backButton} hitSlop={30} onPress={onCloseInfo}>
          <Text style={{ ...styles(theme).buttonText, color: theme.text }}>
            {t("home:userSettings.progressInput.infoButton.back")}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles(theme).confirmButton} hitSlop={30} onPress={navigateToProgressInputModes}>
          <Text style={styles(theme).buttonText}>{t("home:userSettings.progressInput.infoButton.changeMode")}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    header: {
      display: "flex",
      flexDirection: "row",
      gap: 8,
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 8,
      paddingHorizontal: 12,
    },
    icon: {
      width: 20,
      height: 20,
    },
    message: {
      color: theme.text,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    action: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      justifyContent: "flex-end",
      marginTop: 12,
    },
    confirmButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    backButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      borderRadius: 8,
      marginBottom: 16,
      width: 100,
    },
  });
