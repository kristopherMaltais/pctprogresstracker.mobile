import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import { getIsReverse, getPath } from "@/helpers/getPath";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
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
    displayedDistanceHiked,
    isReverse,
    showLogo,
  } = useUserChoices();

  const [isWayBack, setIsWayBack] = useState<boolean>(false);
  const { t } = useTranslation();

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const { getIcon, theme } = useTheme();
  const isIos = Platform.OS == "ios";

  const animatedProps = useAnimatedProps(() => {
    const length = isIos
      ? selectedHike?.stickerMetadata.iosPathLength
      : selectedHike?.stickerMetadata.androidPathLength;
    return {
      strokeDashoffset: length! - progress.value,
    } as any;
  });

  useEffect(() => {
    const newPath = getPath(
      pathDistanceHiked,
      selectedHikeTotalDistance,
      displayedDistanceHiked,
      selectedHike!,
      isIos
    );

    progress.value = 0;
    setIsWayBack(newPath?.isWayBack!);
    if (newPath) progress.value = newPath.value;
  }, [
    pathDistanceHiked,
    selectedHikeTotalDistance,
    selectedHike?.stickerMetadata.iosPathLength,
    selectedHike?.stickerMetadata.androidPathLength,
  ]);

  return (
    <View style={styles.container}>
      <Svg width={200} height={200} viewBox={"0 0 200 200"} fill="none">
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
              />
            );
          })}
        </>
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
          strokeLinecap="round"
          fill="none"
          strokeDasharray={
            isIos
              ? selectedHike?.stickerMetadata.iosPathLength
              : selectedHike?.stickerMetadata.androidPathLength
          }
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.statsContainer}>
        {showLogo && (
          <Image
            source={getIcon("iconWithTextBackground")}
            style={{ width: 60, height: 60 }}
          />
        )}
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
    fontSize: 12,
  },
  value: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },

  name: {
    marginTop: 12,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
  },
});
