import { useValidation } from "@/contexts/validation/ValidationContextProvider";
import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as Sharing from "expo-sharing";
import { t } from "i18next";
import { Setting } from "./Setting";

type ShareProps = {
  isMenuOpen: boolean;
};

export const Share: React.FC<ShareProps> = ({ isMenuOpen }) => {
  const { viewShot } = useViewShot();
  const { showErrorModal } = useValidation();

  const share = async () => {
    if (!viewShot) {
      showErrorModal(t("index:errors.share"));
      return;
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        showErrorModal(t("index:errors.share"));
        return;
      }

      await Sharing.shareAsync(await viewShot.capture!(), {
        dialogTitle: "Share your hiking progress",
      });
    } catch (err) {
      console.error("Share failed:", err);
      showErrorModal(t("index:errors.share"));
    }
  };
  return (
    <Setting
      icon="share"
      label="share"
      showLabel={isMenuOpen}
      onPress={share}
    />
  );
};
