import { ConfirmationModal } from "@/src/common/components/modals/ConfirmationModal";
import { Setting } from "@/src/common/components/Setting";
import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { SettingSection } from "./components/SettingSection";

export const AdvancedSettings: React.FC = () => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const { isPremiumUnlocked } = usePremium();
  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();
  const openEditSkippedSection = () => navigation.navigate("skippedSections");
  const openEditHikeTotalDistance = () => navigation.navigate("editHikeTotalDistance");
  const resetStore = useUserSettingsStore((s) => s.resetStore);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);

  return (
    <ScrollView style={styles(theme).container}>
      <View style={styles(theme).body}>
        <SettingSection title={t("advancedSettings:hikeSettings.title")}>
          <Setting
            isLocked={!isPremiumUnlocked}
            name={t("advancedSettings:skippedSections.title")}
            onSettingPress={openEditSkippedSection}
          />
          <Setting
            name={t("advancedSettings:editHikeTotalDistance.title")}
            onSettingPress={openEditHikeTotalDistance}
          />
        </SettingSection>
        <TouchableOpacity style={styles(theme).addSkippedSection} onPress={() => setIsConfirmModalVisible(true)}>
          <Text style={styles(theme).addSkippedSectionText}>{t("advancedSettings:resetSettings.title")}</Text>
        </TouchableOpacity>
      </View>
      <ConfirmationModal
        confirmTitle={t("advancedSettings:resetSettings.confirmButton")}
        isVisible={isConfirmModalVisible}
        title={t("advancedSettings:resetSettings.title")}
        message={t("advancedSettings:resetSettings.message")}
        onConfirm={resetStore}
        closeModal={() => setIsConfirmModalVisible(false)}
      />
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
