import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { calculateStrokeGeometry } from "@/src/helpers/calculateStrokeGeometry";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

type HikeProgressAnimationProps = {
  size?: number;
  start?: number;
  end?: number;
};

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({ size = 1, start, end }) => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const pathLocation = useUserSettingsStore((s) => s.location.pathLocation);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const isReverse = useUserSettingsStore((s) => s.isReverse);

  const { theme } = useTheme();

  const completionProgress = useSharedValue(0);

  useEffect(() => {
    if (selectedHikeTotalDistance > 0) {
      const percentage = Math.min(pathLocation / selectedHikeTotalDistance, 1);
      completionProgress.value = withTiming(percentage, { duration: 2000 });
    }
  }, [pathLocation, selectedHikeTotalDistance]);

  const startPoint = useDerivedValue(() => {
    const geometry = calculateStrokeGeometry(
      completionProgress.value,
      selectedHike?.stickerMetadata?.isRoundTrip,
      isReverse
    );
    return geometry.start;
  });

  const endPoint = useDerivedValue(() => {
    const geometry = calculateStrokeGeometry(
      completionProgress.value,
      selectedHike?.stickerMetadata?.isRoundTrip,
      isReverse
    );
    return geometry.end;
  });

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
      {selectedHike.regions?.map((region: string, index: number) => (
        <React.Fragment key={index}>
          <Path path={region} color={theme.borders} strokeWidth={1} style="stroke">
            <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
          </Path>
        </React.Fragment>
      ))}

      {selectedHike.border ? (
        <Path path={selectedHike.border} color={theme.borders} style="stroke" strokeWidth={1}>
          <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
        </Path>
      ) : null}

      <Path path={selectedHike.path} color={theme.path} style="stroke" strokeWidth={3} strokeCap="round">
        <Shadow dx={0.5} dy={0.5} blur={1} color="rgba(0,0,0,0.5)" />
      </Path>

      <Path
        path={selectedHike.path}
        color={theme.primary}
        style="stroke"
        strokeWidth={3}
        strokeCap="round"
        start={start ? start : startPoint}
        end={end ? end : endPoint}
      />
    </Canvas>
  );
};
