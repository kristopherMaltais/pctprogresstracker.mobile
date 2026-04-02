import { DatePickerModal } from "@/src/common/components/modals/DatePickerModal";
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StartDatePickerProps = {
  selectedDate: Date | undefined;
  onDateSelect: (date: Date) => void;
};

export const StartDatePicker: React.FC<StartDatePickerProps> = ({ selectedDate, onDateSelect }) => {
  const { theme } = useTheme();
  const { t, i18n } = useTranslation();
  const [showModal, setShowModal] = useState(false);

  const formatDate = (date: Date): string => {
    return date.toLocaleDateString(i18n.language === "fr" ? "fr-CA" : "en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleConfirm = (date: Date) => {
    onDateSelect(date);
  };

  const handleOpenModal = () => {
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <View style={styles(theme).container}>
      {selectedDate ? (
        <TouchableOpacity style={styles(theme).dateDisplay} onPress={handleOpenModal}>
          <Text style={styles(theme).dateText}>Starting on {formatDate(selectedDate)}</Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity style={styles(theme).button} onPress={handleOpenModal}>
          <Text style={styles(theme).chooseButtonText}>{t("hikeSearch:detail.chooseStartDate")}</Text>
        </TouchableOpacity>
      )}

      <DatePickerModal
        isVisible={showModal}
        closeModal={handleCloseModal}
        onConfirm={handleConfirm}
        selectedDate={selectedDate || new Date()}
        title={t("hikeSearch:detail.selectStartDate")}
      />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingHorizontal: 16,
      marginVertical: 16,
    },
    label: {
      fontSize: 14,
      fontWeight: "600",
      color: theme.text,
      marginBottom: 8,
    },
    button: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      ...shadows.medium,
    },
    chooseButtonText: {
      fontSize: 16,
      color: theme.text,
    },
    dateDisplay: {
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      paddingVertical: 14,
      paddingHorizontal: 16,
      alignItems: "center",
      ...shadows.medium,
    },
    dateText: {
      fontSize: 16,
      color: theme.text,
    },
  });
