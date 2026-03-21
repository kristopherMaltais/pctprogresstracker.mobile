import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { ProgressModes } from "@/src/models/progressModes";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ProgressInputModeCardProps = {
  mode: ProgressModes;
  isSelected: boolean;
  onPress: (mode: ProgressModes) => void;
  icon?: React.ReactNode;
};

export const ProgressInputModeCard: React.FC<ProgressInputModeCardProps> = ({ mode, isSelected, onPress, icon }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const bestForPoints = t(`advancedSettings:progressInputModes.${mode}.bestFor`, {
    returnObjects: true,
  }) as string[];

  return (
    <TouchableOpacity
      style={[styles(theme).card, isSelected && styles(theme).selectedCard]}
      onPress={() => onPress(mode)}
      activeOpacity={0.7}
    >
      <View
        style={[
          styles(theme).selectionDot,
          isSelected && { backgroundColor: theme.primary, borderColor: theme.primary },
        ]}
      />

      <View style={styles(theme).headerContainer}>
        {icon && <View style={styles(theme).iconContainer}>{icon}</View>}
        <Text style={[styles(theme).cardTitle, isSelected && { color: theme.primary, opacity: 1 }]}>
          {t(`advancedSettings:progressInputModes.${mode}.title`)}
        </Text>
      </View>

      <View style={styles(theme).bulletPointsContainer}>
        <Text style={styles(theme).bestForLabel}>{t("advancedSettings:progressInputModes.bestForLabel")}</Text>

        {Array.isArray(bestForPoints) &&
          bestForPoints.map((point, index) => (
            <View key={index} style={styles(theme).bulletRow}>
              <Text style={styles(theme).bullet}>•</Text>
              <Text style={styles(theme).bulletText}>{point}</Text>
            </View>
          ))}
      </View>

      <Text style={styles(theme).cardDescription}>{t(`advancedSettings:progressInputModes.${mode}.description`)}</Text>
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      padding: 20,
      marginBottom: 16,
      position: "relative",
      borderWidth: 2,
      borderColor: "transparent",

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    selectedCard: {
      borderWidth: 2,
      borderColor: theme.primary,
    },
    selectionDot: {
      position: "absolute",
      top: 16,
      right: 16,
      width: 16,
      height: 16,
      borderRadius: 8,
      borderWidth: 1,
      borderColor: theme.text,
      backgroundColor: "transparent",
    },
    headerContainer: {
      flexDirection: "row",
      alignItems: "center",
      marginBottom: 12,
      gap: 10,
      paddingRight: 30,
    },
    iconContainer: {
      width: 24,
      alignItems: "center",
    },
    cardTitle: {
      fontSize: 16,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      color: theme.text,
    },
    bulletPointsContainer: {
      marginBottom: 16,
    },
    bestForLabel: {
      fontSize: 11,
      fontWeight: "700",
      textTransform: "uppercase",
      color: theme.text,
      marginBottom: 6,
    },
    bulletRow: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 4,
    },
    bullet: {
      width: 12,
      fontSize: 16,
      lineHeight: 18,
      fontWeight: "bold",
      color: theme.text,
    },
    bulletText: {
      fontSize: 13,
      fontStyle: "italic",
      color: theme.text,
      flex: 1,
    },
    cardDescription: {
      color: theme.text,
      paddingTop: 12,
      borderTopWidth: 1,
      borderTopColor: theme.text,
    },
  });
