import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShare } from "@/src/helpers/openNativeSharing";
import React from "react";
import { useTranslation } from "react-i18next";
import Share from "react-native-share";
import { captureRef } from "react-native-view-shot";
import { SharingButton } from "./SharingButton";

export const ShareInstagramWithBackground: React.FC = () => {
  const { t } = useTranslation();
  const { viewShot } = useViewShot();

  const shareOnInstagram = async () => {
    if (!viewShot) return;

    try {
      var uri = await captureRef(viewShot, {
        format: "png",
        quality: 1,
      });

      const shareOptions: any = {
        backgroundImage: uri,
        social: Share.Social.INSTAGRAM_STORIES,
        appId: "1385671166123591",
      };

      await Share.shareSingle(shareOptions);
    } catch (err) {
      openNativeShare(viewShot);
    }
  };

  return (
    <SharingButton
      onPress={shareOnInstagram}
      image="instagramColored"
      title="Inspire your followers"
      description="Post your stats to your Story"
    />
  );
};
