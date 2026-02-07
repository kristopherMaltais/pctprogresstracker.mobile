export const calculateStrokeGeometry = (rawProgress: number, isRoundTrip: boolean | undefined, isReverse: boolean) => {
  "worklet";

  const isReturnLeg = !!isRoundTrip && rawProgress > 0.5;

  let legProgress = rawProgress;

  if (isRoundTrip) {
    legProgress = isReturnLeg ? (rawProgress - 0.5) * 2 : rawProgress * 2;
  }

  const effectiveReverse = isReturnLeg ? !isReverse : isReverse;

  if (effectiveReverse) {
    return {
      start: 1 - legProgress,
      end: 1,
    };
  } else {
    return {
      start: 0,
      end: legProgress,
    };
  }
};
