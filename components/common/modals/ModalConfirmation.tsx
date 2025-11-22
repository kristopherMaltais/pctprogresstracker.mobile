import React from "react";
import { useTranslation } from "react-i18next";
import { Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalConfirmationProps = {
  title: string;
  message: string;
  buttonText: string;
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ModalConfirmation: React.FC<ModalConfirmationProps> = ({
  isVisible,
  title,
  message,
  buttonText,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();
  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Text style={styles.message}>{message}</Text>
          </View>
          <View style={styles.buttonContainer}>
            <Pressable style={styles.confirmButton} onPress={onConfirm}>
              <Text style={{ color: "white", fontWeight: "bold" }}>
                {buttonText}
              </Text>
            </Pressable>
            <Pressable style={styles.cancelButton} onPress={onCancel}>
              <Text>{t("index:premium.button.cancel")}</Text>
            </Pressable>
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 16,
  },
  modalView: {
    margin: 20,
    width: "90%",
    height: 220,
    backgroundColor: "white",
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
  title: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
  },
  message: {},
  buttonContainer: {
    flexDirection: "row",
    marginTop: 60,
    alignItems: "flex-end",
    justifyContent: "flex-end",
  },
  confirmButton: {
    marginRight: 16,
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#FFCD3C",
  },
  cancelButton: {
    padding: 12,
    borderRadius: 10,
    backgroundColor: "#E8E8EE",
  },
});
