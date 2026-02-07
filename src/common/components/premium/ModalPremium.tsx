import { PremiumState, usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, Modal, Pressable, StyleSheet, Text, View } from "react-native";
import { Offering } from "./Offering";

type ModalPremiumProps = {
  isVisible: boolean;
  onCancel: () => void;
  onConfirm: () => void;
};

export const ModalPremium: React.FC<ModalPremiumProps> = ({ isVisible, onCancel, onConfirm }) => {
  const { t } = useTranslation();
  const { getIcon, theme } = useTheme();
  const { premiumState, price } = usePremium();

  return (
    <Modal animationType="slide" transparent={true} visible={isVisible}>
      <View style={styles(theme).centeredView}>
        <View style={styles(theme).modalView}>
          <Pressable style={styles(theme).header} onPress={onCancel}>
            <Text style={styles(theme).title}>{t("index:premium.title")}</Text>
            <Image style={styles(theme).close} source={getIcon("close")} />
          </Pressable>
          <Offering />
          <View style={styles(theme).buttonContainer}>
            <Pressable
              disabled={premiumState == PremiumState.SUCCESS}
              style={styles(theme).confirmButton}
              onPress={onConfirm}
            >
              {(premiumState == PremiumState.PENDING || premiumState == PremiumState.ERROR) && (
                <Text style={styles(theme).confirmButtonText}>{t("index:premium.button.buy", { price: price })}</Text>
              )}
              {premiumState == PremiumState.PROCESSING && <ActivityIndicator />}
              {premiumState == PremiumState.SUCCESS && (
                <>
                  <Text style={styles(theme).confirmButtonText}>{t("index:premium.button.success")}</Text>
                </>
              )}
            </Pressable>
            {premiumState == PremiumState.ERROR && <Text style={styles(theme).error}>{t("index:errors.premium")}</Text>}
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
    confirmButtonText: { color: "white", fontWeight: "bold", fontSize: 16 },
    close: {
      width: 15,
      height: 15,
    },
    error: {
      color: theme.error,
      marginTop: 16,
      fontSize: 16,
    },
  });
