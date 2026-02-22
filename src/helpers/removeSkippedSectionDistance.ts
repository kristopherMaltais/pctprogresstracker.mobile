import { LocationInterval } from "../models/locationInterval";

export const removeSkippedSection = (currentLocation: number, skippedSections: LocationInterval[]): number => {
  const totalSkipped = skippedSections.reduce((acc, section) => {
    const start = section.start.displayedLocation;
    const end = section.end.displayedLocation;

    if (currentLocation >= end) {
      return acc + (end - start);
    } else if (currentLocation > start && currentLocation < end) {
      return acc + (currentLocation - start);
    }
    return acc;
  }, 0);

  return currentLocation - totalSkipped;
};
