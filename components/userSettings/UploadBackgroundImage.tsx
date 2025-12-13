import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

type UploadBackgroundImageProps = {
  isMenuOpen: boolean;
  setIsMenuOpen: (flag: boolean) => void;
};

export const UploadBackgroundImage: React.FC<UploadBackgroundImageProps> = ({
  isMenuOpen,
  setIsMenuOpen,
}) => {
  const { t } = useTranslation();
  const { setBackgroundImage } = useUserChoices();

  const pickImage = async () => {
    setIsMenuOpen(false);
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      exif: true,
      base64: false,
    });

    if (!result.canceled) {
      // @ts-ignore
      setBackgroundImage(result.assets[0].uri);
    }
  };

  return (
    <Setting
      icon={"image"}
      showLabel={isMenuOpen}
      label={t("index:userSettings.backgroundImage")}
      onPress={pickImage}
    />
  );
};
