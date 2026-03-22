import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShareUri } from "@/src/helpers/openNativeSharing";
import { makeImageFromView } from "@shopify/react-native-skia";
import { File, Paths } from "expo-file-system";
import React from "react";
import { useTranslation } from "react-i18next";
import { SharingButton } from "./SharingButton";

type OpenNativeSharingProps = {
  closeMenu: () => void;
};
export const OpenNativeSharing: React.FC<OpenNativeSharingProps> = ({ closeMenu }) => {
  const { skiaViewRef } = useViewShot();
  const { t } = useTranslation();

  const share = async () => {
    if (!skiaViewRef?.current) return;

    try {
      const image = await makeImageFromView(skiaViewRef);
      const base64 = image?.encodeToBase64();
      if (!base64) return;

      const fileName = `share-${Date.now()}.png`;
      const file = new File(Paths.cache, fileName);

      file.write(base64, { encoding: "base64" });

      await new Promise((resolve) => setTimeout(resolve, 100));

      await openNativeShareUri(file.uri);

      setTimeout(() => {
        closeMenu();
      }, 500);
    } catch (err) {
      console.error("Partage échoué:", err);
    }
  };

  return (
    <SharingButton
      onPress={share}
      image="other"
      title={t("home:share.other.title")}
      description={t("home:share.other.description")}
    />
  );
};
