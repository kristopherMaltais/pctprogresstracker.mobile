import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect, useMemo, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { reverse } from "svg-path-reverse";
import { HikeInterval } from "./HikeInterval";

type HikeProgressAnimationProps = { size?: number; skippedSectionsDisplay?: LocationInterval[] };

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({ size = 1, skippedSectionsDisplay }) => {
  const { theme } = useTheme();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const location = useUserSettingsStore((s) => s.location);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const isCalibratePositionOpen = useUserSettingsStore((s) => s.isCalibratePositionOpen);
  const isReverse = useUserSettingsStore((s) => s.isReverse);

  const [_selectedHikeTotalDistance, _setSelectedHikeTotalDistance] = useState<number>(0);

  useEffect(() => {
    _setSelectedHikeTotalDistance(
      selectedHike?.isRoundtrip ? selectedHikeTotalDistance / 2 : selectedHikeTotalDistance
    );
  }, [selectedHike, selectedHikeTotalDistance]);

  const hikedIntervals = useMemo(() => {
    return getHikedLocationIntervals(skippedSections, location);
  }, [skippedSections, location, isReverse]);

  const globalProgress = useSharedValue(0);

  useEffect(() => {
    var _location = location.pathLocation;

    if (selectedHike?.isRoundtrip && _location > selectedHikeTotalDistance / 2) {
      _location = _location - selectedHikeTotalDistance / 2;
    }

    if (isCalibratePositionOpen) {
      globalProgress.value = _location;
    } else {
      globalProgress.value = withTiming(_location, {
        duration: 1500,
      });
    }
  }, [location]);

  if (!selectedHike) return null;

  const path = useMemo(() => {
    var _path = selectedHike.path;

    if (selectedHike.isRoundtrip && location.pathLocation > selectedHikeTotalDistance / 2) {
      _path = reverse(_path);
    } else if (isReverse) {
      _path = reverse(_path);
    }
    return _path;
  }, [selectedHike?.path, isReverse, location.pathLocation]);

  return (
    <Canvas
      key={selectedHike.id}
      style={[
        {
          width: selectedHike.sticker.width,
          height: selectedHike.sticker.height,
        },
        { transform: [{ scale: size }] },
      ]}
    >
      {selectedHike.decorations?.map((decoration: string, index) => (
        <Path key={`decoration-${index}`} path={decoration} color={theme.decorations} strokeWidth={1} style="stroke">
          <Shadow dx={0.2} dy={0.2} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ))}

      <Path path={selectedHike.path} color={theme.path} style="stroke" strokeWidth={3} strokeCap="round">
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
              start={interval.start.pathLocation / _selectedHikeTotalDistance}
              end={interval.end.pathLocation / _selectedHikeTotalDistance}
            />
          ))
        : hikedIntervals.map((interval, index) => (
            <HikeInterval
              selectedHikeTotalDistance={_selectedHikeTotalDistance}
              path={path}
              key={`hike-interval-${index}`}
              interval={interval}
              globalProgress={globalProgress}
              color={theme.primary}
            />
          ))}
    </Canvas>
  );
};
