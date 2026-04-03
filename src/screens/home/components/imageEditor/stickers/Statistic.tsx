import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { removeSkippedSection } from "@/src/helpers/removeSkippedSectionDistance";
import React, { useEffect, useState } from "react";
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
}

export type StatisticProps = {
  defaultStatistic: Statistics;
  labelSize?: number;
  valueSize?: number;
  color: string;
};

export const Statistic: React.FC<StatisticProps> = ({ defaultStatistic, labelSize, valueSize, color }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const displayedLocation = useUserSettingsStore((s) => s.location.displayedLocation);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const substractSkippedSections = useUserSettingsStore((s) => s.substractSkippedSections);
  const toDisplayUnit = useUserSettingsStore((s) => s.toDisplayUnit);
  const hikeStartDate = useUserSettingsStore((s) => s.hikeStartDate);
  const zeroDays = useUserSettingsStore((s) => s.zeroDays);
  const { t } = useTranslation();
  const { isPremiumUnlocked } = usePremium();

  const calculateDaysSinceStart = (): number => {
    if (!hikeStartDate) return 1;

    const startDate = new Date(hikeStartDate);
    const today = new Date();
    const diffTime = Math.abs(today.getTime() - startDate.getTime());
    const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

    return diffDays > 0 ? diffDays : 1;
  };

  const day = calculateDaysSinceStart();

  const statistics = [
    Statistics.DISTANCE_HIKE,
    Statistics.HIKE_TOTAL_DISTANCE,
    Statistics.PERCENTAGE,
    Statistics.DAY,
    Statistics.AVERAGE_DISTANCE_DAY,
    Statistics.REMAINING,
    Statistics.SKIPPED,
    Statistics.ZERO_DAYS,
  ];

  const [currentStatisticIndex, setCurrentStatisticIndex] = useState<number>(
    statistics.findIndex((stat) => stat == defaultStatistic)
  );

  const [statDisplayed, setStatdisplayed] = useState<string>("");

  const getDistanceHiked = () => {
    return toDisplayUnit(removeSkippedSection(displayedLocation, skippedSections), 1);
  };

  const getEffectiveTotalDistance = () => {
    const total = substractSkippedSections
      ? removeSkippedSection(selectedHikeTotalDistance, skippedSections)
      : selectedHikeTotalDistance;
    return toDisplayUnit(total, 0);
  };

  const getTotalSkippedDistance = () => {
    const totalKm = skippedSections.reduce(
      (acc, section) => acc + (section.end.displayedLocation - section.start.displayedLocation),
      0
    );
    return toDisplayUnit(totalKm, 1);
  };

  const calculatePercentage = () => {
    if (substractSkippedSections) {
      return (
        (removeSkippedSection(displayedLocation, skippedSections) * 100) /
        removeSkippedSection(selectedHikeTotalDistance, skippedSections)
      );
    } else {
      return (removeSkippedSection(displayedLocation, skippedSections) * 100) / selectedHikeTotalDistance;
    }
  };

  useEffect(() => {
    if (statistics[currentStatisticIndex] == Statistics.DISTANCE_HIKE) {
      setStatdisplayed(`${getDistanceHiked()} ${getMeasurementUnit(measurementUnit)}`);
    } else if (statistics[currentStatisticIndex] == Statistics.HIKE_TOTAL_DISTANCE) {
      setStatdisplayed(`${getEffectiveTotalDistance()} ${getMeasurementUnit(measurementUnit)}`);
    } else if (statistics[currentStatisticIndex] == Statistics.PERCENTAGE) {
      setStatdisplayed(`${calculatePercentage().toFixed(1)} %`);
    } else if (statistics[currentStatisticIndex] == Statistics.REMAINING) {
      const totalConverted = toDisplayUnit(selectedHikeTotalDistance, 0);
      setStatdisplayed(
        `${totalConverted - getDistanceHiked() - getTotalSkippedDistance()} ${getMeasurementUnit(measurementUnit)}`
      );
    } else if (statistics[currentStatisticIndex] == Statistics.DAY) {
      setStatdisplayed(`${day}`);
    } else if (statistics[currentStatisticIndex] == Statistics.AVERAGE_DISTANCE_DAY) {
      setStatdisplayed(`${(getDistanceHiked() / day).toFixed(1)} ${getMeasurementUnit(measurementUnit)}`);
    } else if (statistics[currentStatisticIndex] == Statistics.SKIPPED) {
      setStatdisplayed(`${getTotalSkippedDistance()} ${getMeasurementUnit(measurementUnit)}`);
    } else if (statistics[currentStatisticIndex] == Statistics.ZERO_DAYS) {
      setStatdisplayed(`${zeroDays}`);
    }
  }, [
    currentStatisticIndex,
    displayedLocation,
    selectedHikeTotalDistance,
    measurementUnit,
    skippedSections,
    substractSkippedSections,
    hikeStartDate,
    day,
    zeroDays,
  ]);

  const changeStatdisplayed = () => {
    if (isPremiumUnlocked) {
      if (currentStatisticIndex + 1 >= statistics.length) {
        setCurrentStatisticIndex(0);
      } else {
        setCurrentStatisticIndex(currentStatisticIndex + 1);
      }
    }
  };

  if (!selectedHike) {
    return null;
  }

  return (
    <Pressable style={styles.container} onPress={changeStatdisplayed}>
      <Text style={{ ...styles.label, fontSize: labelSize ?? 9, color: color }}>
        {t(`home:statistic.${statistics[currentStatisticIndex]}`)}
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
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  value: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
