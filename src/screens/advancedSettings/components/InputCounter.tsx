import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { Pressable, StyleSheet, Text, View } from "react-native";

type InputCounterProps = {
  label: string;
  value: number;
  onChange: (value: number) => void;
  min?: number;
};

export const InputCounter: React.FC<InputCounterProps> = ({ label, value, onChange, min = 0 }) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).label}>{label}</Text>
      <View style={styles(theme).controls}>
        <Pressable hitSlop={20} style={styles(theme).button} onPress={() => onChange(Math.max(min, value - 1))}>
          <Text style={styles(theme).buttonText}>−</Text>
        </Pressable>
        <Text style={styles(theme).value}>{value}</Text>
        <Pressable hitSlop={20} style={styles(theme).button} onPress={() => onChange(value + 1)}>
          <Text style={styles(theme).buttonText}>+</Text>
        </Pressable>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
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
    controls: {
      flexDirection: "row",
      alignItems: "center",
      gap: 12,
    },
    button: {
      width: 10,
      height: 32,
      borderRadius: 6,
      justifyContent: "center",
      alignItems: "center",
    },
    buttonText: {
      color: theme.text,
      fontSize: 18,
      fontWeight: "700",
      lineHeight: 20,
      opacity: 0.4,
    },
    value: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      minWidth: 40,
      textAlign: "center",
    },
  });
