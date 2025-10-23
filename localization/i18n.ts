import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import indexEN from "../app/__i18n__/en.json";
import indexFR from "../app/__i18n__/fr.json";

const resources = {
  en: {
    index: indexEN,
  },
  fr: {
    index: indexFR,
  },
};

i18n.use(initReactI18next).init({
  resources,
  fallbackLng: "en",
  compatibilityJSON: "v3",
  lng: "en",
});

export default i18n;
