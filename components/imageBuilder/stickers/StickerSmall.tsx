import { EditWrapper } from "@/components/EditWrapper";
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

export const StickerSmall: React.FC = () => {
  const {
    selectedHike,
    distanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showBorders,
  } = useUserChoices();

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const calculatePercentage = () =>
    (distanceHiked * 100) / selectedHike?.totalDistanceKilometer!;

  const progress = useSharedValue(0);
  const [flag, setFlag] = useState<boolean>(false);

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: selectedHike?.pathLength! - progress.value,
  }));

  const getMeasurementUnit = () => {
    return measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi";
  };

  useEffect(() => {
    const timer = setTimeout(() => {
      setFlag(true);
    }, 3000);
    return () => clearTimeout(timer); // cleanup
  }, []);

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
    <EditWrapper borderSize={1.5}>
      <View style={styles.container}>
        <Svg width={120} height={300} viewBox="30 20 190 450" fill="none">
          {showBorders && (
            <Path
              d="M124.723 452.5C122.82 430.803 106.878 405.313 98.7198 408.119C95.374 408.849 95.0601 407.16 95.1508 403.272C95.04 397.259 94.7597 395.962 92.3465 394.09C83.0349 394.708 78.6215 393.698 74.7564 385.163V375.215L58.9507 343.587V334.915L63.7944 329.558V324.712C60.7542 324.151 58.8935 324.193 55.3817 324.712C54.0625 324.316 53.4382 323.454 52.8324 319.101L53.3422 302.011L40.5957 272.169C43.9825 268.926 40.1242 259.454 40.5957 256.1C42.4646 253.528 42.345 250.12 41.8704 243.601C40.1989 237.553 40.858 234.068 43.145 227.787L48.7535 218.35V213.249L51.3028 208.657V196.924M194.828 134.688L206.555 62.2497L121.154 41.0793C114.981 37.8679 116.547 48.1752 119.879 67.8612C114.869 69.9054 112.174 71.1341 117.33 80.6144C110.877 90.3646 107.442 90.5794 101.524 84.9506C100.948 73.5657 102.736 69.4226 110.701 67.096C114.931 66.02 114.636 64.5878 110.701 60.9744C97.3036 55.5337 91.5416 52.3375 86.7381 46.1806C82.1629 48.9047 80.7434 50.6 81.3845 54.0876C87.3381 67.557 86.4998 82.3245 82.5418 99.7444M194.828 134.688C180.33 129.725 171.998 126.487 159.393 125.761H135.685L118.604 120.15C98.1329 125.337 94.7743 122.241 98.9747 109.182C99.8758 106.675 98.1555 105.906 93.1113 105.101C87.7416 100.542 85.5301 99.5736 82.5418 99.7444M194.828 134.688C200.49 138.922 202.446 141.371 198.907 146.166L184.631 168.357C182.373 171.138 181.938 172.835 186.671 176.774C186.438 195.16 184.219 205.74 175.454 225.237L51.3028 196.924M82.5418 99.7444C78.858 115.958 72.4717 134.468 66.3437 156.369C56.5615 165.815 52.2172 170.913 51.3028 178.815V196.924 M125.644 214.5L107.555 287.061L184.497 399.48C190.604 410.499 192.517 414.988 191.121 417.62C191.149 424.039 190.663 426.818 187.555 428.096C180.276 435.646 177.996 441.504 181.185 458.5 M124.555 452.5L180.555 458.5"
              stroke="white"
              strokeWidth={1}
            />
          )}
          <Path
            d="M158.358 456.005C158.639 453.309 155.803 452.428 153.503 451.15C151.203 449.872 149.129 450.411 149.121 440.892C149.113 431.374 149.482 429.195 148.481 425.663C147.48 422.132 147.223 421.434 145.129 419.321C143.036 417.207 142.143 417.097 137.179 415.52C132.216 413.943 117.724 407.499 118.136 399.884C118.074 395.104 119.158 394.911 123.149 392.688C127.139 390.464 130.462 385.067 129.407 374.915C127.467 351.106 122.207 341.112 118.914 331.773C110.134 307.06 103.089 285.75 95.6509 272.144C88.2125 258.538 99.599 242.316 88.508 233.654C81.4083 229.794 79.7147 237.431 70.0985 226.054C65.1221 220.484 66.7757 205.591 67.1512 203.001C81.9931 205.637 87.5582 204.267 93.0779 197.268C114.12 166.359 117.582 151.093 120.412 124.693C120.883 120.137 125.907 116.727 129.602 110.937C133.297 105.147 129.671 101.584 133.772 96.1268C146.563 84.5834 145.283 84.1488 145.889 81.3101C148.002 70.886 146.987 68.7893 143.577 67.7747C140.401 66.3078 151.203 56.3434 152.992 49.1883"
            stroke="#D5D5D5"
            strokeWidth={6}
          />
          {flag && (
            <AnimatedPath
              d="M158.358 456.005C158.639 453.309 155.803 452.428 153.503 451.15C151.203 449.872 149.129 450.411 149.121 440.892C149.113 431.374 149.482 429.195 148.481 425.663C147.48 422.132 147.223 421.434 145.129 419.321C143.036 417.207 142.143 417.097 137.179 415.52C132.216 413.943 117.724 407.499 118.136 399.884C118.074 395.104 119.158 394.911 123.149 392.688C127.139 390.464 130.462 385.067 129.407 374.915C127.467 351.106 122.207 341.112 118.914 331.773C110.134 307.06 103.089 285.75 95.6509 272.144C88.2125 258.538 99.599 242.316 88.508 233.654C81.4083 229.794 79.7147 237.431 70.0985 226.054C65.1221 220.484 66.7757 205.591 67.1512 203.001C81.9931 205.637 87.5582 204.267 93.0779 197.268C114.12 166.359 117.582 151.093 120.412 124.693C120.883 120.137 125.907 116.727 129.602 110.937C133.297 105.147 129.671 101.584 133.772 96.1268C146.563 84.5834 145.283 84.1488 145.889 81.3101C148.002 70.886 146.987 68.7893 143.577 67.7747C140.401 66.3078 151.203 56.3434 152.992 49.1883"
              stroke="#FC5200"
              strokeWidth={4}
              fill="none"
              strokeDasharray={selectedHike?.pathLength}
              strokeDashoffset={selectedHike?.pathLength}
              animatedProps={animatedProps}
            />
          )}
        </Svg>
        <View style={styles.statsContainer}>
          <Image
            source={require("@/assets/images/pctNoBackground.png")}
            style={{ width: 60, height: 60, marginTop: 55 }}
          />
          <Text style={styles.label}>Total</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit()}
          </Text>
          <Text style={styles.label}>Distance Hiked</Text>
          <Text style={styles.value}>
            {distanceHiked} {getMeasurementUnit()}
          </Text>
          <Text style={styles.percentage}>
            {Math.round(calculatePercentage())}%
          </Text>
        </View>
      </View>
    </EditWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row" },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: 100,
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
    fontSize: 20,
    color: "white",
    fontWeight: "bold",
  },
});
