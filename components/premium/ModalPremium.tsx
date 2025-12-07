import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";

type ModalPremiumProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ModalPremium: React.FC<ModalPremiumProps> = ({
  isVisible,
  onCancel,
  onConfirm,
}) => {
  const { t } = useTranslation();
  const { getIcon, theme } = useTheme();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles(theme).centeredView}>
        <View style={styles(theme).modalView}>
          <Pressable style={styles(theme).header} onPress={onCancel}>
            <Text style={styles(theme).title}>{t("index:premium.title")}</Text>
            <Image style={styles(theme).close} source={getIcon("close")} />
          </Pressable>
          <Text style={{ color: theme.text }}>
            {t("index:premium.description")}
          </Text>
          <Text style={{ marginTop: 16, marginBottom: 8, color: theme.text }}>
            {t("index:premium.offeringTitle")}
          </Text>
          <View style={styles(theme).listItem}>
            <Text style={styles(theme).bullet}>{"\u2022"}</Text>
            <Text style={styles(theme).itemText}>
              <Text style={{ fontWeight: "bold" }}>
                {t("index:premium.allTrails.title")}
              </Text>
              {t("index:premium.allTrails.description")}
            </Text>
          </View>
          <View style={styles(theme).listItem}>
            <Text style={styles(theme).bullet}>{"\u2022"}</Text>
            <Text style={styles(theme).itemText}>
              <Text style={{ fontWeight: "bold" }}>
                {t("index:premium.noLogo.title")}
              </Text>
              {t("index:premium.noLogo.description")}
            </Text>
          </View>
          <View style={styles(theme).listItem}>
            <Text style={styles(theme).bullet}>{"\u2022"}</Text>
            <Text style={styles(theme).itemText}>
              <Text style={{ fontWeight: "bold" }}>
                {t("index:premium.allStickers.title")}
              </Text>
              {t("index:premium.allStickers.description")}
            </Text>
          </View>
          <View style={styles(theme).buttonContainer}>
            <Pressable style={styles(theme).confirmButton} onPress={onConfirm}>
              <Text
                style={{ color: "white", fontWeight: "bold", fontSize: 16 }}
              >
                {t("index:premium.button.buy")}
              </Text>
            </Pressable>
          </View>
        </View>
      </View>
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
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
    },
    title: {
      marginBottom: 15,
      fontWeight: "bold",
      fontSize: 16,
      textAlign: "center",
      color: theme.text,
    },
    buttonContainer: {
      marginTop: 16,
    },
    confirmButton: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: 16,
      borderRadius: 10,
      backgroundColor: theme.primary,
      width: "100%",
    },
    listContainer: {
      marginVertical: 10,
      paddingHorizontal: 20,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "flex-start",
      marginBottom: 5,
    },
    bullet: {
      marginRight: 10,
      fontSize: 20,
      lineHeight: 20,
      color: theme.text,
    },
    itemText: {
      flex: 1,
      lineHeight: 20,
      color: theme.text,
    },
    close: {
      width: 15,
      height: 15,
    },
  });
