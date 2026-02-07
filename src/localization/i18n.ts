import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import commonEN from "../common/__i18n__/en.json";
import commonFR from "../common/__i18n__/fr.json";
import homeEN from "../screens/home/__i18n__/en.json";
import homeFR from "../screens/home/__i18n__/fr.json";

const resources = {
  en: { home: homeEN, common: commonEN },
  fr: { home: homeFR, common: commonFR },
};

const options: InitOptions = {
  resources,
  fallbackLng: "en",
  lng: "en",
  compatibilityJSON: "v4",
  interpolation: { escapeValue: false },
};

i18n.use(initReactI18next).init(options);

export default i18n;
