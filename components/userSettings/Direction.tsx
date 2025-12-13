import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type DirectionProps = {
  isMenuOpen: boolean;
};

export const Direction: React.FC<DirectionProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  return (
    <Setting
      icon="direction"
      label={t("index:userSettings.direction")}
      showLabel={isMenuOpen}
      onPress={() => {}}
    />
  );
};
