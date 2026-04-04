import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { StickerStatsVariant, useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { removeSkippedSection } from "@/src/helpers/removeSkippedSectionDistance";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { Statistic, Statistics } from "./Statistic";
import { ProgressBar } from "./stickerProgressBar/ProgressBar";

type StatsMode = 3 | 4 | 6;

const STICKER_ID: Record<StatsMode, string> = {
  3: "stickerStats3",
  4: "stickerStats4",
  6: "stickerStats6",
};

const STATS_ROWS: Record<StatsMode, Statistics[][]> = {
  3: [[Statistics.HIKE_TOTAL_DISTANCE, Statistics.DISTANCE_HIKE, Statistics.DAY]],
  4: [
    [Statistics.HIKE_TOTAL_DISTANCE, Statistics.DISTANCE_HIKE],
    [Statistics.DAY, Statistics.AVERAGE_DISTANCE_DAY],
  ],
  6: [
    [Statistics.HIKE_TOTAL_DISTANCE, Statistics.DISTANCE_HIKE, Statistics.PERCENTAGE],
    [Statistics.DAY, Statistics.AVERAGE_DISTANCE_DAY, Statistics.REMAINING],
  ],
};

type Props = {
  mode: StatsMode;
};

export const StickerStats: React.FC<Props> = ({ mode }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const progressMode = useUserSettingsStore((s) => s.progressMode);
  const showLogo = useUserSettingsStore((s) => s.showLogo);
  const displayedLocation = useUserSettingsStore((s) => s.location.displayedLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const substractSkippedSections = useUserSettingsStore((s) => s.substractSkippedSections);

  const { getCurrentVariant } = useSticker();
  const variant = getCurrentVariant<StickerStatsVariant>(STICKER_ID[mode]);

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
  const colorScheme = variant?.colorScheme ?? "white";
  const textColor = colorScheme === "white" ? "white" : "#1a1a1a";
  const cardStyle = cardMode === "dark" ? styles.cardDark : cardMode === "white" ? styles.cardWhite : undefined;

  const calculatePercentage = () => {
    const hiked = removeSkippedSection(displayedLocation, skippedSections);
    const total = substractSkippedSections
      ? removeSkippedSection(selectedHikeTotalDistance, skippedSections)
      : selectedHikeTotalDistance;
    return Math.round((hiked * 100) / total);
  };

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
          {STATS_ROWS[mode].map((row, rowIndex) => (
            <View key={rowIndex} style={styles.statsRow}>
              {row.map((stat) => (
                <Statistic key={stat} defaultStatistic={stat} color={textColor} />
              ))}
            </View>
          ))}
          {variant?.showProgressBar && <ProgressBar percentage={calculatePercentage()} />}
          {variant?.showAnimation && (
            <HikeProgressAnimation key={`${progressMode}-${skippedSections}`} color={textColor} />
          )}
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
    justifyContent: "center",
    gap: 4,
    alignItems: "center",
  },
  statsRow: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
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
