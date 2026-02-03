import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { getIsReverse, getPath } from "@/src/helpers/getPath";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React, { useEffect, useState } from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
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

  console.log("sml");

  const { getIcon, theme } = useTheme();
  const [isWayBack, setIsWayBack] = useState<boolean>(false);
  const AnimatedPath = Animated.createAnimatedComponent(Path);
  const progress = useSharedValue(0);
  const isIos = Platform.OS == "ios";

  const animatedProps = useAnimatedProps(() => ({
    strokeDashoffset: isIos
      ? selectedHike?.stickerMetadata.iosPathLength! - progress.value
      : selectedHike?.stickerMetadata.androidPathLength! - progress.value,
  }));

  useEffect(() => {
    const newPath = getPath(pathDistanceHiked, selectedHikeTotalDistance, displayedDistanceHiked, selectedHike!, isIos);

    progress.value = 0;
    setIsWayBack(newPath?.isWayBack!);
    if (newPath) progress.value = newPath.value;
  }, [
    pathDistanceHiked,
    selectedHikeTotalDistance,
    selectedHike?.stickerMetadata.iosPathLength,
    selectedHike?.stickerMetadata.androidPathLength,
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
          height={205}
          viewBox={selectedHike?.stickerMetadata.stickerLargeViewBox}
          fill="none"
          style={{ transform: [{ scale: 1.7 }] }}
        >
          <>
            <Path d={selectedHike?.border} stroke="rgba(0,0,0,0.03)" strokeWidth={5} transform="translate(0, 1.5)" />

            {/* 2. Couche moyenne (Donne de la profondeur) */}
            <Path d={selectedHike?.border} stroke="rgba(0,0,0,0.08)" strokeWidth={3} transform="translate(0, 1)" />

            {/* 3. Ton tracé principal */}
            <Path d={selectedHike?.border} stroke={theme.borders} strokeWidth={1} />
            {selectedHike?.regions.map((region: string, index: number) => {
              return (
                <React.Fragment key={index}>
                  {/* 1. Ombre lointaine (très diffuse) */}
                  <Path
                    d={region}
                    stroke="rgba(0,0,0,0.03)"
                    strokeWidth={5}
                    transform="translate(0, 1.5)"
                    fill="transparent"
                  />

                  {/* 2. Ombre rapprochée (plus définie) */}
                  <Path
                    d={region}
                    stroke="rgba(0,0,0,0.07)"
                    strokeWidth={2.5}
                    transform="translate(0, 1)"
                    fill="transparent"
                  />

                  {/* 3. Tracé principal avec ton fond et ta bordure */}
                  <Path d={region} stroke={theme.borders} strokeWidth={1} fill={theme.background} />
                </React.Fragment>
              );
            })}
          </>
          <Path
            d={selectedHike?.path}
            stroke="rgba(0,0,0,0.04)"
            strokeWidth={7}
            strokeLinecap="round"
            transform="translate(0, 1.5)"
          />

          {/* 2. Ombre de définition (un peu plus sombre et moins large) */}
          <Path
            d={selectedHike?.path}
            stroke="rgba(0,0,0,0.08)"
            strokeWidth={5}
            strokeLinecap="round"
            transform="translate(0, 1)"
          />

          {/* 3. Le tracé principal de la randonnée */}
          <Path d={selectedHike?.path} stroke={theme.path} strokeWidth={3} strokeLinecap="round" />
          <AnimatedPath
            strokeLinecap="round"
            d={getIsReverse(isReverse, isWayBack) ? reverse(selectedHike?.path!) : selectedHike?.path!}
            stroke={theme.pathColored}
            strokeWidth={3}
            fill="none"
            strokeDasharray={
              isIos ? selectedHike?.stickerMetadata.iosPathLength! : selectedHike?.stickerMetadata.androidPathLength!
            }
            animatedProps={animatedProps}
          />
        </Svg>
      </View>
      {showLogo && <Image style={styles.logo} source={getIcon("iconWithTextBackground")} />}
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

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  distanceHiked: {
    color: "white",
    fontSize: 14,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  trailInformation: {
    position: "absolute",
    top: 20,
    left: 20,
  },
});
