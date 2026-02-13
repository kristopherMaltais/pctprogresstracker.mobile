import { HikeProgressAnimation } from "@/src/common/components/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const EditSkippedSections: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>Add skipped section(s)</Text>

      <View style={styles(theme).mapContainer}>
        <HikeProgressAnimation size={1} start={0} end={1} />
      </View>

      {/* ACTIONS */}
      <View style={styles(theme).buttonContainer}>
        <Pressable style={styles(theme).cancelButton} onPress={() => {}}>
          <Text style={{ color: theme.text, fontWeight: "500" }}>{t("common:cancel")}</Text>
        </Pressable>
        <Pressable style={[styles(theme).saveButton, { backgroundColor: theme.primary }]} onPress={() => {}}>
          <Text style={styles(theme).saveButtonText}>{t("common:save")}</Text>
        </Pressable>
      </View>
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
      marginBottom: 10,
      textTransform: "uppercase",
    },
    mapContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      minHeight: 140,
      marginBottom: 20,
      padding: 10,
    },
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
    buttonContainer: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "space-between",
      alignItems: "center",
    },
    cancelButton: {
      padding: 16,
      flex: 1,
      alignItems: "center",
    },
    saveButton: {
      padding: 16,
      borderRadius: 12,
      flex: 2,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    saveButtonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
    note: {
      color: theme.text,
    },
    noteContainer: {
      paddingHorizontal: 12,
    },
  });
