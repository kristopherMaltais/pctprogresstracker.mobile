import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";

type PositionProps = {
  isMenuOpen: boolean;
  openPositionInput: () => void;
};

export const Position: React.FC<PositionProps> = ({
  isMenuOpen,
  openPositionInput,
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Setting
        icon="position"
        label={t("index:userSettings.position")}
        showLabel={isMenuOpen}
        onPress={openPositionInput}
      />
    </>
  );
};
