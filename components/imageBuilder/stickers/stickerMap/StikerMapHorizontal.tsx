import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import { getIsReverse, getPath } from "@/helpers/getPath";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { reverse } from "svg-path-reverse";

export const StickerMapHorizontal: React.FC = () => {
  const {
    selectedHike,
    displayedDistanceHiked,
    pathDistanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showBorders,
    isReverse,
  } = useUserChoices();

  const { t } = useTranslation();
  const [isWayBack, setIsWayBack] = useState<boolean>(false);

  const { getIcon, theme } = useTheme();

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const length = selectedHike?.stickerMetadata.pathLength ?? 0;
    return {
      strokeDashoffset: length - progress.value,
    } as any;
  });

  useEffect(() => {
    const newPath = getPath(
      pathDistanceHiked,
      selectedHikeTotalDistance,
      displayedDistanceHiked,
      selectedHike!
    );

    progress.value = 0;
    setIsWayBack(newPath?.isWayBack!);
    if (newPath) progress.value = newPath.value;
  }, [
    pathDistanceHiked,
    selectedHikeTotalDistance,
    selectedHike?.stickerMetadata.pathLength,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Image
          source={getIcon("iconWithTextBackground")}
          style={{ width: 60, height: 60 }}
        />
        <Text style={styles.name}>{selectedHike?.name}</Text>
        <Text style={styles.label}>{t("index:sticker.total")}</Text>
        <Text style={styles.value}>
          {selectedHikeTotalDistance} {getMeasurementUnit(measurementUnit)}
        </Text>
        <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
        <Text style={styles.value}>
          {displayedDistanceHiked} {getMeasurementUnit(measurementUnit)}
        </Text>
      </View>
      <Svg width={150} height={200} viewBox="0 0 150 200" fill="none">
        {true && (
          <>
            <Path
              d={selectedHike?.border}
              stroke={theme.borders}
              strokeWidth={1}
            />
            {selectedHike?.regions.map((region: string, index: number) => {
              return (
                <Path
                  key={index}
                  d={region}
                  stroke={theme.borders}
                  strokeWidth={1}
                  fill={theme.background}
                />
              );
            })}
          </>
        )}
        <Path
          d={selectedHike?.path}
          stroke={theme.path}
          strokeWidth={3}
          strokeLinecap="round"
        />
        <AnimatedPath
          d={
            getIsReverse(isReverse, isWayBack)
              ? reverse(selectedHike?.path!)
              : selectedHike?.path!
          }
          stroke={theme.pathColored}
          strokeWidth={3}
          fill="none"
          strokeDasharray={selectedHike?.stickerMetadata.pathLength}
          animatedProps={animatedProps}
          strokeLinecap="round"
        />
      </Svg>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: 120,
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  name: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1,
  },
});
