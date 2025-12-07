import { Language } from "@/components/appSettings/language/Language";
import { PrivacyPolicy } from "@/components/appSettings/PrivacyPolicy";
import { Terms } from "@/components/appSettings/Terms";
import { Version } from "@/components/appSettings/Version";
import { Theme } from "@/contexts/theme/models/theme";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import {
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { DarkMode } from "./DarkMode";

export default function Settings() {
  const { t } = useTranslation();
  const { getIcon, theme } = useTheme();

  const navigateToInstasgram = async () => {
    const appURL = "instagram://user?username=sharemyhike";
    const webURL = "https://www.instagram.com/sharemyhike";

    const isSupported = await Linking.canOpenURL(appURL);

    if (isSupported) {
      await Linking.openURL(appURL);
    } else {
      await Linking.openURL(webURL);
    }
  };
  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).header}>
        <Image style={styles(theme).icon} source={getIcon("icon")} />
      </View>
      <Language />
      <DarkMode />
      <TouchableOpacity style={styles(theme).premium}>
        <Text style={styles(theme).premiumText}>
          {t("index:settings.restorePurchase")}
        </Text>
      </TouchableOpacity>
      <View style={styles(theme).separator} />
      <Terms />
      <PrivacyPolicy />
      <View style={styles(theme).separator} />
      <Version />
      <TouchableOpacity onPress={navigateToInstasgram}>
        <Image style={styles(theme).instagram} source={getIcon("instagram")} />
      </TouchableOpacity>
    </View>
  );
}
const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      backgroundColor: theme.background,
      height: "100%",
      padding: 16,
      paddingTop: 50,
    },
    separator: {
      borderTopWidth: 0.5,
      height: 2,
      marginBottom: 16,
    },
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
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
    },
    instagram: {
      width: 25,
      height: 25,
      marginTop: 40,
    },
    icon: {
      width: 100,
      height: 100,
    },
  });
