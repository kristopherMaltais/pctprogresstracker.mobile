import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type HikeCardProps = {
  hike: HikeListModel;
  onPress: (hike: HikeListModel) => void;
};

export const HikeCard: React.FC<HikeCardProps> = ({ hike, onPress }) => {
  const { theme, getIcon } = useTheme();
  const { t } = useTranslation();
  const { isPremiumUnlocked } = usePremium();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const isSelected = selectedHike?.id === hike.id;

  return (
    <Pressable style={styles(theme).card} onPress={() => onPress(hike)}>
      <View style={styles(theme).textContent}>
        <View style={styles(theme).nameRow}>
          <Text style={styles(theme).hikeName} numberOfLines={1}>
            {hike.name}
          </Text>
          {hike.isPremium && !isPremiumUnlocked && (
            <View style={styles(theme).premiumBadge}>
              <Text style={styles(theme).premiumText}>{t("hikeSearch:list.premium")}</Text>
            </View>
          )}
        </View>
        <View style={styles(theme).infoRow}>
          <Text style={styles(theme).mapCount}>
            {hike.mapCount} {hike.mapCount > 1 ? "maps" : "map"}
          </Text>
        </View>
      </View>

      {isSelected ? (
        <Image source={require("@/assets/images/success.png")} style={styles(theme).successIcon} />
      ) : (
        <Image source={getIcon("rightChevron")} style={styles(theme).chevron} />
      )}
    </Pressable>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    card: {
      width: "100%",
      height: 70,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      paddingHorizontal: 16,
      paddingVertical: 12,
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
      ...shadows.medium,
    },
    textContent: {
      flex: 1,
      justifyContent: "center",
      marginRight: 12,
    },
    nameRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 8,
      marginBottom: 4,
    },
    hikeName: {
      fontSize: 16,
      fontWeight: "600",
      color: theme.text,
      flex: 1,
    },
    premiumBadge: {
      backgroundColor: theme.primary,
      paddingHorizontal: 8,
      paddingVertical: 2,
      borderRadius: 4,
    },
    premiumText: {
      fontSize: 10,
      fontWeight: "700",
      color: "white",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    infoRow: {
      flexDirection: "row",
      alignItems: "center",
      gap: 6,
    },
    mapCount: {
      fontSize: 13,
      color: theme.text,
      opacity: 0.6,
    },
    chevron: {
      width: 20,
      height: 20,
      tintColor: theme.text,
      opacity: 0.4,
      marginLeft: 8,
    },
    successIcon: {
      width: 24,
      height: 24,
      marginLeft: 8,
    },
  });
