import { useCalibrationContext } from "@/src/contexts/calibration/CalibrationContext";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Slider } from "./Slider";

type PositionInputProps = {
  closeMenu: () => void;
};

export const PositionInput: React.FC<PositionInputProps> = ({ closeMenu }) => {
  const { getIcon, theme } = useTheme();
  const { saveCalibration, cancelCalibration } = useCalibrationContext();
  const pathLocation = useUserSettingsStore((s) => s.location.pathLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);

  return (
    <View style={styles(theme).container}>
      <Slider maximum={selectedHikeTotalDistance} value={pathLocation} />
      <View style={styles(theme).buttonContainer}>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={() => {
            saveCalibration();
            closeMenu();
          }}
        >
          <Image style={styles(theme).save} source={getIcon("save")} />
        </TouchableOpacity>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={() => {
            cancelCalibration();
            closeMenu();
          }}
        >
          <Image style={styles(theme).close} source={getIcon("close")} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      width: 50,
      borderRadius: 8,
      backgroundColor: theme.secondaryBackground,
    },
    close: {
      width: 20,
      height: 20,
    },
    save: {
      width: 20,
      height: 20,
    },
    buttonContainer: {
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: 35,
      height: 35,
    },
  });
