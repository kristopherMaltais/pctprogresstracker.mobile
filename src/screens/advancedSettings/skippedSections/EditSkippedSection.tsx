import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useValidation } from "@/src/contexts/validation/ValidationContextProvider";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "../components/Actions";
import { BoundaryInput } from "./BoundaryInput";

export const EditSkippedSection: React.FC = () => {
  const { params } = useRoute<RouteProp<AdvancedSettingsStackParamList, "editSkippedSection">>();
  const navigation = useNavigation();
  const { showErrorModal } = useValidation();

  const { theme } = useTheme();
  const { t } = useTranslation();

  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);
  const addSkippedSection = useUserSettingsStore((state) => state.addSkippedSection);
  const editSkippedSection = useUserSettingsStore((state) => state.editSkippedSection);
  const skippedSections = useUserSettingsStore((state) => state.skippedSections);

  const getInitialSkippedSection = (): LocationInterval => {
    if (params.isEditMode && params.skippedSection) {
      return params.skippedSection;
    }
    return {
      start: { displayedLocation: 0, pathLocation: 0 },
      end: { displayedLocation: 0, pathLocation: 0 },
    };
  };

  const [skippedSection, setSkippedSection] = useState<LocationInterval>(getInitialSkippedSection());

  const handleStartDisplayChange = (value: number) => {
    setSkippedSection((prev) => ({
      ...prev,
      start: { displayedLocation: value, pathLocation: value },
    }));
  };

  const handleStartPathChange = (value: number) => {
    setSkippedSection((prev) => ({
      ...prev,
      start: { ...prev.start, pathLocation: value },
    }));
  };

  const handleEndDisplayChange = (value: number) => {
    setSkippedSection((prev) => ({
      ...prev,
      end: { displayedLocation: value, pathLocation: value },
    }));
  };

  const handleEndPathChange = (value: number) => {
    setSkippedSection((prev) => ({
      ...prev,
      end: { ...prev.end, pathLocation: value },
    }));
  };

  const onSaveSkippedSection = () => {
    const newStart = skippedSection.start.displayedLocation;
    const newEnd = skippedSection.end.displayedLocation;

    if (newStart >= newEnd) {
      showErrorModal(t("advancedSettings:editSkippedSection.errors.endBeforeStart"));
      return;
    }

    const otherSections =
      params.isEditMode && params.skippedSection
        ? skippedSections.filter(
            (s) =>
              s.start.displayedLocation !== params.skippedSection!.start.displayedLocation ||
              s.end.displayedLocation !== params.skippedSection!.end.displayedLocation
          )
        : skippedSections;

    const hasOverlap = otherSections.some((section) => {
      const sStart = section.start.displayedLocation;
      const sEnd = section.end.displayedLocation;

      return newStart < sEnd && newEnd > sStart;
    });

    if (hasOverlap) {
      showErrorModal(t("advancedSettings:editSkippedSection.errors.overlap"));
      return;
    }

    if (params.isEditMode && params.skippedSection) {
      editSkippedSection(params.skippedSection, skippedSection);
    } else {
      addSkippedSection(skippedSection);
    }

    navigation.goBack();
  };

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>
        {t(`advancedSettings:editSkippedSection.${params.isEditMode ? "titleEdit" : "titleAdd"}`)}
      </Text>

      <View style={styles(theme).mapContainer}>
        {skippedSection && (
          <HikeProgressAnimation
            size={1}
            skippedSectionsDisplay={[
              ...getHikedLocationIntervals([skippedSection], {
                pathLocation: selectedHikeTotalDistance,
                displayedLocation: selectedHikeTotalDistance,
              }),
            ]}
          />
        )}
      </View>

      <BoundaryInput
        value={skippedSection.start}
        max={selectedHikeTotalDistance}
        onDisplayedLocationChange={handleStartDisplayChange}
        onPathLocationchange={handleStartPathChange}
        label={t("advancedSettings:editSkippedSection.start")}
        unit={measurementUnit}
        autoFocus
      />

      <BoundaryInput
        value={skippedSection.end}
        max={selectedHikeTotalDistance}
        onDisplayedLocationChange={handleEndDisplayChange}
        onPathLocationchange={handleEndPathChange}
        label={t("advancedSettings:editSkippedSection.end")}
        unit={measurementUnit}
      />

      <View style={styles(theme).noteContainer}>
        <Text style={styles(theme).note}>{t("advancedSettings:editSkippedSection.notes")}</Text>
      </View>

      <Actions onSave={onSaveSkippedSection} />
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
    note: {
      color: theme.text,
      marginTop: 20,
    },
    noteContainer: {
      paddingHorizontal: 12,
    },
  });
