import React, { createContext, useContext, useEffect, useState } from "react";
import { useService } from "../../hooks/useService";
import i18n from "../../localization/i18n";
import {
  SecureStoreKey,
  SecureStoreService,
} from "../../services/secureStoreService/secureStoreService";

interface LocalizationProps {
  currentLanguage: string;
  changeLanguage: (language: string) => void;
  t: (key: string, options?: { [key: string]: any }) => string;
}

interface LocalizationContextProviderProps {
  children: React.ReactNode;
}

export const LocalizationContext = createContext<LocalizationProps | undefined>(
  undefined
);

export const useLocalization = (): LocalizationProps => {
  const context = useContext(LocalizationContext);
  if (!context) {
    throw new Error(
      "useLocalization must be used within a LocalizationContextProvider"
    );
  }
  return context;
};

export const LocalizationContextProvider = ({
  children,
}: LocalizationContextProviderProps) => {
  const [currentLanguage, setCurrentLanguage] = useState("fr");

  const secureStoreService: SecureStoreService = useService(
    "Common.SecureStoreService"
  );

  useEffect(() => {
    const getLanguage = async () => {
      const language = await secureStoreService.getValue(
        SecureStoreKey.USER_LANGUAGE
      );
      if (language) {
        i18n.changeLanguage(language);
        setCurrentLanguage(language);
      }
    };

    getLanguage();
  }, []);

  const changeLanguage = async (language: string) => {
    secureStoreService.setValue(SecureStoreKey.USER_LANGUAGE, language);
    i18n.changeLanguage(language);
    setCurrentLanguage(language);
  };

  const t = (key: string, options?: { [key: string]: any }) =>
    i18n.t(key, options);

  const contextValue: LocalizationProps = {
    currentLanguage,
    changeLanguage,
    t,
  };

  return (
    <LocalizationContext.Provider value={contextValue}>
      {children}
    </LocalizationContext.Provider>
  );
};
