import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { useEffect, useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { reverse } from "svg-path-reverse";

export const StickerMapLarge: React.FC = () => {
  const {
    distanceHiked,
    selectedHikeTotalDistance,
    showBorders,
    selectedHike,
    measurementUnit,
  } = useUserChoices();

  const { getIcon, theme } = useTheme();
  const [isReverse, setIsReverse] = useState<boolean>(true);

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      selectedHike?.stickerMetadata.pathLength! - progress.value,
  }));

  useEffect(() => {
    if (!selectedHike?.stickerMetadata.pathLength) return;

    let _distanceHiked = distanceHiked;
    let _selectedHikedTotalDistance = selectedHikeTotalDistance;
    if (
      selectedHike.stickerMetadata.isRoundTrip &&
      distanceHiked > selectedHike.totalDistanceKilometer / 2
    ) {
      _selectedHikedTotalDistance = selectedHikeTotalDistance / 2;
      _distanceHiked = distanceHiked - _selectedHikedTotalDistance;
      setIsReverse(true);
    } else {
      setIsReverse(false);
    }

    const ratio = Math.max(
      0,
      Math.min(1, _distanceHiked / _selectedHikedTotalDistance)
    );

    progress.value = 0;
    progress.value = withTiming(
      ratio * selectedHike.stickerMetadata.pathLength,
      {
        duration: 2000,
      }
    );
  }, [
    distanceHiked,
    selectedHikeTotalDistance,
    selectedHike?.stickerMetadata.pathLength,
  ]);

  return (
    <View style={styles.container}>
      <View style={styles.trailInformation}>
        <Text style={styles.trailName}>{selectedHike?.name}</Text>
        <Text style={styles.distanceHiked}>
          {distanceHiked} / {selectedHikeTotalDistance}{" "}
          {measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi"}
        </Text>
      </View>
      <View>
        <Svg
          width={
            selectedHike?.stickerMetadata.width! *
            selectedHike?.stickerMetadata.largeStickerRatio!
          }
          height={
            selectedHike?.stickerMetadata.height! *
            selectedHike?.stickerMetadata.largeStickerRatio!
          }
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
            strokeWidth={16}
            strokeLinecap="round"
          />
          <AnimatedPath
            strokeLinecap="round"
            d={isReverse ? reverse(selectedHike?.path!) : selectedHike?.path}
            stroke={theme.pathColored}
            strokeWidth={10}
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength!}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      <Image style={styles.logo} source={getIcon("iconWithTextBackground")} />
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
