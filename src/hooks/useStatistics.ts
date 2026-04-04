import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import {
  calculateDaysSinceStart,
  calculatePercentage,
  getDistanceHiked,
  getEffectiveTotalDistance,
  getStepsDisplay,
  getTotalSkippedDistance,
} from "@/src/helpers/computeStatistics";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";

export function useStatistics() {
  const displayedLocation = useUserSettingsStore((s) => s.location.displayedLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const measurementUnit = useUserSettingsStore((s) => s.measurementUnit);
  const substractSkippedSections = useUserSettingsStore((s) => s.substractSkippedSections);
  const toDisplayUnit = useUserSettingsStore((s) => s.toDisplayUnit);
  const hikeStartDate = useUserSettingsStore((s) => s.hikeStartDate);
  const zeroDays = useUserSettingsStore((s) => s.zeroDays);

  const unit = getMeasurementUnit(measurementUnit);
  const day = calculateDaysSinceStart(hikeStartDate ?? null);
  const distanceHiked = getDistanceHiked(displayedLocation, skippedSections, toDisplayUnit);
  const skippedDistance = getTotalSkippedDistance(skippedSections, toDisplayUnit);

  return {
    distanceHiked: `${distanceHiked} ${unit}`,
    hikeTotalDistance: `${getEffectiveTotalDistance(selectedHikeTotalDistance, skippedSections, substractSkippedSections, toDisplayUnit)} ${unit}`,
    percentage: `${calculatePercentage(displayedLocation, selectedHikeTotalDistance, skippedSections, substractSkippedSections).toFixed(1)} %`,
    remaining: `${toDisplayUnit(selectedHikeTotalDistance, 0) - distanceHiked - skippedDistance} ${unit}`,
    day: `${day}`,
    averageDistanceDay: `${(distanceHiked / day).toFixed(1)} ${unit}`,
    skipped: `${skippedDistance} ${unit}`,
    zeroDays: `${zeroDays}`,
    steps: getStepsDisplay(displayedLocation, skippedSections),
  };
}
