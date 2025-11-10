import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect } from "react";
import { Image, StyleSheet, View } from "react-native";
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
    strokeDashoffset: selectedHike?.pathLength! - progress.value,
  }));

  useEffect(() => {
    const ratio = Math.max(
      0,
      Math.min(1, distanceHiked / selectedHikeTotalDistance)
    );
    progress.value = withTiming(ratio * selectedHike?.pathLength!, {
      duration: 2000,
    });
  }, [distanceHiked, selectedHikeTotalDistance]);

  return (
    <View>
      <View style={styles.container}>
        <Svg width={185} height={500} viewBox="30 35 190 502" fill="none">
          {showBorders && (
            <Path d={selectedHike?.border} stroke="white" strokeWidth={1} />
          )}
          <Path d={selectedHike?.path} stroke="#D5D5D5" strokeWidth={6} />
          <AnimatedPath
            d={selectedHike?.path}
            stroke="#FC5200"
            strokeWidth={4}
            fill="none"
            strokeDasharray={selectedHike?.pathLength!}
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      <Image
        source={require("@/assets/images/pctNoBackground.png")}
        style={styles.logo}
      />
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
  logo: {
    width: 50,
    height: 50,
    position: "absolute",
    bottom: 30,
    right: -43,
  },
});
