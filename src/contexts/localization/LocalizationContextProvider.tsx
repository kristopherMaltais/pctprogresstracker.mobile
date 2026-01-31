import { useService } from "@/src/hooks/useService";
import { SecureStoreKey, SecureStoreService } from "@/src/services/secureStoreService/secureStoreService";
import React, { createContext, useContext, useEffect } from "react";
import { useTranslation } from "react-i18next";

interface LocalizationProps {
  changeLanguage: (language: string) => void;
}

interface LocalizationProviderProps {
  children: React.ReactNode;
}

export const LocalizationContext = createContext<LocalizationProps | undefined>(undefined);

export const useLocalization = (): LocalizationProps => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error("useLocalization must be used within a LocalizationProvider");
  }
  return context;
};

export const LocalizationContextProvider = ({ children }: LocalizationProviderProps) => {
  const { i18n } = useTranslation();

  const secureStoreService: SecureStoreService = useService("Common.SecureStoreService");

  useEffect(() => {
    const getLocalization = async () => {
      const userLanguage = await secureStoreService.getValue(SecureStoreKey.USER_LANGUAGE);

      if (userLanguage) {
        i18n.changeLanguage(userLanguage == "fr" ? "fr" : "en");
      }
    };

    getLocalization();
  }, []);

  const changeLanguage = (language: string) => {
    i18n.changeLanguage(language);
    secureStoreService.setValue(SecureStoreKey.USER_LANGUAGE, language);
  };
  const contextValue: LocalizationProps = {
    changeLanguage: changeLanguage,
  };

  return <LocalizationContext.Provider value={contextValue}>{children}</LocalizationContext.Provider>;
};
