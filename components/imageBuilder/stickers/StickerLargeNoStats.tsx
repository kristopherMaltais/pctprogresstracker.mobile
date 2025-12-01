import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export const StickerLargeNoStats: React.FC = () => {
  const {
    distanceHiked,
    selectedHikeTotalDistance,
    showBorders,
    selectedHike,
  } = useUserChoices();

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
    <View>
      <View>
        <Svg
          width={selectedHike?.stickerMetadata.width! * 1.2}
          height={selectedHike?.stickerMetadata.height! * 1.2}
          viewBox={selectedHike?.stickerMetadata.viewbox}
          fill="none"
        >
          {showBorders && (
            <>
              <Path d={selectedHike?.border} stroke="white" strokeWidth={4} />
              {selectedHike?.regions.map((region: string, index: number) => {
                return (
                  <Path key={index} d={region} stroke="white" strokeWidth={4} />
                );
              })}
            </>
          )}
          <Path d={selectedHike?.path} stroke="#D5D5D5" strokeWidth={16} />
          <AnimatedPath
            d={selectedHike?.path}
            stroke="#FC5200"
            strokeWidth={10}
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength!}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    width: 200,
    height: "100%",
    alignItems: "center",
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 10,
  },
  value: {
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },

  percentage: {
    marginTop: 18,
    fontSize: 40,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
