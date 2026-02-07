import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShare } from "@/src/helpers/openNativeSharing";
import React from "react";
import { useTranslation } from "react-i18next";
import { SharingButton } from "./SharingButton";

type OpenNativeSharingProps = {
  closeMenu: () => void;
};
export const OpenNativeSharing: React.FC<OpenNativeSharingProps> = ({ closeMenu }) => {
  const { viewShot } = useViewShot();
  const { t } = useTranslation();

  const share = async () => {
    openNativeShare(viewShot);

    setTimeout(() => {
      closeMenu();
    }, 1000);
  };

  return (
    <SharingButton
      onPress={share}
      image="other"
      title={t("index:share.other.title")}
      description={t("index:share.other.description")}
    />
  );
};
