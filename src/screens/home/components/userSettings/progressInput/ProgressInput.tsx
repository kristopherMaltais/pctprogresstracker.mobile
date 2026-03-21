import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";
import { ModalProgressInput } from "./ModalProgressInput";

type ProgressInputProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (flag: boolean) => void;
};

export const ProgressInput: React.FC<ProgressInputProps> = ({ isMenuOpen, setIsMenuOpen }) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPress = () => {
    setIsMenuOpen(false);
    setIsModalVisible((prev) => !prev);
  };

  return (
    <>
      <Setting icon="shoePrints" label={t("home:userSettings.distance")} showLabel={isMenuOpen} onPress={onPress} />
      <ModalProgressInput isVisible={isModalVisible} onClose={() => setIsModalVisible(false)} />
    </>
  );
};
