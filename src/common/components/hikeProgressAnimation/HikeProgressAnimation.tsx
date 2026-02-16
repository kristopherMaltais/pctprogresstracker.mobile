import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { HikeInterval } from "./HikeInterval";

type HikeProgressAnimationProps = { size?: number; skippedSectionsDisplay?: LocationInterval[] };

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({ size = 1, skippedSectionsDisplay }) => {
  const { theme } = useTheme();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const location = useUserSettingsStore((s) => s.location);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);

  const hikedIntervals = useMemo(() => {
    return getHikedLocationIntervals(skippedSections, location);
  }, [skippedSections, location]);

  // console.log(skippedSections);
  console.log(hikedIntervals);

  const globalProgress = useSharedValue(0);

  useEffect(() => {
    globalProgress.value = withTiming(location.pathLocation, {
      duration: 1500,
    });
  }, [location]);

  if (!selectedHike) return null;

  return (
    <Canvas
      style={[
        { width: selectedHike.stickerMetadata.width, height: selectedHike.stickerMetadata.height },
        { transform: [{ scale: size }] },
      ]}
    >
      {selectedHike.regions?.map((region, index) => (
        <Path key={`region-${index}`} path={region} color={theme.borders} strokeWidth={1} style="stroke">
          <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ))}

      {selectedHike.border && (
        <Path path={selectedHike.border} color={theme.borders} style="stroke" strokeWidth={1}>
          <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      )}

      <Path path={selectedHike.path} color={theme.path} style="stroke" strokeWidth={3} strokeCap="round">
        <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>

      {skippedSectionsDisplay
        ? skippedSectionsDisplay.map((interval, index) => (
            <Path
              key={index}
              path={selectedHike?.path!}
              color={theme.primary}
              style="stroke"
              strokeCap={"square"}
              strokeWidth={3}
              start={interval.start.pathLocation / selectedHikeTotalDistance}
              end={interval.end.pathLocation / selectedHikeTotalDistance}
            />
          ))
        : hikedIntervals.map((interval, index) => (
            <HikeInterval
              key={`hike-interval-${index}`}
              interval={interval}
              globalProgress={globalProgress}
              path={selectedHike.path}
              color={theme.primary}
            />
          ))}
    </Canvas>
  );
};
