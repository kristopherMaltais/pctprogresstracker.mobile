import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import React from "react";
import { useTranslation } from "react-i18next";
import { Dimensions, Image, Pressable, StyleSheet, Text, View } from "react-native";

type HikeSearchHeaderProps = {
  title?: string;
  hikeId?: string;
};

export const HikeSearchHeader: React.FC<HikeSearchHeaderProps> = ({ title, hikeId }) => {
  const { getIcon, theme } = useTheme();
  const { t } = useTranslation();
  const { height } = Dimensions.get("window");
  const { selectedHike } = useUserSettingsStore();

  const navigation = useNavigation<NavigationProp<HikeSearchStackParamList>>();

  const displayTitle = title || t("hikeSearch:screenTitle");
  const isSelected = hikeId && selectedHike?.id === hikeId;

  return (
    <View
      style={{
        ...styles(theme).container,
        height: height * 0.06,
      }}
    >
      <View style={styles(theme).body}>
        <View style={styles(theme).titleContainer}>
          <Pressable onPress={() => navigation.goBack()} hitSlop={20}>
            <Image
              style={{ width: 18, height: 18, transform: [{ rotate: "180deg" }] }}
              source={getIcon("backHeader")}
            />
          </Pressable>
          <Text style={styles(theme).title}>{displayTitle}</Text>
        </View>
        {isSelected && <Image source={require("@/assets/images/success.png")} style={styles(theme).successIcon} />}
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
    successIcon: {
      width: 24,
      height: 24,
      marginRight: 8,
    },
  });
