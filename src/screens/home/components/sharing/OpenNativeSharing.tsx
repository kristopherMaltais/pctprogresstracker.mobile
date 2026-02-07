import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { openNativeShare } from "@/src/helpers/openNativeSharing";
import React from "react";
import { SharingButton } from "./SharingButton";

type OpenNativeSharingProps = {
  closeMenu: () => void;
};
export const OpenNativeSharing: React.FC<OpenNativeSharingProps> = ({ closeMenu }) => {
  const { viewShot } = useViewShot();

  const share = async () => {
    openNativeShare(viewShot);

    setTimeout(() => {
      closeMenu();
    }, 1000);
  };

  return <SharingButton onPress={share} image="other" title="Other" />;
};
