import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Platform, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type DatePickerModalProps = {
  isVisible: boolean;
  closeModal: () => void;
  onConfirm: (date: Date) => void;
  selectedDate: Date;
  title: string;
};

export const DatePickerModal: React.FC<DatePickerModalProps> = ({
  isVisible,
  closeModal,
  onConfirm,
  selectedDate,
  title,
}) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const [tempDate, setTempDate] = React.useState<Date>(selectedDate);

  React.useEffect(() => {
    if (isVisible) {
      setTempDate(selectedDate);
    }
  }, [isVisible, selectedDate]);

  const handleConfirm = () => {
    onConfirm(tempDate);
    closeModal();
  };

  const onDateChange = (event: any, date?: Date) => {
    if (date) {
      setTempDate(date);
    }
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible} onRequestClose={closeModal}>
      <Pressable style={styles(theme).centeredView} onPress={closeModal}>
        <View style={styles(theme).modalView}>
          <Text style={styles(theme).title}>{title}</Text>
          <View style={styles(theme).datePickerContainer}>
            <DateTimePicker
              value={tempDate}
              mode="date"
              display={Platform.OS === "ios" ? "spinner" : "default"}
              onChange={onDateChange}
              textColor={theme.text}
            />
          </View>
          <View style={styles(theme).action}>
            <TouchableOpacity style={styles(theme).cancelButton} hitSlop={30} onPress={closeModal}>
              <Text style={{ ...styles(theme).buttonText, color: theme.text }}>{t("common:cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(theme).confirmButton} hitSlop={30} onPress={handleConfirm}>
              <Text style={styles(theme).buttonText}>{t("common:save")}</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Pressable>
    </Modal>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 16,
    },
    modalView: {
      margin: 20,
      width: "94%",
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      paddingHorizontal: 24,
      paddingTop: 16,
      ...shadows.medium,
    },
    title: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 16,
      textAlign: "center",
    },
    datePickerContainer: {
      alignItems: "center",
      justifyContent: "center",
    },
    action: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      justifyContent: "flex-end",
      marginTop: 8,
    },
    confirmButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      paddingHorizontal: 8,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.primary,
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
    cancelButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      borderRadius: 8,
      marginBottom: 16,
      width: 100,
    },
  });
