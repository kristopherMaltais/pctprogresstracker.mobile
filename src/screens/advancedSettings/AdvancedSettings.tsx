import { Setting } from "@/src/common/components/Setting";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SettingSection } from "./components/SettingSection";

export const AdvancedSettings: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();

  const openEditSkippedSection = () => navigation.navigate("skippedSections");
  const openEditHikeTotalDistance = () => navigation.navigate("editHikeTotalDistance");

  return (
    <ScrollView style={styles(theme).container}>
      <View style={styles(theme).body}>
        <SettingSection title={t("advancedSettings:hikeSettings.title")}>
          <Setting name={t("advancedSettings:skippedSections.title")} onSettingPress={openEditSkippedSection} />
          <Setting
            name={t("advancedSettings:editHikeTotalDistance.title")}
            onSettingPress={openEditHikeTotalDistance}
          />
        </SettingSection>
        <TouchableOpacity style={styles(theme).addSkippedSection} onPress={() => {}}>
          <Text style={styles(theme).addSkippedSectionText}>Delete preferences</Text>
        </TouchableOpacity>
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
    addSkippedSection: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.primary,
    },
    addSkippedSectionText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });
