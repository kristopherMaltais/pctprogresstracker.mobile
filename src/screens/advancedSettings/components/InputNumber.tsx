import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputNumberProps = {
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  label: string;
  autoFocus?: boolean;
  max?: number;
};

export const InputNumber: React.FC<InputNumberProps> = ({ value, onChange, unit, label, autoFocus, max }) => {
  const { theme } = useTheme();

  const stringValue = value.toString();

  const handleOnChange = (value: string) => {
    if (max) {
      onChange(Math.min(Math.max(0, Number(value)), max));
    } else {
      onChange(Number(value));
    }
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).label}>{label}</Text>
      <View style={styles(theme).inputContainer}>
        <TextInput
          selection={{ start: stringValue.length, end: stringValue.length }}
          style={styles(theme).input}
          keyboardType="numeric"
          value={value.toString()}
          onChangeText={handleOnChange}
          autoFocus={autoFocus}
        />
        {unit && <Text style={styles(theme).unitText}>{unit}</Text>}
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
    inputContainer: {
      flexDirection: "row",
      alignItems: "baseline",
    },
    input: {
      fontSize: 24,
      fontWeight: "800",
      color: theme.text,
      paddingHorizontal: 4,
      textAlign: "right",
      minWidth: 70,
    },
    unitText: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginLeft: 4,
      opacity: 0.4,
    },
  });
