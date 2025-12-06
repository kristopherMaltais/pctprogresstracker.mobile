import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";

type VersionProps = {};

export const Version: React.FC<VersionProps> = ({}) => {
  const { getIcon } = useTheme();
  const { t } = useTranslation();

  return (
    <View style={styles.container}>
      <View style={styles.madeInQuebec}>
        <Image style={styles.flagImage} source={getIcon("madeInQuebec")} />
        <Text>{t("index:settings.madeInQuebec")}</Text>
      </View>
      <View style={styles.version}>
        <Text>V.1.0</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
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
  version: {},
});
