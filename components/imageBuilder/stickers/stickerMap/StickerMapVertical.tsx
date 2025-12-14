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

export const StickerMapVertical: React.FC = () => {
  const {
    selectedHike,
    pathDistanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showBorders,
    displayedDistanceHiked,
    isReverse,
  } = useUserChoices();

  const [isWayBack, setIsWayBack] = useState<boolean>(false);
  const { t } = useTranslation();

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const { getIcon, theme } = useTheme();

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
      <Svg
        width={selectedHike?.stickerMetadata.width}
        height={selectedHike?.stickerMetadata.height}
        viewBox={selectedHike?.stickerMetadata.viewbox}
        fill="none"
      >
        {showBorders && (
          <>
            <Path
              d={selectedHike?.border}
              stroke={theme.borders}
              strokeWidth={4}
            />
            {selectedHike?.regions.map((region: string, index: number) => {
              return (
                <Path
                  key={index}
                  d={region}
                  stroke={theme.borders}
                  strokeWidth={4}
                />
              );
            })}
          </>
        )}
        <Path
          d={selectedHike?.path}
          stroke={theme.path}
          strokeWidth={10}
          strokeLinecap="round"
        />
        <AnimatedPath
          d={
            getIsReverse(isReverse, isWayBack)
              ? reverse(selectedHike?.path!)
              : selectedHike?.path!
          }
          stroke={theme.pathColored}
          strokeWidth={10}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={selectedHike?.stickerMetadata.pathLength}
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.statsContainer}>
        <Image
          source={getIcon("iconWithTextBackground")}
          style={{ width: 100, height: 90 }}
        />
        <View>
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
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "column",
    alignItems: "center",
  },
  statsContainer: {
    display: "flex",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 30,
    paddingHorizontal: 20,
    width: "100%",
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 18,
  },
  value: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },

  name: {
    marginTop: 12,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },
});
