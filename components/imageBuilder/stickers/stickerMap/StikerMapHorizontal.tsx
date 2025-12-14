import { GestureWrapper } from "@/components/common/GestureWrapper";
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
    <GestureWrapper>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Image
            source={getIcon("iconWithTextBackground")}
            style={{ width: 84, height: 75 }}
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
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </GestureWrapper>
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
    width: 160,
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
    textAlign: "center",
    flexShrink: 1,
  },
});
