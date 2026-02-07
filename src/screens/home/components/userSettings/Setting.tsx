import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SettingProps = {
  showLabel: boolean;
  label: string;
  icon: string;
  isDisabled?: boolean;
  onPress: () => void;
};

export const Setting: React.FC<SettingProps> = ({ showLabel, icon, label, onPress, isDisabled = false }) => {
  const { getIcon, theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <TouchableOpacity
        style={[styles(theme).button, showLabel && styles(theme).buttonOpen, { opacity: isDisabled ? 0.5 : 1 }]}
        onPress={() => onPress()}
      >
        <Image style={styles(theme).image} source={getIcon(icon)} />
      </TouchableOpacity>
      {showLabel && <Text style={styles(theme).label}>{label}</Text>}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
    },
    button: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.secondaryBackground,
      width: 45,
      height: 45,
      borderRadius: 50,
    },
    image: { width: 20, height: 20 },
    label: {
      color: theme.text,
      backgroundColor: theme.secondaryBackground,
      padding: 5,
      borderRadius: 6,
    },
    buttonOpen: {
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3.84,
      elevation: 5,
    },
  });
