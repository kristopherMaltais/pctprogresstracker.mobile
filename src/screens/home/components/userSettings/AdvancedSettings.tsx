import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type ShareProps = {
  isMenuOpen: boolean;
};

export const AdvancedSettings: React.FC<ShareProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();

  const navigation = useNavigation<any>();

  const openAdvancedSettings = () => navigation.navigate("advancedSettings");

  return (
    <>
      <Setting
        icon="advancedSettings"
        label={t("home:userSettings.advancedSettings")}
        showLabel={isMenuOpen}
        onPress={openAdvancedSettings}
      />
    </>
  );
};
