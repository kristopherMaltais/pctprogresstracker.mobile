import { LocationInterval } from "@/src/models/locationInterval";

export type WeightedInterval = LocationInterval & {
  length: number;
  startT: number;
  endT: number;
};

// Allow each interval to animate with the same speed
export const getWeightedIntervals = (intervals: LocationInterval[]): WeightedInterval[] => {
  const WeightedIntervals = intervals.map((interval) => {
    const length = interval.end.pathLocation - interval.start.pathLocation;
    return { ...interval, length };
  });

  const totalLength = WeightedIntervals.reduce((sum, s) => sum + s.length, 0);

  let accumulator = 0;

  return WeightedIntervals.map((segment) => {
    const startT = accumulator / totalLength;
    accumulator += segment.length;
    const endT = accumulator / totalLength;

    return {
      ...segment,
      startT,
      endT,
    };
  });
};
