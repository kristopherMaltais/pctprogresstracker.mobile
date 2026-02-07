import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

type OfferingProps = {};

export const Offering: React.FC<OfferingProps> = ({}) => {
  const { t } = useTranslation();
  const { getIcon, theme } = useTheme();
  const { premiumState } = usePremium();

  return (
    <View>
      <Text style={{ color: theme.text }}>{t("common:premium.description")}</Text>
      <Text style={{ marginTop: 16, marginBottom: 8, color: theme.text }}>{t("common:premium.offeringTitle")}</Text>
      <View style={styles(theme).listItem}>
        <Text style={styles(theme).bullet}>{"\u2022"}</Text>
        <Text style={styles(theme).itemText}>
          <Text style={{ fontWeight: "bold" }}>{t("common:premium.allTrails.title")}</Text>
          {t("common:premium.allTrails.description")}
        </Text>
      </View>
      <View style={styles(theme).listItem}>
        <Text style={styles(theme).bullet}>{"\u2022"}</Text>
        <Text style={styles(theme).itemText}>
          <Text style={{ fontWeight: "bold" }}>{t("common:premium.noLogo.title")}</Text>
          {t("common:premium.noLogo.description")}
        </Text>
      </View>
      <View style={styles(theme).listItem}>
        <Text style={styles(theme).bullet}>{"\u2022"}</Text>
        <Text style={styles(theme).itemText}>
          <Text style={{ fontWeight: "bold" }}>{t("common:premium.allStickers.title")}</Text>
          {t("common:premium.allStickers.description")}
        </Text>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
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
  });
