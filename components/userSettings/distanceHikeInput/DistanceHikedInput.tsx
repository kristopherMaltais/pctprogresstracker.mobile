import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "../Setting";
import { ModalDistanceHikedInput } from "./ModalDistanceHikedInput";

type DistanceHikedInputProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (flag: boolean) => void;
};

export const DistanceHikedInput: React.FC<DistanceHikedInputProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { t } = useTranslation();
  const [isModalVisible, setIsModalVisible] = useState(false);

  const onPress = () => {
    setIsMenuOpen(false);
    setIsModalVisible((prev) => !prev);
  };

  return (
    <>
      <Setting
        icon="shoePrints"
        label={t("index:userSettings.distances")}
        showLabel={isMenuOpen}
        onPress={onPress}
      />
      <ModalDistanceHikedInput
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </>
  );
};
