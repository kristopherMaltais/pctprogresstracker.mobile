import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { makeImageFromView } from "@shopify/react-native-skia";
import { File, Paths } from "expo-file-system";
import React from "react";
import { useTranslation } from "react-i18next";
import Share from "react-native-share";
import { SharingButton } from "./SharingButton";

export const ShareInstagramWithBackground: React.FC = () => {
  const { t } = useTranslation();
  const { skiaViewRef } = useViewShot();

  const shareOnInstagram = async () => {
    if (!skiaViewRef?.current) return;

    try {
      const image = await makeImageFromView(skiaViewRef);
      const base64 = image?.encodeToBase64();

      if (!base64) return;

      const file = new File(Paths.cache, `instagram-${Date.now()}.png`);
      file.write(base64, { encoding: "base64" });

      const shareOptions: any = {
        backgroundImage: file.uri,
        social: Share.Social.INSTAGRAM_STORIES,
        appId: "1385671166123591",
      };

      await Share.shareSingle(shareOptions);
    } catch (err) {
      console.error("Erreur partage Instagram:", err);
      // Ici tu pourrais ajouter ton fallback vers openNativeShare(file.uri)
    }
  };

  return (
    <SharingButton
      onPress={shareOnInstagram}
      image="instagramColored"
      title={t("home:share.instagram.title")}
      description={t("home:share.instagram.description")}
    />
  );
};
