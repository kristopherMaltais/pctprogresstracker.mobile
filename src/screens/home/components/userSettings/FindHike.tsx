import { useNavigation } from "@react-navigation/native";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type FindHikeProps = {
  isMenuOpen: boolean;
};

export const FindHike: React.FC<FindHikeProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  const navigation = useNavigation<any>();

  const openHikeSearch = () => navigation.navigate("hikeSearch");

  return (
    <Setting icon="search" label={t("home:userSettings.findHike")} showLabel={isMenuOpen} onPress={openHikeSearch} />
  );
};
