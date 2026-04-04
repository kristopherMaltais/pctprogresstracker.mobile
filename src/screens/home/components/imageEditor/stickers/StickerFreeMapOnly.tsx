import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { HikeProgressAnimation } from "@/src/common/components/hikeProgressAnimation/HikeProgressAnimation";
import { StickerFreeMapOnlyVariant, useSticker } from "@/src/contexts/sticker/StickerContextProvider";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Image, StyleSheet, Text, View } from "react-native";
import ViewShot from "react-native-view-shot";

export const StickerFreeMapOnly: React.FC = () => {
  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const skippedSections = useUserSettingsStore((s) => s.skippedSections);
  const progressMode = useUserSettingsStore((s) => s.progressMode);

  const { getCurrentVariant } = useSticker();
  const variant = getCurrentVariant<StickerFreeMapOnlyVariant>("stickerFreeMapOnly");

  const showLogo = useUserSettingsStore((s) => s.showLogo);

  const { getIcon } = useTheme();
  const { t } = useTranslation();
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
  return (
    <GestureWrapper>
      <ViewShot
        options={{
          format: "png",
          quality: 1,
        }}
        ref={viewShotCallbackRef}
      >
        <View style={styles.container}>
          <View style={styles.header}>
            {showLogo && <Image source={getIcon("logo")} style={styles.logo} />}
            <Text style={{ ...styles.name, color: variant?.color }}>
              {selectedHike.maps[selectedHike.selectedMapIndex].name}
            </Text>
          </View>
          <HikeProgressAnimation
            color={variant?.color!}
            hideDecorations={variant?.hideDecorations}
            key={`${progressMode}-${skippedSections}`}
          />
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
  logo: {
    width: 26,
    height: 18,
  },
  header: {
    display: "flex",
    flexDirection: "row",
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
});
