import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { FullStoreState, useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SkippedSectionSummary } from "./SkippedSectionSummary";

export const SkippedSections: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();
  const skippedSections = useUserSettingsStore((state: FullStoreState) => state.skippedSections);
  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);

  const openAddSkippedSection = () => {
    navigation.navigate("editSkippedSection", { isEditMode: false });
  };

  return (
    <ScrollView style={styles(theme).container}>
      <View style={{ ...styles(theme).mapContainer }}>
        <HikeProgressAnimation
          size={1}
          skippedSectionsDisplay={[
            ...getHikedLocationIntervals(skippedSections, {
              pathLocation: selectedHikeTotalDistance,
              displayedLocation: selectedHikeTotalDistance,
            }),
          ]}
        />
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
      paddingBottom: 100,
    },
    mapContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      minHeight: 140,
      marginBottom: 20,
      padding: 10,
      backgroundColor: theme.secondaryBackground,

      ...shadows.medium,
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
