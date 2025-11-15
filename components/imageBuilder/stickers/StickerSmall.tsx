import { GestureWrapper } from "@/components/common/GestureWrapper";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
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

  const { t } = useTranslation();

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const calculatePercentage = () => {
    let newPercentage = 0;
    if (measurementUnit == MeasurementUnit.KILOMETER) {
      newPercentage = Math.round(
        (distanceHiked * 100) / selectedHike?.totalDistanceKilometer!
      );
    } else {
      newPercentage = Math.round(
        (distanceHiked * 100) / selectedHike?.totalDistanceMile!
      );
    }

    return newPercentage;
  };

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const length = selectedHike?.pathLength ?? 0;
    return {
      strokeDashoffset: length - progress.value,
    } as any;
  });

  useEffect(() => {
    if (!selectedHike?.pathLength) return;

    const ratio = Math.max(
      0,
      Math.min(1, distanceHiked / selectedHikeTotalDistance)
    );

    progress.value = 0;
    progress.value = withTiming(ratio * selectedHike.pathLength, {
      duration: 2000,
    });
  }, [distanceHiked, selectedHikeTotalDistance, selectedHike?.pathLength]);

  return (
    <GestureWrapper borderSize={1.5}>
      <View style={styles.container}>
        <Svg width={120} height={300} viewBox="30 20 190 450" fill="none">
          {showBorders && (
            <Path d={selectedHike?.border} stroke="white" strokeWidth={2} />
          )}
          <Path d={selectedHike?.path} stroke="#D5D5D5" strokeWidth={8} />
          <AnimatedPath
            d={selectedHike?.path}
            stroke="#FC5200"
            strokeWidth={4}
            fill="none"
            strokeDasharray={selectedHike?.pathLength}
            animatedProps={animatedProps}
          />
        </Svg>
        <View style={styles.statsContainer}>
          <Image
            source={require("@/assets/images/pctNoBackground.png")}
            style={{ width: 60, height: 60, marginTop: 55 }}
          />
          <Text style={styles.label}>{t("index:sticker.total")}</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit(measurementUnit)}
          </Text>
          <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {distanceHiked} {getMeasurementUnit(measurementUnit)}
          </Text>
          <Text style={styles.percentage}>{calculatePercentage()}%</Text>
        </View>
      </View>
    </GestureWrapper>
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
