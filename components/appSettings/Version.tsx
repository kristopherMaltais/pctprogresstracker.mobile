import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

type VersionProps = {};

export const Version: React.FC<VersionProps> = ({}) => {
  const { getIcon, theme } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).madeInQuebec}>
        <Image
          style={styles(theme).flagImage}
          source={getIcon("madeInQuebec")}
        />
        <Text style={styles(theme).text}>
          {t("index:settings.madeInQuebec")}
        </Text>
      </View>
      <View>
        <Text style={styles(theme).text}>V.1.0</Text>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      display: "flex",
      width: "100%",
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    madeInQuebec: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
    },
    flagImage: { width: 30, height: 20, marginRight: 8 },
    text: {
      color: theme.text,
    },
  });
