import { GestureWrapper } from "@/components/common/GestureWrapper";
import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import Animated, {
  useAnimatedProps,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";

export const StickerMapVertical: React.FC = () => {
  const {
    selectedHike,
    distanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    showBorders,
  } = useUserChoices();

  const { t } = useTranslation();

  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const { getIcon, theme } = useTheme();

  const animatedProps = useAnimatedProps(() => {
    const length = selectedHike?.stickerMetadata.pathLength ?? 0;
    return {
      strokeDashoffset: length - progress.value,
    } as any;
  });

  useEffect(() => {
    if (!selectedHike?.stickerMetadata.pathLength) return;

    const ratio = Math.max(
      0,
      Math.min(1, distanceHiked / selectedHikeTotalDistance)
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
        <Svg
          width={selectedHike?.stickerMetadata.width}
          height={selectedHike?.stickerMetadata.height}
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
            strokeWidth={13}
            strokeLinecap="round"
          />
          <AnimatedPath
            d={selectedHike?.path}
            stroke={theme.pathColored}
            strokeWidth={10}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={selectedHike?.stickerMetadata.pathLength}
            animatedProps={animatedProps}
          />
        </Svg>
        <View style={styles.statsContainer}>
          <Image source={getIcon("icon")} style={{ width: 140, height: 140 }} />
          <View>
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
        </View>
      </View>
    </GestureWrapper>
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
    justifyContent: "space-between",
    paddingHorizontal: 20,
    width: "100%",
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
  },
});
