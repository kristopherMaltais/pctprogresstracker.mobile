import { GestureWrapper } from "@/components/common/GestureWrapper";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import { reverse } from "svg-path-reverse";

export const StickerMapHorizontal: React.FC = () => {
  const {
    selectedHike,
    distanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showBorders,
  } = useUserChoices();

  const { t } = useTranslation();
  const [isReverse, setIsReverse] = useState<boolean>(true);

  const { getIcon } = useTheme();

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    const length = selectedHike?.stickerMetadata.pathLength ?? 0;
    return {
      strokeDashoffset: length - progress.value,
    } as any;
  });

  // Have to look if roundtrip trek
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
    <GestureWrapper>
      <View style={styles.container}>
        <View style={styles.statsContainer}>
          <Image source={getIcon("icon")} style={{ width: 100, height: 100 }} />
          <Text style={styles.name}>{selectedHike?.name}</Text>
          <Text style={styles.label}>{t("index:sticker.total")}</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit(measurementUnit)}
          </Text>
          <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {distanceHiked} {getMeasurementUnit(measurementUnit)}
          </Text>
        </View>
        <Svg
          width={selectedHike?.stickerMetadata.width}
          height={selectedHike?.stickerMetadata.height}
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
          <Path
            d={selectedHike?.path}
            stroke="#D5D5D5"
            strokeWidth={16}
            strokeLinecap="round"
          />
          <AnimatedPath
            d={isReverse ? reverse(selectedHike?.path!) : selectedHike?.path}
            stroke="#FC5200"
            strokeWidth={10}
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength}
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </GestureWrapper>
  );
};

const styles = StyleSheet.create({
  container: { flexDirection: "row", alignItems: "center" },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: 145,
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 18,
  },
  value: {
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
  },

  name: {
    marginTop: 12,
    fontSize: 24,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 1,
  },
});
