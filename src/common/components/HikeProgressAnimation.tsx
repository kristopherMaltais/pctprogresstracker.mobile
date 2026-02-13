import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { getHikedLocationIntervals } from "@/src/helpers/getHikedLocationIntervals";
import { LocationInterval } from "@/src/models/locationInterval";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect, useState } from "react";
import { useSharedValue, withTiming } from "react-native-reanimated";

type HikeProgressAnimationProps = {
  size?: number;
};

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({ size = 1 }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const location = useUserSettingsStore((s) => s.location);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);

  const [hikedSections, setHikedSections] = useState<LocationInterval[]>([]);

  const { theme } = useTheme();

  const completionProgress = useSharedValue(0);

  console.log(completionProgress);

  useEffect(() => {
    const sections = getHikedLocationIntervals(skippedSections);
    setHikedSections(sections);
  }, [skippedSections]);

  // Mettre à jour la progression globale (0 → 1)
  useEffect(() => {
    const progress = Math.min(location.pathLocation, 1); // déjà normalisé
    completionProgress.value = withTiming(progress, { duration: 2000 });
  }, [location]);

  if (!selectedHike) return null;

  return (
    <Canvas
      style={[
        {
          width: selectedHike.stickerMetadata.width,
          height: selectedHike.stickerMetadata.height,
        },
        { transform: [{ scale: size }] },
      ]}
    >
      {/* Régions et bordure */}
      {selectedHike.regions?.map((region, index) => (
        <Path key={index} path={region} color={theme.borders} strokeWidth={1} style="stroke">
          <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ))}

      {selectedHike.border && (
        <Path path={selectedHike.border} color={theme.borders} style="stroke" strokeWidth={1}>
          <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      )}

      {/* Path de fond */}
      <Path path={selectedHike.path} color={theme.path} style="stroke" strokeWidth={3} strokeCap="round">
        <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>

      {/* Path animé pour chaque intervalle hiked */}
      {hikedSections.map((interval, index) => {
        const start = interval.start.pathLocation; // déjà 0 → 1
        const end = interval.end.pathLocation;

        // On applique la progression globale pour chaque intervalle
        const currentEnd = start + completionProgress.value * (end - start);

        return (
          <Path
            key={`hiked-${index}`}
            path={selectedHike.path}
            color={theme.primary}
            style="stroke"
            strokeWidth={3}
            strokeCap="round"
            start={start}
            end={currentEnd > end ? end : currentEnd} // clamp
          />
        );
      })}
    </Canvas>
  );
};
