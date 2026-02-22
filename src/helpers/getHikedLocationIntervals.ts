import { Location } from "../models/location";
import { LocationInterval } from "../models/locationInterval";

export const getHikedLocationIntervals = (
  skippedSections: LocationInterval[],
  currentLocation: Location
): LocationInterval[] => {
  const hiked: LocationInterval[] = [];
  let cursor = 0;
  const sortedSkips = [...skippedSections].sort((a, b) => a.start.pathLocation - b.start.pathLocation);

  for (const skip of sortedSkips) {
    const sStart = skip.start.pathLocation;
    const sEnd = skip.end.pathLocation;

    if (sStart >= currentLocation.pathLocation) break;

    if (cursor < sStart) {
      hiked.push({
        start: { displayedLocation: cursor, pathLocation: cursor },
        end: skip.start,
      });
    }

    cursor = Math.max(cursor, sEnd);
  }

  if (cursor < currentLocation.pathLocation) {
    hiked.push({
      start: { displayedLocation: cursor, pathLocation: cursor },
      end: currentLocation,
    });
  }

  return hiked;
};
