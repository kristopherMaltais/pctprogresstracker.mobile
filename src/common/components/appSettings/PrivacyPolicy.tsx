import * as Linking from "expo-linking";
import React from "react";
import { useTranslation } from "react-i18next";
import { Setting } from "./Setting";

export const PrivacyPolicy: React.FC = () => {
  const { t, i18n } = useTranslation();

  const navigateToPrivacyPolicy = () => {
    Linking.openURL(
      `https://kristophermaltais.github.io/share-my-hike-legal/privacy-${i18n.language == "fr" ? "fr" : "en"}.html`
    );
  };

  return (
    <>
      <Setting name={t("common:settings.privacyPolicy.title")} onSettingPress={navigateToPrivacyPolicy} />
    </>
  );
};
