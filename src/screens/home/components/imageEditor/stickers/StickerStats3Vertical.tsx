import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { StickerStats3VerticalVariant, useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { Statistic, Statistics } from "./Statistic";

export const StickerStats3Vertical: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const showLogo = useUserSettingsStore((s) => s.showLogo);

  const { getCurrentVariant } = useSticker();
  const variant = getCurrentVariant<StickerStats3VerticalVariant>("stickerStats3Vertical");

  const { getIcon } = useTheme();
  const { setViewShotTransparentBackgroud } = useViewShot();

  const viewShotCallbackRef = React.useCallback(
    (node: ViewShot | null) => {
      if (node !== null) {
        setViewShotTransparentBackgroud(node);
      }
    },
    [setViewShotTransparentBackgroud]
  );

  if (!selectedHike) {
    return null;
  }

  const cardMode = variant?.cardMode ?? "none";
  const textColor = cardMode === "white" ? "#1a1a1a" : "white";
  const cardStyle = cardMode === "dark" ? styles.cardDark : cardMode === "white" ? styles.cardWhite : undefined;

  return (
    <GestureWrapper>
      <ViewShot options={{ format: "png", quality: 1 }} ref={viewShotCallbackRef}>
        <View style={[styles.container, cardStyle]}>
          <View style={styles.header}>
            {showLogo && <Image source={getIcon("icon")} style={styles.logo} />}
            <Text style={[styles.name, { color: textColor }]}>
              {selectedHike.maps[selectedHike.selectedMapIndex].name}
            </Text>
          </View>
          <View style={styles.statsGrid}>
            <Statistic defaultStatistic={Statistics.HIKE_TOTAL_DISTANCE} color={textColor} />
            <Statistic defaultStatistic={Statistics.DISTANCE_HIKE} color={textColor} />
            <Statistic defaultStatistic={Statistics.PERCENTAGE} color={textColor} />
          </View>
        </View>
      </ViewShot>
    </GestureWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardDark: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 8,
  },
  cardWhite: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 24,
    height: 18,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    gap: 4,
    alignItems: "center",
  },
  statsGrid: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
});
