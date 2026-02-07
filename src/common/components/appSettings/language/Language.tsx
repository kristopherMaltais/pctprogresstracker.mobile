import { useLocalization } from "@/src/contexts/localization/LocalizationContextProvider";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";
import { ModalLanguagePicker } from "./ModalLanguagePicker";

export const Language: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { t } = useTranslation();
  const { changeLanguage } = useLocalization();

  const onLanguageChange = (language: string) => {
    setIsModalVisible(false);
    changeLanguage(language);
  };

  return (
    <>
      <Setting
        name={t("common:settings.language.title")}
        icon={"language"}
        onSettingPress={() => setIsModalVisible(true)}
      />
      <ModalLanguagePicker
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
        title={t("common:settings.language.title")}
        onLanguageChange={(language) => onLanguageChange(language)}
      />
    </>
  );
};
