import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useStatistics } from "@/src/hooks/useStatistics";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Pressable, StyleSheet, Text } from "react-native";

export enum Statistics {
  DISTANCE_HIKE = "distanceHiked",
  HIKE_TOTAL_DISTANCE = "hikeTotalDistance",
  PERCENTAGE = "percentage",
  DAY = "day",
  AVERAGE_DISTANCE_DAY = "averageDistanceDay",
  REMAINING = "remaining",
  SKIPPED = "skipped",
  ZERO_DAYS = "zeroDays",
  STEPS = "steps",
}

export type StatisticProps = {
  defaultStatistic: Statistics;
  labelSize?: number;
  valueSize?: number;
  color: string;
};

export const Statistic: React.FC<StatisticProps> = ({ defaultStatistic, labelSize, valueSize, color }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const { t } = useTranslation();
  const { isPremiumUnlocked } = usePremium();
  const stats = useStatistics();

  const statistics = [
    Statistics.DISTANCE_HIKE,
    Statistics.HIKE_TOTAL_DISTANCE,
    Statistics.PERCENTAGE,
    Statistics.DAY,
    Statistics.AVERAGE_DISTANCE_DAY,
    Statistics.REMAINING,
    Statistics.SKIPPED,
    Statistics.ZERO_DAYS,
    Statistics.STEPS,
  ];

  const [currentStatisticIndex, setCurrentStatisticIndex] = useState<number>(
    statistics.findIndex((stat) => stat === defaultStatistic)
  );

  const currentStat = statistics[currentStatisticIndex];

  const statDisplayed = stats[currentStat as keyof typeof stats];

  const changeStatdisplayed = () => {
    if (isPremiumUnlocked) {
      setCurrentStatisticIndex((prev) => (prev + 1 >= statistics.length ? 0 : prev + 1));
    }
  };

  if (!selectedHike) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={changeStatdisplayed}>
      <Text style={{ ...styles.label, fontSize: labelSize ?? 9, color: color }}>
        {t(`home:statistic.${currentStat}`)}
      </Text>
      <Text style={{ ...styles.value, fontSize: valueSize ?? 18, color: color }}>{statDisplayed}</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 90,
  },
  label: {
    color: "white",
    marginTop: 10,
    textAlign: "center",
    fontWeight: "700",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
  value: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
});
