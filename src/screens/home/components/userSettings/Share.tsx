import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type ShareProps = {
  isMenuOpen: boolean;
};

export const Share: React.FC<ShareProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  const { setShowShareMenu, showShareMenu } = useUserChoices();

  const share = () => {
    setShowShareMenu(!showShareMenu);
  };
  return (
    <>
      <Setting icon="share" label={t("home:userSettings.share")} showLabel={isMenuOpen} onPress={share} />
    </>
  );
};
