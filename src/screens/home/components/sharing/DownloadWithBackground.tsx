import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShare } from "@/src/helpers/openNativeSharing";
import { requestAppReview } from "@/src/helpers/requestAppReview";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { captureRef } from "react-native-view-shot";
import { SharingButton } from "./SharingButton";

type DownloadWithBackgroundProps = {
  onClose: () => void;
};

export const DownloadWithBackground: React.FC<DownloadWithBackgroundProps> = ({ onClose }) => {
  const { t } = useTranslation();
  const { viewShot } = useViewShot();
  const [iconDisplay, setIconDisplay] = useState<string>("downloadImageUnlocked");

  const saveToGallery = async () => {
    if (!viewShot) {
      return;
    }

    try {
      const { status } = await MediaLibrary.requestPermissionsAsync();

      if (status !== "granted") {
        return;
      }

      const uri = await captureRef(viewShot, {
        format: "jpg",
        quality: 1.0,
      });

      await MediaLibrary.saveToLibraryAsync(uri);
      downloadSuccess();
    } catch (err) {
      openNativeShare(viewShot);
    }
  };

  const downloadSuccess = () => {
    setIconDisplay("success");
    requestAppReview();
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <SharingButton
      onPress={saveToGallery}
      image={iconDisplay}
      title={t("index:share.gallery.title")}
      description={t("index:share.gallery.description")}
    />
  );
};
