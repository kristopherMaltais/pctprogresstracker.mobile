import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
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
        <Text style={styles(theme).title}>{t("common:premium.button.unlock")}</Text>
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
      ...shadows.medium,
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
