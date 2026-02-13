import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text, View } from "react-native";

type ActionsProps = {
  onSave: () => void;
};

export const Actions: React.FC<ActionsProps> = ({ onSave }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();

  const onCancel = () => navigation.goBack();

  return (
    <View style={styles(theme).container}>
      <Pressable style={styles(theme).cancelButton} onPress={onCancel}>
        <Text style={{ color: theme.text, fontWeight: "500" }}>{t("common:cancel")}</Text>
      </Pressable>
      <Pressable style={[styles(theme).saveButton, { backgroundColor: theme.primary }]} onPress={onSave}>
        <Text style={styles(theme).saveButtonText}>{t("common:save")}</Text>
      </Pressable>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      marginTop: 30,
      justifyContent: "space-between",
      alignItems: "center",
    },
    cancelButton: {
      padding: 16,
      flex: 1,
      alignItems: "center",
    },
    saveButton: {
      padding: 16,
      borderRadius: 12,
      flex: 2,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 4 },
      shadowOpacity: 0.2,
      shadowRadius: 5,
    },
    saveButtonText: {
      color: "#FFF",
      fontWeight: "bold",
      fontSize: 16,
    },
  });
