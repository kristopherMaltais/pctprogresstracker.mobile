// App.tsx
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

export const AdvancedSettings: React.FC = () => {
  const { theme, isDarkMode } = useTheme();

  return (
    <ScrollView style={styles(theme).container}>
      <View style={{ ...styles(theme).header, backgroundColor: isDarkMode ? theme.primary : theme.path }}>
        <Text style={styles(theme).headerTitle}>Advanced settings</Text>
      </View>
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    header: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      backgroundColor: theme.path,
      paddingVertical: 16,
    },
    headerTitle: {
      color: "white",
      fontSize: 14,
      fontWeight: "500",
      textTransform: "uppercase",
    },
  });
