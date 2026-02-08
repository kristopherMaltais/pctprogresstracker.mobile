import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";

type SettingSectionProps = {
  title: string;
  children: React.ReactNode[] | React.ReactNode;
};

export const SettingSection: React.FC<SettingSectionProps> = ({ title, children }) => {
  const { theme, isDarkMode } = useTheme();

  return (
    <View style={{ ...styles(theme).container, borderWidth: isDarkMode ? 0 : 0.5 }}>
      <View style={styles(theme).header}>
        <Text style={styles(theme).title}>{title}</Text>
      </View>
      {children}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.secondaryBackground,
      borderColor: theme.path,
      borderRadius: 12,
      padding: 16,

      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 4,
      },
      shadowOpacity: 0.1,
      shadowRadius: 6,
      elevation: 5,
    },
    header: {
      display: "flex",
      marginBottom: 30,
      paddingTop: 4,
    },
    title: {
      color: theme.text,
      fontWeight: "500",
      fontSize: 18,
    },
  });
