import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export const StickerMapLarge: React.FC = () => {
  const {
    distanceHiked,
    selectedHikeTotalDistance,
    showBorders,
    selectedHike,
    measurementUnit,
  } = useUserChoices();

  const { getIcon, theme } = useTheme();

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset:
      selectedHike?.stickerMetadata.pathLength! - progress.value,
  }));

  useEffect(() => {
    const ratio = Math.max(
      0,
      Math.min(1, distanceHiked / selectedHikeTotalDistance)
    );
    progress.value = withTiming(
      ratio * selectedHike?.stickerMetadata.pathLength!,
      {
        duration: 2000,
      }
    );
  }, [distanceHiked, selectedHikeTotalDistance]);

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
          width={selectedHike?.stickerMetadata.width! * 1.4}
          height={selectedHike?.stickerMetadata.height! * 1.4}
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
          <Path d={selectedHike?.path} stroke={theme.path} strokeWidth={16} />
          <AnimatedPath
            d={selectedHike?.path}
            stroke={theme.pathColored}
            strokeWidth={10}
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength!}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      <Image style={styles.logo} source={getIcon("icon")} />
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
    bottom: 0,
    right: 0,
    width: 80,
    height: 80,
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
