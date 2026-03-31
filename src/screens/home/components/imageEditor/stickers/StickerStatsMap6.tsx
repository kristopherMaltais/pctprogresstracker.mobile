import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { Statistic, Statistics } from "./Statistic";

export const StickerStatsMap6: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const progressMode = useUserSettingsStore((s) => s.progressMode);

  const showLogo = useUserSettingsStore((s) => s.showLogo);

  const { getIcon } = useTheme();
  const { t } = useTranslation();
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

  return (
    <GestureWrapper>
      <ViewShot
        options={{
          format: "png",
          quality: 1,
        }}
        ref={viewShotCallbackRef}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            {showLogo && <Image source={getIcon("icon")} style={styles.logo} />}
            <Text style={styles.name}>{selectedHike.maps[selectedHike.selectedMapIndex].name}</Text>
          </View>
          <View style={styles.statsGrid}>
            <Statistic defaultStatistic={Statistics.HIKE_TOTAL_DISTANCE} />
            <Statistic defaultStatistic={Statistics.DISTANCE_HIKE} />
            <Statistic defaultStatistic={Statistics.PERCENTAGE} />
          </View>
          <View style={styles.statsGrid}>
            <Statistic defaultStatistic={Statistics.DAY} />
            <Statistic defaultStatistic={Statistics.AVERAGE_DISTANCE_DAY} />
            <Statistic defaultStatistic={Statistics.REMAINING} />
          </View>
          <HikeProgressAnimation key={`${progressMode}-${skippedSections}`} />
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
    flexDirection: "row",
    gap: 16,
  },
  statsContainer: {
    minWidth: 60,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
