import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { AdvancedSettingsStackParamList } from "@/src/navigation/AdvancedSettingsNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

type HeaderProps = {
  pageTitle: string;
  toggleAppSettingsDrawer: () => void;
};

export const AdvancesSettingsHeader: React.FC<HeaderProps> = ({ pageTitle, toggleAppSettingsDrawer }) => {
  const { getIcon, theme } = useTheme();
  const { t } = useTranslation();
  const { height } = Dimensions.get("window");

  const navigation = useNavigation<NavigationProp<AdvancedSettingsStackParamList>>();

  return (
    <View
      style={{
        ...styles(theme).container,
        height: height * 0.06,
      }}
    >
      <View style={styles(theme).body}>
        <View style={styles(theme).titleContainer}>
          <Pressable onPress={() => navigation.goBack()}>
            <Image
              style={{ width: 18, height: 18, transform: [{ rotate: "180deg" }] }}
              source={getIcon("backHeader")}
            />
          </Pressable>
          <Text style={styles(theme).title}>{t("advancedSettings:screenTitle")}</Text>
        </View>
      </View>
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      justifyContent: "flex-end",
      paddingHorizontal: 16,
      paddingBottom: 16,
      backgroundColor: theme.header,
    },
    body: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "space-between",
      alignItems: "center",
      minHeight: 35,
    },
    titleContainer: {
      display: "flex",
      flexDirection: "row",
      alignItems: "center",
      fontWeight: "bold",
      marginLeft: 8,
      gap: 8,
    },

    title: {
      textTransform: "uppercase",
      color: "white",
      fontWeight: "700",
      fontSize: 16,
      letterSpacing: 1,
    },
  });
