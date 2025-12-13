import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { Slider } from "./Slider";

type PositionInputProps = {
  closePositionInput: () => void;
};

export const PositionInput: React.FC<PositionInputProps> = ({
  closePositionInput,
}) => {
  const { getIcon, theme } = useTheme();
  const { calibratePathDistanceHiked, displayedDistanceHiked } =
    useUserChoices();

  const unSaveChanges = () => {
    calibratePathDistanceHiked(displayedDistanceHiked);
    closePositionInput();
  };

  return (
    <View style={styles(theme).container}>
      <Slider onChange={calibratePathDistanceHiked} />
      <View style={styles(theme).buttonContainer}>
        <TouchableOpacity
          style={styles(theme).button}
          onPress={closePositionInput}
        >
          <Image style={styles(theme).save} source={getIcon("save")} />
        </TouchableOpacity>
        <TouchableOpacity style={styles(theme).button} onPress={unSaveChanges}>
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
