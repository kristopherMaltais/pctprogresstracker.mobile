export const getSequentialInterval = (
  progress: number,
  startT: number,
  endT: number,
  start: number,
  end: number
): number => {
  "worklet";

  let segmentProgress = 0;

  if (progress <= startT) {
    segmentProgress = 0;
  } else if (progress >= endT) {
    segmentProgress = 1;
  } else {
    segmentProgress = (progress - startT) / (endT - startT);
  }

  return start + segmentProgress * (end - start);
};
