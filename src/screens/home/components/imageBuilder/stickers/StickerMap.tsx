import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { HikeProgressAnimation } from "@/src/common/components/HikeProgressAnimation";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { getMeasurementUnit } from "@/src/helpers/getMeasurementUnit";
import { Direction } from "@/src/models/direction";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";

type StickerMapProps = {};
export const StickerMap: React.FC<StickerMapProps> = () => {
  const { selectedHike, selectedHikeTotalDistance, measurementUnit, displayedDistanceHiked, showLogo } =
    useUserChoices();

  const { getIcon } = useTheme();
  const { t } = useTranslation();
  const { setViewShotTransparentBackgroud } = useViewShot();

  const [isHorizontal, setIsHorizontal] = useState<boolean>(true);

  useEffect(() => {
    setIsHorizontal(selectedHike?.stickerMetadata.direction == Direction.HORIZONTAL);
  }, [selectedHike]);

  const viewShotCallbackRef = React.useCallback(
    (node: ViewShot | null) => {
      if (node !== null) {
        setViewShotTransparentBackgroud(node);
      }
    },
    [setViewShotTransparentBackgroud]
  );

  if (!selectedHike) {
    return null;
  }
  return (
    <GestureWrapper>
      <ViewShot
        options={{
          format: "png",
          quality: 1,
        }}
        ref={viewShotCallbackRef}
      >
        <View style={isHorizontal ? styles.containerHorizontal : styles.containerVertical}>
          {!isHorizontal && <HikeProgressAnimation />}
          <View style={isHorizontal ? styles.statsContainerHorizontal : styles.statsContainerVertical}>
            {showLogo && <Image source={getIcon("iconWithTextBackground")} style={styles.logo} />}
            <View>
              <Text style={styles.name}>{selectedHike?.name}</Text>
              <Text style={styles.label}>{t("home:sticker.total")}</Text>
              <Text style={styles.value}>
                {selectedHikeTotalDistance} {getMeasurementUnit(measurementUnit)}
              </Text>
              <Text style={styles.label}>{t("home:sticker.distanceHiked")}</Text>
              <Text style={styles.value}>
                {displayedDistanceHiked} {getMeasurementUnit(measurementUnit)}
              </Text>
            </View>
          </View>
          {isHorizontal && <HikeProgressAnimation />}
        </View>
      </ViewShot>
    </GestureWrapper>
  );
};

const styles = StyleSheet.create({
  containerHorizontal: {
    alignItems: "center",
    flexDirection: "row",
  },
  containerVertical: {
    alignItems: "center",
    flexDirection: "column",
  },
  statsContainerHorizontal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 0,
    flexDirection: "column",
    width: 150,
  },
  statsContainerVertical: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    gap: 30,
    flexDirection: "row",
    width: 180,
  },
  logo: {
    width: 60,
    height: 60,
  },
  label: {
    color: "white",
    marginTop: 10,
    fontSize: 12,
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
  value: {
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },

  name: {
    marginTop: 12,
    fontSize: 16,
    color: "white",
    fontWeight: "bold",
    textAlign: "center",

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 1,
  },
});
