import { Hike } from "@/models/hike";
import { withTiming } from "react-native-reanimated";

export const getPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  selectedHike: Hike
) => {
  if (!selectedHike?.stickerMetadata.pathLength) return;

  if (!selectedHike.stickerMetadata.isRoundTrip) {
    return getOneWayPath(
      pathDistanceHiked,
      selectedHikeTotalDistance,
      displayedDistanceHiked,
      selectedHike
    );
  } else {
    return getRoundTripPath(
      pathDistanceHiked,
      selectedHikeTotalDistance,
      displayedDistanceHiked,
      selectedHike
    );
  }
};

const getOneWayPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  selectedHike: Hike
) => {
  const ratio = Math.max(
    0,
    Math.min(1, pathDistanceHiked / selectedHikeTotalDistance)
  );

  var value = 0;
  if (pathDistanceHiked != displayedDistanceHiked) {
    value = ratio * selectedHike.stickerMetadata.pathLength;
  } else {
    value = withTiming(ratio * selectedHike.stickerMetadata.pathLength, {
      duration: 2000,
    });
  }

  return { value: value, isWayBack: false };
};

const getRoundTripPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  selectedHike: Hike
) => {
  const selectedHikeHalfDistance = selectedHikeTotalDistance / 2;
  let newPathDistanceHiked = 0;
  let isWayBack = false;

  if (pathDistanceHiked > selectedHikeHalfDistance) {
    newPathDistanceHiked = pathDistanceHiked - selectedHikeHalfDistance;
    isWayBack = true;
  } else {
    newPathDistanceHiked = pathDistanceHiked;
  }

  const ratio = Math.max(
    0,
    Math.min(1, newPathDistanceHiked / selectedHikeHalfDistance)
  );

  var value = 0;
  if (pathDistanceHiked != displayedDistanceHiked) {
    value = ratio * selectedHike.stickerMetadata.pathLength;
  } else {
    value = withTiming(ratio * selectedHike.stickerMetadata.pathLength, {
      duration: 2000,
    });
  }

  return { value: value, isWayBack: isWayBack };
};

export const getIsReverse = (isReverse: boolean, isWayBack: boolean) => {
  if ((isReverse && isWayBack) || (!isReverse && !isWayBack)) {
    return false;
  } else {
    return true;
  }
};
