import { useEffect } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

const PATH_LENGTH = 1166;
const PCT_PATH_D =
  "M218.368 956.5C219.592 958.158 201.868 949.5 201.868 927C201.867 904.5 202.754 899.35 200.368 891C197.982 882.65 197.367 881 192.367 876C187.367 871 185.231 870.738 173.367 867C161.504 863.262 126.867 848 127.867 830C127.729 818.702 130.322 818.248 139.867 813C149.413 807.752 157.367 795 154.867 771C150.276 714.717 137.72 691.083 129.867 669C108.923 610.563 92.1242 560.177 74.3673 528C56.6104 495.823 83.8673 457.5 57.3673 437C40.4005 427.862 36.3357 445.913 13.3673 419C1.48057 405.821 5.4644 370.62 6.36731 364.5C41.8475 370.762 55.1559 367.533 68.3673 351C118.74 277.979 127.048 241.9 133.867 179.5C135.003 168.731 147.021 160.68 155.867 147C164.714 133.32 156.051 124.892 165.867 112C196.472 84.739 193.413 83.7091 194.867 77C199.942 52.3633 197.519 47.4051 189.367 45C181.777 41.526 208.867 23 212.367 1";

interface PCTProgressProps {
  milesDone: number;
  totalMiles: number;
  width?: number;
  height?: number;
  durationSeconds?: number;
}

const AnimatedPath = Animated.createAnimatedComponent(Path);

export const PctSticker: React.FC<PCTProgressProps> = ({
  milesDone,
  totalMiles,
  width = 100,
  height = 100,
  durationSeconds = 2,
}) => {
  const progress = useSharedValue(0);

  // const pathRef = useRef(null);

  // useEffect(() => {
  //   if (pathRef.current !== null) {
  //     const length = pathRef.current.getTotalLength();
  //     console.log("Path length:", length);
  //   }
  // }, []);

  useEffect(() => {
    const ratio = Math.max(0, Math.min(1, milesDone / totalMiles));
    progress.value = withTiming(ratio * PATH_LENGTH, {
      duration: durationSeconds * 1000,
    });
  }, [milesDone, totalMiles]);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: PATH_LENGTH - progress.value,
  }));

  return (
    <View style={styles.container}>
      <Svg
        style={{ marginRight: 0, marginBottom: 0, marginTop: 15 }}
        width={80}
        height={height}
        viewBox="0 0 223 962"
      >
        <Path
          d={PCT_PATH_D}
          stroke="#BFBFBF"
          strokeWidth={30}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <AnimatedPath
          d={PCT_PATH_D}
          stroke="#FC5200"
          strokeWidth={20}
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeDasharray={PATH_LENGTH}
          animatedProps={animatedProps}
        />
      </Svg>
      <View>
        <Image
          source={require("@/assets/images/pctNoBackground.png")}
          style={{ width: 50, height: 50, marginLeft: 38 }}
        />
        <Text style={styles.totalMilesLabel}>Total</Text>
        <Text style={styles.totalMiles}>{totalMiles} km</Text>
        <Text style={styles.milesDoneLabel}>Distance Hiked</Text>
        <Text style={styles.milesDone}>{milesDone} km</Text>

        <Text style={styles.percentage}>22%</Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
  },
  milesDoneLabel: {
    color: "white",
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
  milesDone: {
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },

  totalMilesLabel: {
    color: "white",
    marginTop: 10,
    fontSize: 15,
    textAlign: "center",
  },
  totalMiles: {
    fontSize: 30,
    color: "white",
    fontFamily: "roboto",
    fontWeight: "bold",
    textAlign: "center",
  },
  percentage: {
    marginTop: 18,
    fontSize: 30,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
