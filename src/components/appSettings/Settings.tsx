import { Language } from "@/src/components/appSettings/language/Language";
import { PrivacyPolicy } from "@/src/components/appSettings/PrivacyPolicy";
import { Terms } from "@/src/components/appSettings/Terms";
import { Version } from "@/src/components/appSettings/Version";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Linking, StyleSheet, TouchableOpacity, View } from "react-native";
import { DarkMode } from "./DarkMode";
import { RestorePremiumButton } from "./RestorePremiumButton";

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
      <RestorePremiumButton />
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
      height: 1,
      marginBottom: 16,
      backgroundColor: theme.text,
    },
    header: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      width: "100%",
      marginTop: 16,
      marginBottom: 16,
    },
    instagram: {
      width: 25,
      height: 25,
      marginTop: 40,
    },
    icon: {
      width: 95,
      height: 60,
    },
  });
