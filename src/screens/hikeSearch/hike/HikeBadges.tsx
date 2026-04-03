import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { Hike } from "@/src/models/hike";
import React from "react";
import { useTranslation } from "react-i18next";
import { StyleSheet, View } from "react-native";
import { Badge } from "./Badge";

type HikeBadgesProps = {
  hike: Hike;
  selectedMapIndex: number;
};

export const HikeBadges: React.FC<HikeBadgesProps> = ({ hike, selectedMapIndex }) => {
  const { theme } = useTheme();
  const { t } = useTranslation();
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const toDisplayUnit = useUserSettingsStore((s) => s.toDisplayUnit);

  const selectedMap = hike.maps[selectedMapIndex];
  const distance = toDisplayUnit(selectedMap.totalDistance, 0);
  const distanceValue = `${distance} ${getMeasurementUnit(measurementUnit)}`;
  const roundtripValue = hike.isRoundtrip ? t("common:yes") : t("common:no");
  const skippedSectionsValue = hike.isRoundtrip ? t("common:no") : t("common:yes");

  return (
    <View style={styles(theme).container}>
      <Badge label={t("hikeSearch:detail.distance")} value={distanceValue} />
      <Badge label={t("hikeSearch:detail.roundtrip")} value={roundtripValue} />
      <Badge label={t("hikeSearch:detail.skippedSections")} value={skippedSectionsValue} />
    </View>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    container: {
      flexDirection: "row",
      gap: 12,
      paddingHorizontal: 16,
      flexWrap: "wrap",
    },
  });
