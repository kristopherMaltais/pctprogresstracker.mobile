import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import MaterialCommunityIcons from "@expo/vector-icons/build/MaterialCommunityIcons";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type InputNumberProps = {
  checked: Boolean;
  toggleChecked: (value: boolean) => void;
  label: string;
};

export const InputCheckbox: React.FC<InputNumberProps> = ({ checked, toggleChecked, label }) => {
  const { theme } = useTheme();

  return (
    <Pressable style={styles(theme).container} onPress={() => toggleChecked(!checked)}>
      <Text style={styles(theme).label}>{label}</Text>
      <View style={[styles(theme).checkbox, checked && { backgroundColor: theme.primary, borderColor: theme.primary }]}>
        {checked && <MaterialCommunityIcons name="check" size={14} color={"white"} />}
      </View>
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      marginBottom: 20,
      paddingHorizontal: 4,
    },
    label: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    checkbox: {
      width: 20,
      height: 20,
      borderRadius: 4,
      borderWidth: 2,
      borderColor: theme.primary,
      justifyContent: "center",
      alignItems: "center",
    },
  });
