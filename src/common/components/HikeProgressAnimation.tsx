import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { calculateStrokeGeometry } from "@/src/helpers/calculateStrokeGeometry";
import { Canvas, Path, Shadow } from "@shopify/react-native-skia";
import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import { useDerivedValue, useSharedValue, withTiming } from "react-native-reanimated";

type HikeProgressAnimationProps = {
  isHorizontal?: boolean;
  size?: number;
  isCenter?: boolean;
};

export const HikeProgressAnimation: React.FC<HikeProgressAnimationProps> = ({
  isHorizontal,
  size = 1,
  isCenter = false,
}) => {
  const { selectedHike, pathDistanceHiked, selectedHikeTotalDistance, isReverse } = useUserChoices();
  const { theme } = useTheme();

  const completionProgress = useSharedValue(0);

  useEffect(() => {
    if (selectedHikeTotalDistance > 0) {
      const percentage = Math.min(pathDistanceHiked / selectedHikeTotalDistance, 1);
      completionProgress.value = withTiming(percentage, { duration: 2000 });
    }
  }, [pathDistanceHiked, selectedHikeTotalDistance]);

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
    <Canvas style={[isHorizontal ? styles.horizontal : styles.vertical, { transform: [{ scale: size }] }]}>
      {selectedHike.regions?.map((region: string, index: number) => (
        <React.Fragment key={index}>
          <Path path={region} color={theme.borders} strokeWidth={1} style="stroke" />
        </React.Fragment>
      ))}

      {selectedHike.border ? (
        <Path path={selectedHike.border} color={theme.borders} style="stroke" strokeWidth={1} />
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
        start={startPoint}
        end={endPoint}
      />
    </Canvas>
  );
};

const styles = StyleSheet.create({
  horizontal: {
    width: 150,
    height: 205,
  },
  vertical: {
    width: 200,
    height: 205,
  },
});
