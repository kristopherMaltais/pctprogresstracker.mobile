import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { Theme } from "@/src/contexts/theme/models/theme";
import { shadows } from "@/src/contexts/theme/shadows";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useService } from "@/src/hooks/useService";
import { Hike as HikeModel } from "@/src/models/hike";
import { HikeSearchStackParamList } from "@/src/navigation/HikeSearchNavigation";
import { HikeService } from "@/src/services/hikeService/services/hikeService";
import { RouteProp, useNavigation, useRoute } from "@react-navigation/native";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { ActivityIndicator, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { HikeBadges } from "./HikeBadges";
import { MapCarousel } from "./MapCarousel";

export const Hike: React.FC = () => {
  const { theme, isDarkMode } = useTheme();
  const { t } = useTranslation();
  const { isPremiumUnlocked, setIsPremiumModalVisible } = usePremium();
  const hikeService: HikeService = useService("Hike.HikeService");
  const setSelectedHike = useUserSettingsStore((s) => s.setSelectedHike);
  const navigation = useNavigation();

  const route = useRoute<RouteProp<HikeSearchStackParamList, "hike">>();
  const { id } = route.params;

  const [hike, setHike] = useState<HikeModel | undefined>();
  const [isLoading, setIsLoading] = useState(true);
  const [selectedMapIndex, setSelectedMapIndex] = useState(0);

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
    if (hike?.isPremium && !isPremiumUnlocked) {
      setIsPremiumModalVisible(true);
    } else if (hike) {
      const hikeWithSelectedMap: HikeModel = {
        ...hike,
        selectedMapIndex: selectedMapIndex,
      };
      setSelectedHike(hikeWithSelectedMap);
      navigation.getParent()?.navigate("home");
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
      {hike.isPremium && !isPremiumUnlocked && (
        <View
          style={{
            ...styles(theme).premiumBanner,
            backgroundColor: isDarkMode ? theme.primary : theme.secondaryBackground,
          }}
        >
          <Text style={{ ...styles(theme).premiumBannerText, color: isDarkMode ? "#FFFFFF" : theme.primary }}>
            {t("hikeSearch:list.premium")}
          </Text>
        </View>
      )}

      <HikeBadges hike={hike} selectedMapIndex={selectedMapIndex} />

      <MapCarousel maps={hike.maps} onMapChange={setSelectedMapIndex} currentMap={hike.maps[selectedMapIndex]} />

      <TouchableOpacity style={styles(theme).startButton} onPress={handleStartHike}>
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
      paddingTop: 0,
      paddingBottom: 100,
    },
    premiumBanner: {
      width: "100%",
      paddingVertical: 12,
      alignItems: "center",
      justifyContent: "center",
    },
    premiumBannerText: {
      fontSize: 14,
      fontWeight: "600",
      textTransform: "uppercase",
      letterSpacing: 1,
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
    startButton: {
      backgroundColor: theme.primary,
      paddingVertical: 16,
      borderRadius: 12,
      alignItems: "center",
      ...shadows.medium,
      marginHorizontal: 16,
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
  });
