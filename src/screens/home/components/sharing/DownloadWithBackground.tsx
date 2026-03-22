import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShareUri } from "@/src/helpers/openNativeSharing";
import { requestAppReview } from "@/src/helpers/requestAppReview";
import { makeImageFromView } from "@shopify/react-native-skia";
import { File, Paths } from "expo-file-system";
import * as Haptics from "expo-haptics";
import * as MediaLibrary from "expo-media-library";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { SharingButton } from "./SharingButton";

type DownloadNoBackgroundProps = {
  onClose: () => void;
};

export const DownloadWithBackground: React.FC<DownloadNoBackgroundProps> = ({ onClose }) => {
  const { skiaViewRef } = useViewShot();
  const [iconDisplay, setIconDisplay] = useState<string>("downloadImageUnlocked");
  const { t } = useTranslation();

  const saveToGallery = async () => {
    if (!skiaViewRef?.current) return;

    const fileName = `download-${Date.now()}.png`;
    const file = new File(Paths.cache, fileName);
    const fileUri = file.uri;

    try {
      const image = await makeImageFromView(skiaViewRef);
      const base64 = image?.encodeToBase64();
      if (!base64) return;

      file.write(base64, { encoding: "base64" });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        return openNativeShareUri(fileUri); // Utilise la variable fixe
      }

      await MediaLibrary.saveToLibraryAsync(fileUri);

      downloadSuccess();
    } catch {
      openNativeShareUri(fileUri);
    }
  };

  const downloadSuccess = () => {
    setIconDisplay("success");
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    requestAppReview();

    setTimeout(() => {
      onClose();
    }, 2000);
  };

  return (
    <SharingButton
      onPress={saveToGallery}
      image={iconDisplay}
      title={t("home:share.gallery.title")}
      description={t("home:share.gallery.description")}
    />
  );
};
