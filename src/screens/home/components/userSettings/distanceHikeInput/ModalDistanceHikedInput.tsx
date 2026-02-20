import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import React, { useEffect, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, TextInput, View } from "react-native";

type ModalDistanceHikedInputProps = {
  isVisible: boolean;
  onClose: () => void;
};

export const ModalDistanceHikedInput: React.FC<ModalDistanceHikedInputProps> = ({ isVisible, onClose }) => {
  const currentLocation = useUserSettingsStore((s) => s.location);
  const setLocation = useUserSettingsStore((s) => s.setLocation);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);

  const { t } = useTranslation();
  const { theme } = useTheme();
  const [_location, _setLocation] = useState<number>(currentLocation.displayedLocation);

  useEffect(() => {
    _setLocation(currentLocation.displayedLocation);
  }, [currentLocation]);

  const onChangeDistanceHiked = (text: string) => {
    console.log(text);
    const parsed = parseInt(text, 10);
    if (!isNaN(parsed)) {
      const clamped = Math.max(0, Math.min(selectedHikeTotalDistance, parsed));
      _setLocation(clamped);
    } else {
      _setLocation(0);
    }
  };

  const updateDistanceHiked = () => {
    console.log(_location);
    setLocation(_location);
    onClose();
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
          <View style={styles(theme).container}>
            <View style={styles(theme).header}>
              <Text style={styles(theme).title}>{t("home:userSettings.distanceLabel")}</Text>
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
      width: "75%",
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
      display: "flex",
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
      flexDirection: "row",
      justifyContent: "space-between",
      paddingHorizontal: 12,
    },
    input: {
      fontSize: 26,
      color: theme.text,
    },
    measurementUnit: { marginLeft: 4, color: theme.text },
  });
