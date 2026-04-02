import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { Statistic, Statistics } from "./Statistic";

export const StickerStats4: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);

  const showLogo = useUserSettingsStore((s) => s.showLogo);

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
          <View>
            <View style={styles.header}>
              {showLogo && <Image source={getIcon("icon")} style={styles.logo} />}
              <Text style={styles.name}>{selectedHike.maps[selectedHike.selectedMapIndex].name}</Text>
            </View>
            <View style={styles.statsGrid}>
              <Statistic defaultStatistic={Statistics.HIKE_TOTAL_DISTANCE} />
              <Statistic defaultStatistic={Statistics.DISTANCE_HIKE} />
            </View>
            <View style={styles.statsGrid}>
              <Statistic defaultStatistic={Statistics.DAY} />
              <Statistic defaultStatistic={Statistics.AVERAGE_DISTANCE_DAY} />
            </View>
          </View>
        </View>
      </ViewShot>
    </GestureWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    borderRadius: 12,
    padding: 12,
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
  statsGrid: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  statsContainer: {
    minWidth: 60,
  },
  name: {
    fontSize: 18,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
