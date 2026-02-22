import { useTheme } from "@/src/contexts/theme/ThemeContextProvider";
import React from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";

export const DarkMode: React.FC = () => {
  const { t } = useTranslation();
  const { isDarkMode, toggleDarkMode } = useTheme();

  return (
    <>
      <Setting
        name={t("common:settings.darkMode.title")}
        icon={"darkMode"}
        isToggle
        isEnable={isDarkMode}
        onSettingPress={() => toggleDarkMode()}
      />
    </>
  );
};
