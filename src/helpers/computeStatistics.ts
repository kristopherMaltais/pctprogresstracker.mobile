import { LocationInterval } from "@/src/models/locationInterval";
import { removeSkippedSection } from "./removeSkippedSectionDistance";

export type ToDisplayUnit = (value: number, decimals: number) => number;

export function calculateDaysSinceStart(hikeStartDate: string | null): number {
  if (!hikeStartDate) return 1;

  const startDate = new Date(hikeStartDate);
  const today = new Date();
  const diffTime = Math.abs(today.getTime() - startDate.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

  return diffDays > 0 ? diffDays : 1;
}

export function getDistanceHiked(
  displayedLocation: number,
  skippedSections: LocationInterval[],
  toDisplayUnit: ToDisplayUnit
): number {
  return toDisplayUnit(removeSkippedSection(displayedLocation, skippedSections), 1);
}

export function getEffectiveTotalDistance(
  selectedHikeTotalDistance: number,
  skippedSections: LocationInterval[],
  substractSkippedSections: boolean,
  toDisplayUnit: ToDisplayUnit
): number {
  const total = substractSkippedSections
    ? removeSkippedSection(selectedHikeTotalDistance, skippedSections)
    : selectedHikeTotalDistance;
  return toDisplayUnit(total, 0);
}

export function getTotalSkippedDistance(skippedSections: LocationInterval[], toDisplayUnit: ToDisplayUnit): number {
  const totalKm = skippedSections.reduce(
    (acc, section) => acc + (section.end.displayedLocation - section.start.displayedLocation),
    0
  );
  return toDisplayUnit(totalKm, 1);
}

const STEPS_PER_KM = 1312;
export function getStepsDisplay(displayedLocation: number, skippedSections: LocationInterval[]): string {
  const steps = removeSkippedSection(displayedLocation, skippedSections) * STEPS_PER_KM;
  if (steps >= 1_000_000) {
    return `${(steps / 1_000_000).toFixed(2)}M`;
  }
  return `${(steps / 1_000).toFixed(1)}k`;
}

export function calculatePercentage(
  displayedLocation: number,
  selectedHikeTotalDistance: number,
  skippedSections: LocationInterval[],
  substractSkippedSections: boolean
): number {
  if (substractSkippedSections) {
    return (
      (removeSkippedSection(displayedLocation, skippedSections) * 100) /
      removeSkippedSection(selectedHikeTotalDistance, skippedSections)
    );
  } else {
    return (removeSkippedSection(displayedLocation, skippedSections) * 100) / selectedHikeTotalDistance;
  }
}
