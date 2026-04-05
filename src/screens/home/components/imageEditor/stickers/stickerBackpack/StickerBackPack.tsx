import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { Image, Platform, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";
import { StickerBackpackVariant } from "../configs/StickerBackpack.config";

export const StickerBackpack: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const showLogo = useUserSettingsStore((s) => s.showLogo);

  const { getCurrentVariant } = useSticker();
  const variant = getCurrentVariant<StickerBackpackVariant>("stickerBackpack");

  const { getIcon } = useTheme();
  const { setViewShotTransparentBackgroud } = useViewShot();

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

  const cardMode = variant?.cardMode;
  const colorScheme = variant?.colorScheme ?? "white";
  const textColor = colorScheme === "white" ? "white" : "#1a1a1a";
  const backPackColor = colorScheme === "white" ? "backpackDark" : "backpackLight";
  const cardStyle = cardMode === "dark" ? styles.cardDark : cardMode === "white" ? styles.cardWhite : undefined;

  return (
    <GestureWrapper>
      <ViewShot options={{ format: "png", quality: 1 }} ref={viewShotCallbackRef}>
        <View style={[styles.container, cardStyle]}>
          <View style={styles.header}>
            {showLogo && <Image source={getIcon("logo")} style={styles.logo} />}
            <Text style={[styles.name, { color: textColor }]}>My Backpack Weigth</Text>
          </View>
          <View style={[styles.infoContainer]}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Image source={getIcon(backPackColor)} style={{ width: 34, height: 34 }} />
            </View>
            <View style={styles.info}>
              <View>
                <Text style={styles.label}>Hike name:</Text>
                <Text style={styles.value}>Pacific Crest Trail</Text>
              </View>
              <View>
                <Text style={styles.label}>Weight: </Text>
                <Text style={styles.value}>12.1 lbs</Text>
              </View>
            </View>
          </View>
        </View>
      </ViewShot>
    </GestureWrapper>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    alignItems: "center",
    gap: 8,
  },
  cardDark: {
    backgroundColor: "rgba(0, 0, 0, 0.4)",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: Platform.OS === "android" ? 0 : 8,
  },
  cardWhite: {
    backgroundColor: "white",
    borderRadius: 12,
    padding: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  logo: {
    width: 26,
    height: 18,
  },
  header: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 4,
    alignItems: "center",
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center",
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
  infoContainer: {
    display: "flex",
    flexDirection: "row",
    gap: 20,
  },
  info: {},

  label: {
    color: "white",
    marginTop: 10,
    fontWeight: "700",
    fontSize: 8,

    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
  value: {
    color: "white",
    fontWeight: "bold",
    fontSize: 12,
    textShadowColor: "rgba(0, 0, 0, 0.50)",
    textShadowOffset: { width: 0, height: 0.5 },
    textShadowRadius: 1,
  },
});
