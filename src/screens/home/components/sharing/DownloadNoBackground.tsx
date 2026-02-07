import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShare } from "@/src/helpers/openNativeSharing";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { captureRef } from "react-native-view-shot";
import { SharingButton } from "./SharingButton";

type DownloadNoBackgroundProps = {
  onClose: () => void;
};

export const DownloadNoBackground: React.FC<DownloadNoBackgroundProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { viewShotTransparentBackground } = useViewShot();
  const { isPremiumUnlocked, setIsPremiumModalVisible } = usePremium();
  const { selectedHike } = useUserChoices();

  const [iconDisplay, setIconDisplay] = useState<string>("downloadImageUnlocked");

  const saveToGallery = async () => {
    if (!isPremiumUnlocked) {
      setIsPremiumModalVisible(true);
      return;
    }

    if (!viewShotTransparentBackground) {
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const uri = await captureRef(viewShotTransparentBackground, {
        format: "png",
        quality: 1.0,
      });

      await MediaLibrary.createAssetAsync(uri);
      downloadSuccess();
    } catch (err) {
      openNativeShare(viewShotTransparentBackground);
    }
  };

  const downloadSuccess = () => {
    setIconDisplay("success");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <SharingButton
      onPress={saveToGallery}
      isLocked={!isPremiumUnlocked}
      image={!isPremiumUnlocked ? "downloadImageLocked" : iconDisplay}
      title="Video Overlay Export"
      description="Transparent background, perfect for Reels & Youtube"
    />
  );
};
