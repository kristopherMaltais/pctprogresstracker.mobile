import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { getIsReverse, getPath } from "@/src/helpers/getPath";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
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
  console.log("smv");

  useEffect(() => {
    const newPath = getPath(pathDistanceHiked, selectedHikeTotalDistance, displayedDistanceHiked, selectedHike!, isIos);

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
      <Svg width={203} height={205} viewBox={"0 0 200 205"} fill="none">
        <>
          <Path d={selectedHike?.border} stroke="rgba(0,0,0,0.03)" strokeWidth={5} transform="translate(0, 1.5)" />
          <Path d={selectedHike?.border} stroke="rgba(0,0,0,0.08)" strokeWidth={3} transform="translate(0, 1)" />

          <Path d={selectedHike?.border} stroke={theme.borders} strokeWidth={1} />
          {selectedHike?.regions.map((region: string, index: number) => {
            return (
              <React.Fragment key={index}>
                <Path
                  d={region}
                  stroke="rgba(0,0,0,0.03)"
                  strokeWidth={5}
                  transform="translate(0, 1.5)"
                  fill="transparent"
                />

                <Path
                  d={region}
                  stroke="rgba(0,0,0,0.07)"
                  strokeWidth={2.5}
                  transform="translate(0, 1)"
                  fill="transparent"
                />

                <Path d={region} stroke={theme.borders} strokeWidth={1} fill={theme.background} />
              </React.Fragment>
            );
          })}
        </>
        <Path
          d={selectedHike?.path}
          stroke="rgba(0,0,0,0.04)"
          strokeWidth={7}
          strokeLinecap="round"
          transform="translate(0, 1.5)"
        />
        <Path
          d={selectedHike?.path}
          stroke="rgba(0,0,0,0.08)"
          strokeWidth={5}
          strokeLinecap="round"
          transform="translate(0, 1)"
        />

        {/* 3. Le tracé principal de la randonnée */}
        <Path d={selectedHike?.path} stroke={theme.path} strokeWidth={3} strokeLinecap="round" />
        <AnimatedPath
          d={getIsReverse(isReverse, isWayBack) ? reverse(selectedHike?.path!) : selectedHike?.path!}
          stroke={theme.pathColored}
          strokeWidth={3}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={
            isIos ? selectedHike?.stickerMetadata.iosPathLength : selectedHike?.stickerMetadata.androidPathLength
          }
          animatedProps={animatedProps}
        />
      </Svg>
      <View style={styles.statsContainer}>
        {showLogo && <Image source={getIcon("iconWithTextBackground")} style={{ width: 60, height: 60 }} />}
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

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  value: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  name: {
    marginTop: 12,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
