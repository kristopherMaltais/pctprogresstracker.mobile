// App.tsx
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useNavigation } from "expo-router";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ImageEditor } from "./components/imageEditor/ImageEditor";

export const Home: React.FC = () => {
  const { theme, getIcon } = useTheme();
  const { t } = useTranslation("home");

  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const navigation = useNavigation<any>();
  const openHikeList = () => navigation.navigate("hikeSearch");

  return (
    <View style={styles(theme).container}>
      <View style={styles(theme).headerBackground} />
      {selectedHike ? (
        <ImageEditor />
      ) : (
        <View style={styles(theme).emptyStateContainer}>
          <TouchableOpacity style={styles(theme).findHikeButton} onPress={openHikeList}>
            <Text style={styles(theme).findHikeButtonText}>{t("home:findMyHike")}</Text>
            <Image source={getIcon("search")} style={styles(theme).searchIcon} />
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    headerBackground: {
      backgroundColor: theme.header,
      height: 20,
      width: "100%",
    },
    emptyStateContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    findHikeButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      paddingHorizontal: 32,
      borderRadius: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "center",
      gap: 12,
      ...shadows.medium,
    },
    searchIcon: {
      width: 24,
      height: 24,
      tintColor: "#FFF",
    },
    findHikeButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
  });
