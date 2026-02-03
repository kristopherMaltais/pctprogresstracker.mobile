import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useValidation } from "@/src/contexts/validation/ValidationContextProvider";
import { useViewShot } from "@/src/contexts/viewShot/ViewShotContextProvider";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type ShareProps = {
  isMenuOpen: boolean;
};

export const Share: React.FC<ShareProps> = ({ isMenuOpen }) => {
  const { viewShot } = useViewShot();
  const { t } = useTranslation();
  const { showErrorModal } = useValidation();
  const { setShowShareMenu, showShareMenu } = useUserChoices();

  // const share = async () => {
  //   if (!viewShot) {
  //     showErrorModal(t("index:errors.share"));
  //     return;
  //   }

  //   try {
  //     const isAvailable = await Sharing.isAvailableAsync();
  //     if (!isAvailable) {
  //       showErrorModal(t("index:errors.share"));
  //       return;
  //     }

  //     await Sharing.shareAsync(await viewShot.capture!(), {
  //       dialogTitle: "Share your hiking progress",
  //     });
  //   } catch (err) {
  //     console.error("Share failed:", err);
  //     showErrorModal(t("index:errors.share"));
  //   }
  // };

  const share = () => {
    setShowShareMenu(!showShareMenu);
  };
  return (
    <>
      <Setting icon="share" label={t("index:userSettings.share")} showLabel={isMenuOpen} onPress={share} />
    </>
  );
};
