import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { HikeList as HikeListModel } from "@/src/models/hikeList";
import React from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Image, Pressable, StyleSheet, Text, View } from "react-native";

type HikeListProps = {
  hikes: HikeListModel[];
  onSelectHike: (hike: HikeListModel) => void;
  isSearching: boolean;
  isLoading: boolean;
};

export const HikeList: React.FC<HikeListProps> = ({ hikes, onSelectHike, isSearching, isLoading }) => {
  const { theme, getIcon } = useTheme();
  const { t } = useTranslation();
  const { isPremiumUnlocked } = usePremium();

  return (
    <View style={styles(theme).container}>
      <Text style={styles(theme).title}>
        {isSearching ? t("hikeSearch:list.searchResults") : t("hikeSearch:list.allHikes")}
      </Text>

      {isLoading ? (
        <View style={styles(theme).loadingContainer}>
          <ActivityIndicator size="large" color={theme.text} />
        </View>
      ) : hikes.length === 0 ? (
        <View style={styles(theme).emptyContainer}>
          <Text style={styles(theme).emptyText}>
            {isSearching ? t("hikeSearch:list.noResults") : t("hikeSearch:list.noHikes")}
          </Text>
        </View>
      ) : (
        <View style={styles(theme).listContainer}>
          {hikes.map((hike) => (
            <Pressable key={hike.id} style={styles(theme).card} onPress={() => onSelectHike(hike)}>
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
                  <Text style={styles(theme).distance}>{hike.totalDistance} km</Text>
                  {hike.stickerCount !== undefined && (
                    <>
                      <Text style={styles(theme).separator}>•</Text>
                      <Text style={styles(theme).stickerCount}>
                        {hike.stickerCount} {hike.stickerCount > 1 ? "stickers" : "sticker"}
                      </Text>
                    </>
                  )}
                </View>
              </View>

              <Image source={getIcon("rightChevron")} style={styles(theme).chevron} />
            </Pressable>
          ))}
        </View>
      )}
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      marginTop: 16,
      paddingHorizontal: 8,
      paddingBottom: 40,
    },
    title: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      marginBottom: 12,
    },
    listContainer: {
      gap: 12,
    },
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

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
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
    distance: {
      fontSize: 13,
      color: theme.text,
      opacity: 0.6,
    },
    separator: {
      fontSize: 13,
      color: theme.text,
      opacity: 0.4,
    },
    stickerCount: {
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
    loadingContainer: {
      paddingVertical: 60,
      alignItems: "center",
      justifyContent: "center",
    },
    emptyContainer: {
      paddingVertical: 40,
      alignItems: "center",
    },
    emptyText: {
      fontSize: 14,
      color: theme.text,
      opacity: 0.5,
      textAlign: "center",
    },
  });
