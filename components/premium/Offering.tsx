import { usePremium } from "@/contexts/premium/PremiumContextProvider";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
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
