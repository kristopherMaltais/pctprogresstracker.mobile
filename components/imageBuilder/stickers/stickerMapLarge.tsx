import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getIsReverse, getPath } from "@/helpers/getPath";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { reverse } from "svg-path-reverse";

export const StickerMapLarge: React.FC = () => {
  const {
    displayedDistanceHiked,
    pathDistanceHiked,
    selectedHikeTotalDistance,
    selectedHike,
    measurementUnit,
    isReverse,
    showLogo,
  } = useUserChoices();

  const { getIcon, theme } = useTheme();
  const [isWayBack, setIsWayBack] = useState<boolean>(false);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      selectedHike?.stickerMetadata.pathLength! - progress.value,
  }));

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
      <View style={styles.trailInformation}>
        <Text style={styles.trailName}>{selectedHike?.name}</Text>
        <Text style={styles.distanceHiked}>
          {displayedDistanceHiked} / {selectedHikeTotalDistance}{" "}
          {measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
        </Text>
      </View>
      <View>
        <Svg
          width={150}
          height={200}
          viewBox={selectedHike?.stickerMetadata.stickerLargeViewBox}
          fill="none"
          style={{ transform: [{ scale: 1.7 }] }}
        >
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
            strokeLinecap="round"
            d={
              getIsReverse(isReverse, isWayBack)
                ? reverse(selectedHike?.path!)
                : selectedHike?.path!
            }
            stroke={theme.pathColored}
            strokeWidth={3}
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength!}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      {showLogo && (
        <Image style={styles.logo} source={getIcon("iconWithTextBackground")} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    width: "100%",
    height: "100%",
    alignItems: "center",
    justifyContent: "center",
  },
  logo: {
    position: "absolute",
    bottom: 10,
    right: 20,
    width: 60,
    height: 55,
  },
  trailName: {
    color: "white",
    fontSize: 20,
    fontWeight: "bold",
  },
  distanceHiked: {
    color: "white",
    fontSize: 14,
  },
  trailInformation: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
