import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type BadgeProps = {
  label: string;
  value: string;
};

export const Badge: React.FC<BadgeProps> = ({ label, value }) => {
  const { theme } = useTheme();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).label}>{label}</Text>
      <Text style={styles(theme).value}>{value}</Text>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryBackground,
      paddingHorizontal: 12,
      paddingVertical: 8,
      borderRadius: 8,
      alignItems: "center",
      justifyContent: "center",
      minWidth: 100,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 1 },
      shadowOpacity: 0.1,
      shadowRadius: 2,
      elevation: 2,
    },
    label: {
      fontSize: 11,
      fontWeight: "600",
      color: theme.text,
      opacity: 0.6,
      textTransform: "uppercase",
      letterSpacing: 0.5,
      marginBottom: 4,
    },
    value: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
  });
