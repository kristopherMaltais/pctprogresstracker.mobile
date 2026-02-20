import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { MaterialCommunityIcons } from "@expo/vector-icons"; // Ou une autre librairie d'icônes
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, Text, View } from "react-native";

export const Offering: React.FC = () => {
  const { t } = useTranslation();
  const { theme } = useTheme();

  // On définit les items pour garder le JSX propre
  const premiumFeatures = [
    { title: "common:premium.features.allTrails", icon: "map-outline" },
    { title: "common:premium.features.noLogo", icon: "label-off-outline" },
    { title: "common:premium.features.allStickers", icon: "sticker-emoji" },
    { title: "common:premium.features.transparent", icon: "layers-outline" },
    { title: "common:premium.features.skippedSections", icon: "map-marker-distance" },
    { title: "common:premium.features.sectionHiker", icon: "vector-line" },
  ];

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).description}>{t("common:premium.description")}</Text>

      <View style={styles(theme).grid}>
        {premiumFeatures.map((item, index) => (
          <View key={index} style={styles(theme).listItem}>
            <MaterialCommunityIcons
              name={item.icon as any}
              size={22}
              color={theme.primary}
              style={styles(theme).icon}
            />
            <Text style={styles(theme).itemText}>{t(item.title)}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      paddingVertical: 10,
    },
    description: {
      color: theme.text,
      fontSize: 15,
      textAlign: "left",
      marginBottom: 24,
      opacity: 0.8,
    },
    listItem: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: theme.secondaryBackground,
      paddingHorizontal: 12,
      paddingVertical: 10,
      borderRadius: 10,
    },
    icon: {
      marginRight: 12,
    },
    itemText: {
      flex: 1,
      fontSize: 15,
      fontWeight: "500",
      color: theme.text,
    },
  });
