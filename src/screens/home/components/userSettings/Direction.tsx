import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type DirectionProps = {
  isMenuOpen: boolean;
};

export const Direction: React.FC<DirectionProps> = ({ isMenuOpen }) => {
  const { t } = useTranslation();
  const isReverse = useUserSettingsStore((s) => s.isReverse);
  const setIsReverse = useUserSettingsStore((s) => s.setIsReverse);
  return (
    <Setting
      icon={isReverse ? "directionDown" : "directionUp"}
      label={t("home:userSettings.direction")}
      showLabel={isMenuOpen}
      onPress={() => setIsReverse(!isReverse)}
    />
  );
};
