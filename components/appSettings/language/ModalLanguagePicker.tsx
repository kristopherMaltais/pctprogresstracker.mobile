import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalLanguagePickerProps = {
  title: string;
  isVisible: boolean;
  onLanguageChange: (language: string) => void;
  onClose: () => void;
};

export const ModalLanguagePicker: React.FC<ModalLanguagePickerProps> = ({
  isVisible,
  title,
  onLanguageChange,
  onClose,
}) => {
  //   const { t, currentLanguage } = useLocalization();

  const { i18n, t } = useTranslation();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles.centeredView} onPress={onClose}>
        <View style={styles.modalView}>
          <View>
            <Text style={styles.title}>{title}</Text>
          </View>
          <View>
            <Pressable
              testID="fr-pressable"
              style={{
                ...styles.languageButton,
                borderWidth: i18n.language == "fr" ? 1 : 0,
                borderColor: "black",
              }}
              onPress={() => onLanguageChange("fr")}
            >
              <Image
                source={require("../../../assets/images/quebecFlagLanguagePicker.png")}
                style={styles.image}
              />
              <Text style={styles.language}>
                {t("settings:language.french")}
              </Text>
            </Pressable>
            <Pressable
              testID="en-pressable"
              style={{
                ...styles.languageButton,
                borderWidth: i18n.language == "en" ? 1 : 0,
                borderColor: "black",
              }}
              onPress={() => onLanguageChange("en")}
            >
              <Image
                source={require("../../../assets/images/usaFlagLanguagePicker.png")}
                style={styles.image}
              />
              <Text style={styles.language}>
                {t("settings:language.english")}
              </Text>
            </Pressable>
          </View>
        </View>
      </Pressable>
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
  image: {
    width: 45,
    height: 45,
    borderRadius: 30,
    marginRight: 16,
  },
  title: {
    marginBottom: 15,
    fontWeight: "bold",
    fontSize: 16,
    color: "black",
  },
  languageButton: {
    flexDirection: "row",
    marginBottom: 10,
    alignItems: "center",
    borderRadius: 15,
    padding: 8,
    borderColor: "white",
  },
  language: {
    color: "black",
  },
});
