import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { sanitizeNumericInput } from "@/src/helpers/sanitizeNumericInput";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";

type InputNumberProps = {
  value: number;
  onChange: (value: number) => void;
  unit?: string;
  label: string;
  autoFocus?: boolean;
  max?: number;
  decimals?: number;
};

export const InputNumber: React.FC<InputNumberProps> = ({
  value,
  onChange,
  unit,
  label,
  autoFocus,
  max,
  decimals = 0,
}) => {
  const { theme } = useTheme();
  const [text, setText] = useState<string>(value.toString());

  useEffect(() => {
    setText(value.toString());
  }, [value]);

  const handleOnChange = (input: string) => {
    const sanitized = sanitizeNumericInput(input, decimals);
    if (sanitized === null) return;

    setText(sanitized);

    const parsed = decimals > 0 ? parseFloat(sanitized) : parseInt(sanitized, 10);
    onChange(!isNaN(parsed) ? (max !== undefined ? Math.min(Math.max(0, parsed), max) : parsed) : 0);
  };

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).label}>{label}</Text>
      <View style={styles(theme).inputContainer}>
        <TextInput
          selection={{ start: text.length, end: text.length }}
          style={styles(theme).input}
          keyboardType={decimals > 0 ? "decimal-pad" : "numeric"}
          value={text}
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
