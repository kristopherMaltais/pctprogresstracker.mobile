import { HikeProgressAnimation } from "@/src/common/components/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { Location } from "@/src/models/location";
import { LocationInterval } from "@/src/models/locationInterval";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Actions } from "../Actions";
import { BoundaryInput } from "./BoundaryInput";

export const EditHikeBoundaries: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const selectedHikeTotalDistance = useUserSettingsStore((state) => state.selectedHikeTotalDistance);
  const measurementUnit = useUserSettingsStore((state) => state.measurementUnit);
  const skippedSections = useUserSettingsStore((state) => state.skippedSections);
  const addSkippedSection = useUserSettingsStore((state) => state.addSkippedSection);

  const getStartLocation = () => {
    let location: Location = { displayedLocation: 0, pathLocation: 0 };

    const skippedSectionFound = skippedSections.find(
      (skippedSection: LocationInterval) => skippedSection.start.displayedLocation == 0
    );

    if (skippedSectionFound) {
      location.displayedLocation = skippedSectionFound.end.displayedLocation;
      location.pathLocation = skippedSectionFound.end.pathLocation;
    }

    return location;
  };

  const getEndLocation = () => {
    let location: Location = { displayedLocation: 0, pathLocation: 0 };

    const skippedSectionFound = skippedSections.find(
      (skippedSection: LocationInterval) => skippedSection.start.displayedLocation == 1
    );

    if (skippedSectionFound) {
      location.displayedLocation = skippedSectionFound.start.displayedLocation;
      location.pathLocation = skippedSectionFound.start.pathLocation;
    }

    return location;
  };

  const [_startLocation, _setStartLocation] = useState<Location>(getStartLocation());
  const [_endLocation, _setEndLocation] = useState<Location>(getEndLocation());

  const handleStartDisplayChange = (value: number) => {
    _setStartLocation((prev) => ({
      pathLocation: value,
      displayedLocation: value,
    }));
  };

  const handleStartPathChange = (value: number) => {
    _setStartLocation((prev) => ({
      ...prev,
      pathLocation: value,
    }));
  };

  const handleEndDisplayChange = (value: number) => {
    _setEndLocation((prev) => ({
      pathLocation: value,
      displayedLocation: value,
    }));
  };

  const handleEndPathChange = (value: number) => {
    _setEndLocation((prev) => ({
      ...prev,
      pathLocation: value,
    }));
  };

  const onSaveHikeBoundaries = () => {
    const startSkippedSection: LocationInterval = {
      start: { pathLocation: 0, displayedLocation: 0 },
      end: _startLocation,
    };

    const endSkippedSection: LocationInterval = {
      start: _endLocation,
      end: { pathLocation: 1, displayedLocation: 1 },
    };

    addSkippedSection(startSkippedSection);
    addSkippedSection(endSkippedSection);
  };

  return (
    <ScrollView style={styles(theme).container}>
      <Text style={styles(theme).title}>{t("advancedSettings:editHikeBoundaries.title")}</Text>
      <View style={styles(theme).mapContainer}>
        <HikeProgressAnimation size={1} start={_startLocation.pathLocation} end={_endLocation.pathLocation} />
      </View>
      <BoundaryInput
        value={_startLocation}
        max={selectedHikeTotalDistance}
        onDisplayedLocationChange={handleStartDisplayChange}
        onPathLocationchange={handleStartPathChange}
        autoFocus
        label={t("advancedSettings:editHikeBoundaries.start")}
        unit={measurementUnit}
      />
      <BoundaryInput
        value={_endLocation}
        max={selectedHikeTotalDistance}
        onDisplayedLocationChange={handleEndDisplayChange}
        onPathLocationchange={handleEndPathChange}
        label={t("advancedSettings:editHikeBoundaries.end")}
        unit={measurementUnit}
      />
      <View style={styles(theme).noteContainer}>
        <Text style={styles(theme).note}>{t("advancedSettings:editHikeBoundaries.notes")}</Text>
      </View>
      <Actions onSave={onSaveHikeBoundaries} />
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
    },
    noteContainer: {
      paddingHorizontal: 12,
    },
  });
