import { LocationInterval } from "../models/locationInterval";

export const getHikedLocationIntervals = (skippedSections: LocationInterval[]): LocationInterval[] => {
  if (skippedSections.length === 0) {
    return [{ start: { displayedLocation: 0, pathLocation: 0 }, end: { displayedLocation: 1, pathLocation: 1 } }];
  }

  // 2️⃣ Tri des intervalles par start
  const sorted = skippedSections
    .map((s) => ({
      start: s.start.pathLocation,
      end: s.end.pathLocation,
    }))
    .sort((a, b) => a.start - b.start);

  const result: LocationInterval[] = [];

  // 3️⃣ Intervalle avant le premier skipped
  if (sorted[0].start > 0) {
    result.push({
      start: { displayedLocation: 0, pathLocation: 0 },
      end: { displayedLocation: sorted[0].start, pathLocation: sorted[0].start },
    });
  }

  // 4️⃣ Intervalles entre les skipped
  for (let i = 0; i < sorted.length - 1; i++) {
    const currentEnd = sorted[i].end;
    const nextStart = sorted[i + 1].start;

    if (nextStart > currentEnd) {
      result.push({
        start: { displayedLocation: currentEnd, pathLocation: currentEnd },
        end: { displayedLocation: nextStart, pathLocation: nextStart },
      });
    }
  }

  // 5️⃣ Intervalle après le dernier skipped
  const lastEnd = sorted[sorted.length - 1].end;
  if (lastEnd < 1) {
    result.push({
      start: { displayedLocation: lastEnd, pathLocation: lastEnd },
      end: { displayedLocation: 1, pathLocation: 1 },
    });
  }

  return result;
};
