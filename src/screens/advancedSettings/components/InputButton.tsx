import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type InputButtonProps = {
  label: string;
  value: string;
  onPress: () => void;
};

export const InputButton: React.FC<InputButtonProps> = ({ label, value, onPress }) => {
  const { theme } = useTheme();

  return (
    <Pressable style={styles(theme).container} onPress={onPress}>
      <Text style={styles(theme).label}>{label}</Text>
      <View style={styles(theme).valueContainer}>
        <Text style={styles(theme).value}>{value}</Text>
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
    valueContainer: {
      paddingHorizontal: 12,
      paddingVertical: 6,
      borderRadius: 6,
      backgroundColor: theme.primary,
    },
    value: {
      fontSize: 14,
      fontWeight: "700",
      color: "white",
      textTransform: "uppercase",
    },
  });
