import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { FullStoreState, useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { LocationInterval } from "@/src/models/locationInterval";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SkippedSectionSummary } from "./SkippedSectionSummary";

export const SkippedSections: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();
  const skippedSections = useUserSettingsStore((state: FullStoreState) => state.skippedSections);

  const openAddSkippedSection = () => {
    navigation.navigate("editSkippedSection", { isEditMode: false });
  };

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>{t("advancedSettings:skippedSections.title")}</Text>

      <View
        style={{ ...styles(theme).mapContainer, backgroundColor: isDarkMode ? theme.secondaryBackground : "#E0E0E0" }}
      >
        <HikeProgressAnimation size={1} skippedSectionsDisplay={skippedSections} />
      </View>

      {skippedSections
        .sort((a, b) => a.start.displayedLocation - b.start.displayedLocation)
        .map((skippedSection: LocationInterval, index: number) => {
          return (
            <SkippedSectionSummary
              key={`${skippedSection.start.displayedLocation}-${skippedSection.end.displayedLocation}`}
              skippedSection={skippedSection}
            />
          );
        })}

      <TouchableOpacity style={styles(theme).addSkippedSection} onPress={openAddSkippedSection}>
        <Text style={styles(theme).addSkippedSectionText}>
          {t("advancedSettings:skippedSections.addSkippedSection")}
        </Text>
      </TouchableOpacity>
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
    addSkippedSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.primary,
    },
    addSkippedSectionText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });
