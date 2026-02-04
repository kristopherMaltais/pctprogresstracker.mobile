import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import { getMeasurementUnit } from "@/helpers/getMeasurementUnit";
import { getIsReverse, getPath } from "@/helpers/getPath";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import Animated, { useAnimatedProps, useSharedValue } from "react-native-reanimated";
import Svg, { Path } from "react-native-svg";
import ViewShot from "react-native-view-shot";
import { reverse } from "svg-path-reverse";

export const StickerMapHorizontal: React.FC = () => {
  const {
    selectedHike,
    displayedDistanceHiked,
    pathDistanceHiked,
    selectedHikeTotalDistance,
    measurementUnit,
    isReverse,
    showLogo,
  } = useUserChoices();

  const { setViewShot } = useViewShot();

  const viewShotRef = React.useCallback(
    (node: ViewShot | null) => {
      if (node !== null) {
        console.log("ViewShot est prêt et enregistré dans le contexte !");
        setViewShot(node);
      }
    },
    [setViewShot]
  );

  const { t } = useTranslation();
  const [isWayBack, setIsWayBack] = useState<boolean>(false);

  const { getIcon, theme } = useTheme();
  const isIos = Platform.OS == "ios";

  const AnimatedPath = Animated.createAnimatedComponent(Path);

  const progress = useSharedValue(0);

  const animatedProps = useAnimatedProps(() => {
    let length = isIos ? selectedHike?.stickerMetadata.iosPathLength : selectedHike?.stickerMetadata.androidPathLength;

    return {
      strokeDashoffset: length! - progress.value,
    } as any;
  });

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

  const [shotWidth, setShotWidth] = React.useState(0);
  const [shotHeight, setShotHeight] = React.useState(0);

  return (
    <View style={styles.container}>
      <ViewShot
        style={{ display: "flex", flexDirection: "row", backgroundColor: "transparent" }}
        options={{
          format: "png",
          quality: 1,
          result: "tmpfile",
          width: shotWidth * 3,
          height: shotHeight * 3,
        }}
        ref={viewShotRef}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setShotWidth(width);
          setShotHeight(height);
        }}
      >
        <View style={styles.statsContainer}>
          {showLogo && <Image source={getIcon("iconWithTextBackground")} style={{ width: 60, height: 60 }} />}
          <Text style={styles.name}>{selectedHike?.name}</Text>
          <Text style={styles.label}>{t("index:sticker.total")}</Text>
          <Text style={styles.value}>
            {selectedHikeTotalDistance} {getMeasurementUnit(measurementUnit)}
          </Text>
          <Text style={styles.label}>{t("index:sticker.distanceHiked")}</Text>
          <Text style={styles.value}>
            {displayedDistanceHiked} {getMeasurementUnit(measurementUnit)}
          </Text>
        </View>
        <Svg width={150} height={205} viewBox="0 0 150 200" fill="none">
          {true && (
            <>
              {/* 1. Couche large et très pâle (Simule la fin du flou) */}
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
          )}
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
            d={getIsReverse(isReverse, isWayBack) ? reverse(selectedHike?.path!) : selectedHike?.path!}
            stroke={theme.pathColored}
            strokeWidth={3}
            fill="none"
            strokeDasharray={
              isIos ? selectedHike?.stickerMetadata.iosPathLength : selectedHike?.stickerMetadata.androidPathLength
            }
            animatedProps={animatedProps}
            strokeLinecap="round"
          />
        </Svg>
      </ViewShot>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },
  statsContainer: {
    display: "flex",
    alignItems: "center",
    width: 120,
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 12,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  value: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  name: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
    flexShrink: 3,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
