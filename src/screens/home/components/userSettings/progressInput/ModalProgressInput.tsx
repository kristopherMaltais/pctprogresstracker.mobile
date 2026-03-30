import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile, mileToKilometer } from "@/src/helpers/computeDistances";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { ProgressModes } from "@/src/models/progressModes";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { ProgressInputInfo } from "./ProgressInputInfo";

type ModalProgressInputProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalProgressInput: React.FC<ModalProgressInputProps> = ({ isVisible, onClose }) => {
  const inputRef = useRef<TextInput>(null);
  const [isInfoModeActivated, setIsInfoModeActivated] = useState<boolean>(false);
  const currentLocation = useUserSettingsStore((s) => s.location);
  const setLocation = useUserSettingsStore((s) => s.setLocation);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const progressMode = useUserSettingsStore((s) => s.progressMode);
  const distanceHiked = useUserSettingsStore((s) => s.distanceHiked);
  const setDistanceHiked = useUserSettingsStore((s) => s.setDistanceHiked);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { theme, getIcon } = useTheme();

  const getTest = () => {
    if (progressMode == ProgressModes.MANUAL) {
      return measurementUnit == MeasurementUnit.MILE ? kilometerToMile(distanceHiked) : distanceHiked;
    } else {
      return measurementUnit == MeasurementUnit.MILE
        ? kilometerToMile(currentLocation.displayedLocation)
        : currentLocation.displayedLocation;
    }
  };

  const [_location, _setLocation] = useState<number>(getTest());

  useEffect(() => {
    _setLocation(getTest());
  }, [currentLocation, measurementUnit]);

  const onProgressionChange = (text: string) => {
    const parsed = parseInt(text, 10);
    const max = selectedHikeTotalDistance;

    if (!isNaN(parsed)) {
      const clamped = Math.max(0, Math.min(max, parsed));
      _setLocation(clamped);
    } else {
      _setLocation(0);
    }
  };

  const updateProgression = () => {
    if (progressMode == ProgressModes.MANUAL) {
      const convertedDistance = measurementUnit == MeasurementUnit.MILE ? mileToKilometer(_location) : _location;
      setDistanceHiked(convertedDistance);
      setLocation(calculateManualDistance(convertedDistance));
    } else {
      setLocation(measurementUnit == MeasurementUnit.MILE ? mileToKilometer(_location) : _location);
    }
    setIsInfoModeActivated(false);
    onClose();
  };

  const calculateManualDistance = (progress: number): number => {
    const sortedSkippedSections = [...skippedSections].sort(
      (a, b) => a.start.displayedLocation - b.start.displayedLocation
    );
    let currentPathLocation = 0;
    let remainingBudget = progress;

    for (const skippedSection of sortedSkippedSections) {
      const distanceUntilNextSkip = skippedSection.start.displayedLocation - currentPathLocation;

      if (remainingBudget <= distanceUntilNextSkip) {
        break;
      }

      remainingBudget -= distanceUntilNextSkip;
      currentPathLocation = skippedSection.end.displayedLocation;
    }

    return currentPathLocation + remainingBudget;
  };

  const openProgressInputModes = () => {
    setIsInfoModeActivated(false);
    onClose();
    navigation.navigate("advancedSettings", {
      screen: "progressInputModes",
    });
  };

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onShow={() => {
        setTimeout(() => {
          inputRef.current?.focus();
        }, 100);
      }}
    >
      <Pressable style={styles(theme).centeredView} onPress={updateProgression} accessible={false}>
        <View style={styles(theme).modalView}>
          {isInfoModeActivated ? (
            <ProgressInputInfo
              onCloseInfo={() => setIsInfoModeActivated(false)}
              navigateToProgressInputModes={openProgressInputModes}
            />
          ) : (
            <View style={styles(theme).container}>
              <View style={styles(theme).header}>
                <Text style={styles(theme).title}>
                  {t(`home:userSettings.progressInput.${progressMode}.label`, { unitMeasurement: measurementUnit })}
                </Text>
                <Pressable
                  style={styles(theme).iconContainer}
                  onPress={() => setIsInfoModeActivated(true)}
                  hitSlop={20}
                >
                  <Image style={styles(theme).icon} source={getIcon("info")} />
                </Pressable>
              </View>
              <View style={styles(theme).inputContainer}>
                <TextInput
                  ref={inputRef}
                  style={styles(theme).input}
                  keyboardType="numeric"
                  value={_location.toString()}
                  onChangeText={onProgressionChange}
                  returnKeyType="done"
                  onSubmitEditing={updateProgression}
                />
                <Text style={styles(theme).measurementUnit}>{getMeasurementUnit(measurementUnit)}</Text>
              </View>
            </View>
          )}
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    modalView: {
      margin: 20,
      width: "90%",
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      padding: 16,
      ...shadows.medium,
    },
    header: {
      position: "relative",
      display: "flex",
      flexDirection: "row",
      gap: 8,
      alignItems: "center",
      justifyContent: "center",
    },
    title: {
      color: theme.text,
      fontWeight: "700",
      letterSpacing: 1,
      textTransform: "uppercase",
      fontSize: 10,
    },
    inputContainer: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
    },
    container: {
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      gap: 8,
      paddingHorizontal: 12,
    },
    input: {
      fontSize: 26,
      color: theme.text,
    },
    iconContainer: {
      position: "absolute",
      top: -4,
      right: -14,
    },
    icon: {
      width: 20,
      height: 20,
    },
    measurementUnit: { marginLeft: 4, color: theme.text },
  });
