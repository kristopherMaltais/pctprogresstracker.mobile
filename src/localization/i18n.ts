import i18n, { InitOptions } from "i18next";
import { initReactI18next } from "react-i18next";
import indexEN from "../screens/__i18n__/en.json";
import indexFR from "../screens/__i18n__/fr.json";

const resources = {
  en: { index: indexEN },
  fr: { index: indexFR },
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
