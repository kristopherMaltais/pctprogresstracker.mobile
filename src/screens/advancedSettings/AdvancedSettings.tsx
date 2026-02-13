import { Setting } from "@/src/common/components/Setting";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SettingSection } from "./components/SettingSection";

export const AdvancedSettings: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const openEditHikeBoundaries = () => navigation.navigate("editHikeBoundaries");
  const openEditSkippedSection = () => navigation.navigate("editSkippedSections");

  return (
    <ScrollView style={styles(theme).container}>
      <View style={{ ...styles(theme).header, backgroundColor: isDarkMode ? theme.primary : theme.path }}>
        <Text style={styles(theme).headerTitle}>{t("advancedSettings:screenTitle")}</Text>
      </View>
      <View style={styles(theme).body}>
        <SettingSection title="Path setting">
          <Setting name="Edit hike boundaries" onSettingPress={openEditHikeBoundaries} />
          <Setting name="Edit skipped sections" onSettingPress={openEditSkippedSection} />
        </SettingSection>
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
    body: {
      display: "flex",
      flex: 1,
      gap: 16,
      padding: 16,
      paddingTop: 24,
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
