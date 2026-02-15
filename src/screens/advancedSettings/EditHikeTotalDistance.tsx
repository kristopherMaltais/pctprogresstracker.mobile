import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Inclus dans Expo
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const EditHikeTotalDistance: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);

  // State pour la checkbox
  const [isLocked, setIsLocked] = useState(false);

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>{t("advancedSettings:editHikeTotalDistance.title")}</Text>

      {/* Rangée de la distance */}
      <View style={styles(theme).textRow}>
        <Text style={styles(theme).label}>Total distance</Text>
        <View style={styles(theme).inputContainer}>
          <TextInput style={styles(theme).input} keyboardType="numeric" value={"1245"} onChangeText={() => {}} />
          <Text style={styles(theme).unitText}>{measurementUnit === MeasurementUnit.KILOMETER ? "km" : "mi"}</Text>
        </View>
      </View>

      {/* Rangée de la Checkbox */}
      <Pressable style={styles(theme).textRow} onPress={() => setIsLocked(!isLocked)}>
        <Text style={styles(theme).label}>Substract skipped sections</Text>
        <View
          style={[styles(theme).checkbox, isLocked && { backgroundColor: theme.primary, borderColor: theme.primary }]}
        >
          {isLocked && <MaterialCommunityIcons name="check" size={14} color={theme.background} />}
        </View>
      </Pressable>
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
      marginBottom: 30, // Un peu plus d'espace ici
      textTransform: "uppercase",
    },
    textRow: {
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center", // Centré verticalement pour que la checkbox fit bien
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    inputContainer: {
      flexDirection: "row",
      alignItems: "baseline", // Garde l'unité alignée sur le bas du gros texte
    },
    input: {
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
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.text,
      opacity: 0.8,
      justifyContent: "center",
      alignItems: "center",
    },
  });
