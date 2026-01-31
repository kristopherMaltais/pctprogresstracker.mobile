import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

type PremiumButtonProps = {};
export const PremiumButton: React.FC<PremiumButtonProps> = ({}) => {
  const { setIsPremiumModalVisible } = usePremium();
  const { t } = useTranslation();
  const { theme } = useTheme();

  return (
    <>
      <TouchableOpacity style={styles(theme).container} onPress={() => setIsPremiumModalVisible(true)}>
        <Text style={styles(theme).title}>{t("index:premium.button.unlock")}</Text>
      </TouchableOpacity>
    </>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      position: "absolute",
      alignItems: "center",
      paddingVertical: 20,
      top: "45%",
      zIndex: 1,
      backgroundColor: theme.primary,
      borderRadius: 15,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      left: "5%",
      width: "90%",
    },
    title: {
      fontWeight: "bold",
      color: "white",
      fontSize: 14,
      textTransform: "uppercase",
    },
  });
