import { useCalibrationContext } from "@/src/contexts/calibration/CalibrationContext";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { reverse } from "svg-path-reverse";
import { HikeInterval } from "./HikeInterval";

type HikeProgressAnimationProps = {
  size?: number;
  skippedSectionsDisplay?: LocationInterval[];
  hideDecorations?: boolean;
  color: string;
};

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({
  size = 1,
  skippedSectionsDisplay,
  hideDecorations = false,
  color,
}) => {
  const { theme } = useTheme();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const location = useUserSettingsStore((s) => s.location);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const isReverse = useUserSettingsStore((s) => s.isReverse);
  const { calibrationProgress, isCalibratePositionOpen } = useCalibrationContext();

  const effectiveTotalDistance = selectedHike?.isRoundtrip ? selectedHikeTotalDistance / 2 : selectedHikeTotalDistance;

  // Normal mode: animate path to new location when the user updates their position.
  const animatedLocation = useSharedValue(0);

  useEffect(() => {
    if (isCalibratePositionOpen) return;
    let loc = location.pathLocation;
    if (selectedHike?.isRoundtrip && loc > selectedHikeTotalDistance / 2) {
      loc = loc - selectedHikeTotalDistance / 2;
    }
    animatedLocation.value = withTiming(loc, { duration: 800 });
  }, [location]);

  const activeProgress = isCalibratePositionOpen ? calibrationProgress : animatedLocation;

  // Calibration: extend the interval to the full effective distance so the slider
  // can drive globalProgress from 0 to effectiveTotalDistance freely.
  const calibrationIntervals = useMemo(() => {
    return getHikedLocationIntervals(skippedSections, {
      displayedLocation: effectiveTotalDistance,
      pathLocation: effectiveTotalDistance,
    });
  }, [skippedSections, effectiveTotalDistance]);

  // Normal mode: adjust pathLocation values for roundtrip return leg so HikeInterval
  // receives positions in the 0–effectiveTotalDistance range (matching animatedLocation).
  const normalIntervals = useMemo(() => {
    const intervals = getHikedLocationIntervals(skippedSections, location);
    if (!selectedHike?.isRoundtrip || location.pathLocation <= selectedHikeTotalDistance / 2) {
      return intervals;
    }
    const half = selectedHikeTotalDistance / 2;
    return intervals.map((interval) => ({
      start: { ...interval.start, pathLocation: Math.max(0, interval.start.pathLocation - half) },
      end: { ...interval.end, pathLocation: Math.max(0, interval.end.pathLocation - half) },
    }));
  }, [skippedSections, location, isReverse, selectedHike?.isRoundtrip, selectedHikeTotalDistance]);

  const hikedIntervals = isCalibratePositionOpen ? calibrationIntervals : normalIntervals;

  // Gestion du path si est reversed ou non
  const path = useMemo(() => {
    if (!selectedHike) return "";
    let _path = selectedHike.maps[selectedHike.selectedMapIndex].path;
    if (selectedHike.isRoundtrip && location.pathLocation > selectedHikeTotalDistance / 2) {
      _path = reverse(_path);
    } else if (isReverse) {
      _path = reverse(_path);
    }
    return _path;
  }, [selectedHike?.maps[selectedHike?.selectedMapIndex]?.path, isReverse, location.pathLocation]);

  if (!selectedHike) return null;

  return (
    <Canvas
      key={selectedHike.id}
      style={[
        {
          width: selectedHike.maps[selectedHike.selectedMapIndex].width,
          height: selectedHike.maps[selectedHike.selectedMapIndex].height,
        },
        { transform: [{ scale: size }] },
      ]}
    >
      {!hideDecorations &&
        selectedHike.maps[selectedHike.selectedMapIndex].decorations?.map((decoration: string, index) => (
          <Path key={`decoration-${index}`} path={decoration} color={color} strokeWidth={1} style="stroke">
            <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
          </Path>
        ))}

      <Path
        path={selectedHike.maps[selectedHike.selectedMapIndex].path}
        color={theme.path}
        style="stroke"
        strokeWidth={3}
        strokeCap="round"
      >
        <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>

      {skippedSectionsDisplay
        ? skippedSectionsDisplay.map((interval, index) => (
            <Path
              key={index}
              path={path}
              color={theme.primary}
              style="stroke"
              strokeCap={"square"}
              strokeWidth={3}
              start={interval.start.pathLocation / effectiveTotalDistance}
              end={interval.end.pathLocation / effectiveTotalDistance}
            />
          ))
        : hikedIntervals.map((interval, index) => (
            <HikeInterval
              selectedHikeTotalDistance={effectiveTotalDistance}
              path={path}
              key={`hike-interval-${index}`}
              interval={interval}
              globalProgress={activeProgress}
              color={theme.primary}
            />
          ))}
    </Canvas>
  );
};
