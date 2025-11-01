import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";
import { ModalLanguagePicker } from "./ModalLanguagePicker";

export const Language: React.FC = () => {
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  const { t, i18n } = useTranslation();

  const onLanguageChange = (language: string) => {
    setIsModalVisible(false);
    i18n.changeLanguage(language);
  };

  return (
    <>
      <Setting
        name={t("index:settings.language.title")}
        icon={"language"}
        onSettingPress={() => setIsModalVisible(true)}
      />
      <ModalLanguagePicker
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
        title={t("index:settings.language.title")}
        onLanguageChange={(language) => onLanguageChange(language)}
      />
    </>
  );
};
