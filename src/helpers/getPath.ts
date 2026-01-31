import { Hike } from "@/src/models/hike";
import { withTiming } from "react-native-reanimated";

export const getPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  selectedHike: Hike,
  isIos: boolean
) => {
  if (!selectedHike?.stickerMetadata.iosPathLength || !selectedHike?.stickerMetadata.androidPathLength) return;

  const length = isIos ? selectedHike.stickerMetadata.iosPathLength : selectedHike.stickerMetadata.androidPathLength;

  if (!selectedHike.stickerMetadata.isRoundTrip) {
    return getOneWayPath(pathDistanceHiked, selectedHikeTotalDistance, displayedDistanceHiked, length);
  } else {
    return getRoundTripPath(pathDistanceHiked, selectedHikeTotalDistance, displayedDistanceHiked, length);
  }
};

const getOneWayPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  pathLength: number
) => {
  const ratio = Math.max(0, Math.min(1, pathDistanceHiked / selectedHikeTotalDistance));

  var value = 0;
  if (pathDistanceHiked != displayedDistanceHiked) {
    value = ratio * pathLength;
  } else {
    value = withTiming(ratio * pathLength, {
      duration: 2000,
    });
  }

  return { value: value, isWayBack: false };
};

const getRoundTripPath = (
  pathDistanceHiked: number,
  selectedHikeTotalDistance: number,
  displayedDistanceHiked: number,
  pathLength: number
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

  const ratio = Math.max(0, Math.min(1, newPathDistanceHiked / selectedHikeHalfDistance));

  var value = 0;
  if (pathDistanceHiked != displayedDistanceHiked) {
    value = ratio * pathLength;
  } else {
    value = withTiming(ratio * pathLength, {
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
