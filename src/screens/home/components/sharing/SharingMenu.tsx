import { Theme } from "@/src/contexts/theme/models/theme";
import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import BottomSheet, { BottomSheetView } from "@gorhom/bottom-sheet";
import React, { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { DownloadNoBackground } from "./DownloadNoBackground";
import { DownloadWithBackground } from "./DownloadWithBackground";
import { OpenNativeSharing } from "./OpenNativeSharing";
import { ShareInstagramWithBackground } from "./ShareInstagramWithBackground";

type SharingMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export const SharingMenu: React.FC<SharingMenuProps> = ({ isOpen, onClose }) => {
  const { t } = useTranslation();
  const { viewShot } = useViewShot();
  const { theme, getIcon } = useTheme();
  const insets = useSafeAreaInsets();

  const snapPoints = useMemo(() => [300], [insets.bottom]);

  if (!isOpen) return null;

  return (
    <BottomSheet
      backgroundStyle={{ backgroundColor: theme.secondaryBackground }}
      index={1}
      snapPoints={snapPoints}
      handleIndicatorStyle={{ backgroundColor: theme.text }}
      enablePanDownToClose={true}
      onClose={onClose}
    >
      <BottomSheetView style={{ ...styles(theme).contentContainer, paddingBottom: insets.bottom + 16 }}>
        <View style={styles(theme).header}>
          <Text style={styles(theme).title}>{t("index:share.title")}</Text>
          <Pressable style={styles(theme).closeButton} onPress={onClose} hitSlop={30}>
            <Image style={styles(theme).closeButtonImage} source={getIcon("close")} />
          </Pressable>
        </View>
        <View style={styles(theme).buttonsContainer}>
          <ShareInstagramWithBackground />
          <DownloadWithBackground onClose={onClose} />
          <DownloadNoBackground onClose={onClose} />
          <OpenNativeSharing closeMenu={onClose} />
        </View>
      </BottomSheetView>
    </BottomSheet>
  );
};

const styles = (theme: Theme) =>
  StyleSheet.create({
    contentContainer: {
      paddingHorizontal: 24,
      paddingTop: 16,
      alignItems: "center",
    },
    buttonsContainer: {
      width: "100%",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-start",
      alignContent: "flex-start",
      marginTop: 16,
    },
    header: {
      width: "100%",
      display: "flex",
      flexDirection: "row",
      justifyContent: "center",
      alignItems: "center",
      position: "relative",
    },
    title: {
      color: theme.text,
      fontSize: 16,
      fontWeight: "500",
    },
    closeButtonImage: {
      width: 14,
      height: 14,
    },
    closeButton: {
      position: "absolute",
      right: 0,
      top: 4,
    },
  });
