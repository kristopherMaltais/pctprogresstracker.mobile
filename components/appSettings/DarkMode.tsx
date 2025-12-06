import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

export const DarkMode: React.FC = () => {
  const { t } = useTranslation();
  const [isDarkMode, setIsDakMode] = useState<Boolean>(false);

  return (
    <>
      <Setting
        name={t("index:settings.darkMode.title")}
        icon={"darkMode"}
        isToggle
        isEnable={isDarkMode}
        onSettingPress={() => setIsDakMode(!isDarkMode)}
      />
    </>
  );
};
