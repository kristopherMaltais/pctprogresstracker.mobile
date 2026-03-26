import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useService } from "@/src/hooks/useService";
import { Hike as HikeModel } from "@/src/models/hike";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, Dimensions, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";

const { width } = Dimensions.get("window");
const STICKER_PREVIEW_SIZE = (width - 64) / 3; // 3 colonnes avec gaps

export const Hike: React.FC = () => {
  const { theme, getIcon } = useTheme();
  const { t } = useTranslation();
  const hikeService: HikeService = useService("Hike.HikeService");
  const setSelectedHike = useUserSettingsStore((s) => s.setSelectedHike);
  const navigation = useNavigation();

  const route = useRoute<RouteProp<HikeSearchStackParamList, "hike">>();
  const { id } = route.params;

  const [hike, setHike] = useState<HikeModel | undefined>();
  const [selectedStickerId, setSelectedStickerId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    hikeService
      .getHikeById(id)
      .then((hike: HikeModel) => {
        setHike(hike);
        setIsLoading(false);
      })
      .catch((error) => {
        console.error("Error loading hike:", error);
        setIsLoading(false);
      });
  }, [id]);

  const handleStartHike = () => {
    if (hike && selectedStickerId) {
      setSelectedHike({ ...hike, selectedStickerId });
      navigation.goBack();
    }
  };

  if (isLoading) {
    return (
      <View style={styles(theme).loadingContainer}>
        <ActivityIndicator size="large" color={theme.text} />
      </View>
    );
  }

  if (!hike) {
    return (
      <View style={styles(theme).errorContainer}>
        <Text style={styles(theme).errorText}>{t("hikeSearch:detail.error")}</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles(theme).container} contentContainerStyle={styles(theme).contentContainer}>
      <Text style={styles(theme).hikeName}>{hike.name}</Text>

      <View style={styles(theme).stickersSection}>
        <Text style={styles(theme).sectionTitle}>{t("hikeSearch:detail.selectSticker")}</Text>
        <Text style={styles(theme).sectionSubtitle}>
          {hike.stickers.length}{" "}
          {hike.stickers.length > 1
            ? t("hikeSearch:detail.stickersAvailable")
            : t("hikeSearch:detail.stickerAvailable")}
        </Text>

        <View style={{ ...styles(theme).mapContainer }}>
          <HikeProgressAnimation size={0.9} />
        </View>
      </View>

      {/* Bouton pour commencer */}
      <TouchableOpacity
        style={[styles(theme).startButton, !selectedStickerId && styles(theme).startButtonDisabled]}
        onPress={handleStartHike}
        disabled={!selectedStickerId}
      >
        <Text style={styles(theme).startButtonText}>{t("hikeSearch:detail.startHike")}</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.background,
    },
    contentContainer: {
      paddingHorizontal: 16,
      paddingTop: 24,
      paddingBottom: 100,
    },
    loadingContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
    },
    errorContainer: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: theme.background,
      paddingHorizontal: 32,
    },
    errorText: {
      fontSize: 16,
      color: theme.text,
      opacity: 0.6,
      textAlign: "center",
    },
    hikeName: {
      fontSize: 28,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 20,
      textAlign: "center",
    },
    badgesContainer: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 12,
      justifyContent: "center",
      marginBottom: 32,
    },
    infoBadge: {
      backgroundColor: theme.secondaryBackground,
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.1,
      shadowRadius: 3,
      elevation: 3,
    },
    badgeLabel: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.text,
      textTransform: "uppercase",
      letterSpacing: 1,
      opacity: 0.5,
      marginBottom: 2,
    },
    badgeValue: {
      fontSize: 14,
      fontWeight: "700",
      color: theme.text,
    },
    premiumBadge: {
      backgroundColor: "#FFD700",
      paddingHorizontal: 16,
      paddingVertical: 8,
      borderRadius: 8,
    },
    premiumText: {
      fontSize: 12,
      fontWeight: "700",
      color: "#000",
      textTransform: "uppercase",
      letterSpacing: 0.5,
    },
    stickersSection: {
      marginBottom: 32,
    },
    sectionTitle: {
      fontSize: 18,
      fontWeight: "700",
      color: theme.text,
      marginBottom: 4,
      textAlign: "center",
    },
    sectionSubtitle: {
      fontSize: 14,
      color: theme.text,
      opacity: 0.6,
      marginBottom: 20,
      textAlign: "center",
    },
    stickersGrid: {
      flexDirection: "row",
      flexWrap: "wrap",
      gap: 16,
      justifyContent: "center",
    },
    stickerCard: {
      width: STICKER_PREVIEW_SIZE,
      height: STICKER_PREVIEW_SIZE,
      backgroundColor: theme.secondaryBackground,
      borderRadius: 12,
      padding: 16,
      position: "relative",
      justifyContent: "center",
      alignItems: "center",
      borderWidth: 2,
      borderColor: "transparent",

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 2 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
    stickerCardSelected: {
      borderColor: theme.primary,
      backgroundColor: theme.primary + "20",
    },
    stickerPreview: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    stickerBadge: {
      position: "absolute",
      top: 8,
      left: 8,
      backgroundColor: theme.text + "20",
      paddingHorizontal: 8,
      paddingVertical: 4,
      borderRadius: 4,
    },
    stickerBadgeText: {
      fontSize: 10,
      fontWeight: "700",
      color: theme.text,
    },
    startButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.3,
      shadowRadius: 4,
      elevation: 5,
    },
    startButtonDisabled: {
      opacity: 0.5,
    },
    startButtonText: {
      color: "#FFF",
      fontSize: 16,
      fontWeight: "700",
      textTransform: "uppercase",
      letterSpacing: 1,
    },
    mapContainer: {
      justifyContent: "center",
      alignItems: "center",
      borderRadius: 12,
      minHeight: 140,
      marginBottom: 20,
      padding: 10,
      backgroundColor: theme.secondaryBackground,

      shadowColor: "#000",
      shadowOffset: { width: 0, height: 3 },
      shadowOpacity: 0.2,
      shadowRadius: 4,
      elevation: 5,
    },
  });
