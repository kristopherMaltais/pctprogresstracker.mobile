import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
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
  const { i18n, t } = useTranslation();
  const { getIcon, theme } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <Pressable style={styles(theme).centeredView} onPress={onClose}>
        <View style={styles(theme).modalView}>
          <View>
            <Text style={styles(theme).title}>{title}</Text>
          </View>
          <View>
            <Pressable
              style={{
                ...styles(theme).languageButton,
                borderWidth: i18n.language == "fr" ? 1 : 0,
                borderColor: theme.text,
              }}
              onPress={() => onLanguageChange("fr")}
            >
              <Image source={getIcon("quebecFlag")} style={styles(theme).image} />
              <Text style={styles(theme).language}>{t("index:settings.language.french")}</Text>
            </Pressable>
            <Pressable
              testID="en-pressable"
              style={{
                ...styles(theme).languageButton,
                borderWidth: i18n.language == "en" ? 1 : 0,
                borderColor: theme.text,
              }}
              onPress={() => onLanguageChange("en")}
            >
              <Image source={getIcon("usaFlag")} style={styles(theme).image} />
              <Text style={styles(theme).language}>{t("index:settings.language.english")}</Text>
            </Pressable>
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
      height: 220,
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
      color: theme.text,
    },
    languageButton: {
      flexDirection: "row",
      marginBottom: 10,
      alignItems: "center",
      borderRadius: 15,
      padding: 8,
    },
    language: {
      color: theme.text,
    },
  });
