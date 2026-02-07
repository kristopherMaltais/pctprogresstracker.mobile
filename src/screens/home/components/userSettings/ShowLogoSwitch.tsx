import { usePremium } from "@/src/contexts/premium/PremiumContextProvider";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type ShowLogoSwitchProps = {
  isMenuOpen: boolean;
};

export const ShowLogoSwitch: React.FC<ShowLogoSwitchProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  const { showLogo, setShowLogo } = useUserChoices();
  const { isPremiumUnlocked, setIsPremiumModalVisible } = usePremium();

  const onPress = () => {
    if (!isPremiumUnlocked) {
      setIsPremiumModalVisible(true);
    } else {
      setShowLogo(!showLogo);
    }
  };

  return (
    <Setting
      isDisabled={!isPremiumUnlocked}
      icon={showLogo ? "showLogo" : "hideLogo"}
      label={t("index:userSettings.logo")}
      showLabel={true}
      onPress={onPress}
    />
  );
};
