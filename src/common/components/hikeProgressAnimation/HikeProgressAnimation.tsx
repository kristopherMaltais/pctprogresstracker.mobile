import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect, useMemo } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";
import { HikeInterval } from "./HikeInterval";

type HikeProgressAnimationProps = { size?: number };

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({ size = 1 }) => {
  const { theme } = useTheme();
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const location = useUserSettingsStore((s) => s.location);

  const skippedSections: LocationInterval[] = [
    { start: { pathLocation: 0, displayedLocation: 0 }, end: { pathLocation: 0.2, displayedLocation: 0.2 } },
    { start: { pathLocation: 0.8, displayedLocation: 0.8 }, end: { pathLocation: 1, displayedLocation: 1 } },
  ];

  const hikedIntervals = useMemo(() => {
    return getHikedLocationIntervals(skippedSections, location);
  }, [skippedSections, location]);

  const globalProgress = useSharedValue(0);

  useEffect(() => {
    globalProgress.value = withTiming(location.pathLocation, {
      duration: 3000,
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

      {hikedIntervals.map((interval, index) => (
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
