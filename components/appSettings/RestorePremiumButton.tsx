import {
  PremiumState,
  usePremium,
} from "@/contexts/premium/PremiumContextProvider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  ActivityIndicator,
  StyleSheet,
  Text,
  TouchableOpacity,
} from "react-native";

export const RestorePremiumButton: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();
  const { restorePremium, premiumState } = usePremium();

  return (
    <TouchableOpacity
      style={styles(theme).premium}
      onPress={() => restorePremium()}
    >
      {premiumState == PremiumState.PROCESSING ? (
        <ActivityIndicator />
      ) : (
        <Text style={styles(theme).premiumText}>
          {t("index:settings.restorePurchase")}
        </Text>
      )}
    </TouchableOpacity>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    premium: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      paddingHorizontal: 8,
      paddingVertical: 16,
      borderRadius: 8,
      marginBottom: 16,
      backgroundColor: theme.primary,
    },
    premiumText: {
      color: "white",
      fontWeight: "bold",
      textTransform: "uppercase",
    },
  });
