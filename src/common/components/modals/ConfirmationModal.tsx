import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type ModalErrorProps = {
  title: string;
  message: string;
  isVisible: boolean;
  closeModal: () => void;
  onConfirm: () => void;
};

export const ConfirmationModal: React.FC<ModalErrorProps> = ({ isVisible, closeModal, message, title, onConfirm }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();

  const handleOnConfirm = () => {
    onConfirm();
    closeModal();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles(theme).centeredView} onPress={closeModal}>
        <View style={styles(theme).modalView}>
          <View style={styles(theme).header}>
            <Text style={styles(theme).title}>{title}</Text>
          </View>
          <View>
            <Text style={styles(theme).message}>{message}</Text>
          </View>
          <View style={styles(theme).action}>
            <TouchableOpacity style={styles(theme).cancelButton} hitSlop={30} onPress={closeModal}>
              <Text style={styles(theme).buttonText}>{t("common:cancel")}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles(theme).confirmButton} hitSlop={30} onPress={handleOnConfirm}>
              <Text style={styles(theme).buttonText}>{t("common:delete")}</Text>
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
      width: "90%",
      backgroundColor: theme.secondaryBackground,
      borderRadius: 20,
      padding: 24,
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    message: {
      fontWeight: "bold",
      color: theme.text,
    },
    header: {
      marginBottom: 16,
    },
    title: {
      fontSize: 16,
      fontWeight: "500",
      color: theme.text,
      marginBottom: 10,
      textTransform: "uppercase",
    },
    action: {
      display: "flex",
      flexDirection: "row",
      gap: 4,
      justifyContent: "flex-end",
      marginTop: 40,
    },
    confirmButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingVertical: 8,
      borderRadius: 8,
      marginBottom: 16,
      width: 100,
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
