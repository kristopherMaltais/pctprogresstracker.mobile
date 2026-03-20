import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { kilometerToMile, mileToKilometer } from "@/src/helpers/computeDistances";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { useNavigation } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { DistanceHikedModeInfo } from "./DistanceHikedModeInfo";

type ModalDistanceHikedInputProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalDistanceHikedInput: React.FC<ModalDistanceHikedInputProps> = ({ isVisible, onClose }) => {
  const [isInfoModeActivated, setIsActivatedModeActivated] = useState<boolean>(false);

  const currentLocation = useUserSettingsStore((s) => s.location);
  const setLocation = useUserSettingsStore((s) => s.setLocation);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  const navigation = useNavigation<any>();
  const { t } = useTranslation();
  const { theme, getIcon } = useTheme();
  const [_location, _setLocation] = useState<number>(
    measurementUnit == MeasurementUnit.KILOMETER
      ? currentLocation.displayedLocation
      : kilometerToMile(currentLocation.displayedLocation)
  );

  useEffect(() => {
    _setLocation(
      measurementUnit == MeasurementUnit.KILOMETER
        ? currentLocation.displayedLocation
        : kilometerToMile(currentLocation.displayedLocation)
    );
  }, [currentLocation, measurementUnit]);

  const onChangeDistanceHiked = (text: string) => {
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(0, Math.min(selectedHikeTotalDistance, parsed));
      _setLocation(clamped);
    } else {
      _setLocation(0);
    }
  };

  const updateDistanceHiked = () => {
    setLocation(measurementUnit == MeasurementUnit.MILE ? mileToKilometer(_location) : _location);
    setIsActivatedModeActivated(false);
    onClose();
  };

  const openDistanceHikedInputModes = () => {
    setIsActivatedModeActivated(false);
    onClose();
    navigation.navigate("advancedSettings", {
      screen: "distanceHikedInputModes",
    });
  };

  const inputRef = useRef<TextInput>(null);

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
      <Pressable style={styles(theme).centeredView} onPress={updateDistanceHiked} accessible={false}>
        <View style={styles(theme).modalView}>
          {isInfoModeActivated ? (
            <DistanceHikedModeInfo
              onCloseInfo={() => setIsActivatedModeActivated(false)}
              navigateToDistanceHikedInputModes={openDistanceHikedInputModes}
            />
          ) : (
            <View style={styles(theme).container}>
              <View style={styles(theme).header}>
                <Text style={styles(theme).title}>
                  {t("home:userSettings.distanceInput.markerMode.label", {
                    unitMeasurement: getMeasurementUnit(measurementUnit),
                  })}
                </Text>
                <Pressable
                  style={styles(theme).iconContainer}
                  onPress={() => setIsActivatedModeActivated(true)}
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
                  onChangeText={onChangeDistanceHiked}
                  returnKeyType="done"
                  onSubmitEditing={updateDistanceHiked}
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
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
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
