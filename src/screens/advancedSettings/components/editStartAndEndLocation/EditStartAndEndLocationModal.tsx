import { HikeProgressAnimation } from "@/src/common/components/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Slider } from "../Slider";

type EditStartAndEndLocationProps = {
  isVisible: boolean;
  onCancel: () => void;
  onSave: () => void;
};

export const EditStartAndEndLocationModal: React.FC<EditStartAndEndLocationProps> = ({
  isVisible,
  onCancel,
  onSave,
}) => {
  const { t } = useTranslation();
  const { theme, isDarkMode } = useTheme();
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  const [startLocation, setStartLocation] = useState<number>(0);
  const [endLocation, setEndLocation] = useState<number>(1);

  const updateStartLocation = (newStartLocation: number) => {
    setStartLocation(newStartLocation / selectedHikeTotalDistance);
  };

  const updateEndLocation = (newEndLocation: number) => {
    setEndLocation(newEndLocation / selectedHikeTotalDistance);
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles(theme).centeredView} onPress={() => {}}>
        <View style={styles(theme).modalView}>
          <Text style={styles(theme).title}>What are your start and end location ?</Text>
          <View style={{ ...styles(theme).mapContainer, backgroundColor: isDarkMode ? theme.background : "#E0E0E0" }}>
            <HikeProgressAnimation size={1} start={startLocation} end={endLocation} />
          </View>
          <Slider onChange={updateStartLocation} maximum={selectedHikeTotalDistance} />
          <Slider onChange={updateEndLocation} maximum={selectedHikeTotalDistance} />
          <View style={styles(theme).buttonContainer}>
            <Pressable style={styles(theme).cancelButton} onPress={onCancel}>
              <Text>{t("common:cancel")}</Text>
            </Pressable>
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
      marginTop: 16,
    },
    mapContainer: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      marginTop: 20,
      borderRadius: 12,
      padding: 8,
      minHeight: 200,
    },
    modalView: {
      margin: 20,
      width: "92%",
      minHeight: "75%",
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    title: {
      marginBottom: 15,
      fontWeight: "bold",
      fontSize: 16,
      color: theme.text,
    },
    buttonContainer: {
      flexDirection: "row",
      marginTop: 20,
      alignItems: "flex-end",
      justifyContent: "flex-end",
    },
    cancelButton: {
      padding: 12,
      borderRadius: 10,
      backgroundColor: theme.tertiaryBackground,
    },
  });
