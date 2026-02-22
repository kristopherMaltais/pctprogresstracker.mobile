import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type ShareProps = {
  isMenuOpen: boolean;
};

export const Share: React.FC<ShareProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  const showShareMenu = useUserSettingsStore((s) => s.showShareMenu);
  const setShowShareMenu = useUserSettingsStore((s) => s.setShowShareMenu);

  const share = () => {
    setShowShareMenu(!showShareMenu);
  };
  return (
    <>
      <Setting icon="share" label={t("home:userSettings.share")} showLabel={isMenuOpen} onPress={share} />
    </>
  );
};
