import { ConfirmationModal } from "@/src/common/components/modals/ConfirmationModal";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { FullStoreState, useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { LocationInterval } from "@/src/models/locationInterval";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type SkippedSectionSummaryProps = {
  skippedSection: LocationInterval;
};

export const SkippedSectionSummary: React.FC<SkippedSectionSummaryProps> = ({ skippedSection }) => {
  const { theme, getIcon } = useTheme();
  const { t } = useTranslation();

  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();
  const selectedHikeTotalDistance = useUserSettingsStore((state: FullStoreState) => state.selectedHikeTotalDistance);
  const deleteSkippedSection = useUserSettingsStore((state: FullStoreState) => state.deleteSkippedSection);
  const measurementUnit = useUserSettingsStore((state: FullStoreState) => state.measurementUnit);

  const [isConfirmModalVisible, setIsConfirmModalVisible] = useState<boolean>(false);

  const openEditSkippedSection = () => {
    navigation.navigate("editSkippedSection", { isEditMode: true, skippedSection: skippedSection });
  };

  const onDeleteSkippedSection = () => {
    deleteSkippedSection(skippedSection);
  };

  return (
    <>
      <Pressable style={styles(theme).container} onLongPress={() => setIsConfirmModalVisible(true)}>
        <View style={styles(theme).summary}>
          <View style={styles(theme).location}>
            <Text style={styles(theme).label}>{t("advancedSettings:skippedSections.start")}</Text>
            <Text style={styles(theme).value}>
              {skippedSection.start.displayedLocation * selectedHikeTotalDistance}
              {measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
            </Text>
          </View>
          <View style={styles(theme).location}>
            <Text style={styles(theme).label}>{t("advancedSettings:skippedSections.end")}</Text>
            <Text style={styles(theme).value}>
              {skippedSection.end.displayedLocation * selectedHikeTotalDistance}{" "}
              {measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
            </Text>
          </View>
        </View>
        <TouchableOpacity hitSlop={30} onPress={openEditSkippedSection}>
          <Image style={styles(theme).editIcon} source={getIcon("edit")} />
        </TouchableOpacity>
      </Pressable>
      <ConfirmationModal
        message={t("advancedSettings:skippedSections.confirmDelete.message")}
        title={t("advancedSettings:skippedSections.confirmDelete.title")}
        onConfirm={onDeleteSkippedSection}
        closeModal={() => setIsConfirmModalVisible(false)}
        isVisible={isConfirmModalVisible}
      />
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      paddingHorizontal: 16,
      paddingVertical: 12,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.secondaryBackground,
    },
    summary: {
      flex: 1,
      display: "flex",
      flexDirection: "row",
      gap: 24,
    },
    addSkippedSectionText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    label: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
    },
    value: {
      fontSize: 16,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    location: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      gap: 4,
      minWidth: 72,
    },
    editIcon: {
      width: 24,
      height: 24,
    },
  });
