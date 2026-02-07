import { useService } from "@/src/hooks/useService";
import { SecureStoreKey, SecureStoreService } from "@/src/services/secureStoreService/secureStoreService";
import React, { createContext, useContext, useEffect, useState } from "react";
import { ImageSourcePropType, useColorScheme } from "react-native";
import { DARK_THEME, LIGHT_THEME } from "./colors";
import { icons } from "./icons/icons";
import { iconsDarkMode } from "./icons/iconsDarkMode";
import { iconsLightMode } from "./icons/iconsLightMode";
import { Theme } from "./models/theme";

interface ThemeProps {
  theme: Theme;
  isDarkMode: boolean;
  getIcon: (iconName: string) => ImageSourcePropType;
  toggleDarkMode: () => void;
}

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

const theme = {
  LIGHT: "lightTheme",
  DARK: "darkTheme",
};

export const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export const useTheme = (): ThemeProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeContextProvider = ({ children }: ThemeContextProviderProps) => {
  const [displayedTheme, setDisplayedTheme] = useState<Theme>(LIGHT_THEME);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  const secureStoreService: SecureStoreService = useService("Common.SecureStoreService");
  const colorScheme = useColorScheme();

  useEffect(() => {
    const getTheme = async () => {
      const userDisplayedTheme = await secureStoreService.getValue(SecureStoreKey.USER_DISPLAYED_THEME);

      if (userDisplayedTheme) {
        setDisplayedTheme(userDisplayedTheme == theme.DARK ? DARK_THEME : LIGHT_THEME);
        setIsDarkMode(userDisplayedTheme == theme.DARK ? true : false);
      } else if (colorScheme) {
        setDisplayedTheme(colorScheme == "dark" ? DARK_THEME : LIGHT_THEME);
        setIsDarkMode(colorScheme == "dark" ? true : false);
      }
    };

    getTheme();
  }, []);

  const toggleDarkMode = () => {
    if (isDarkMode) {
      setDisplayedTheme(LIGHT_THEME);
      secureStoreService.setValue(SecureStoreKey.USER_DISPLAYED_THEME, theme.LIGHT);
    } else {
      setDisplayedTheme(DARK_THEME);
      secureStoreService.setValue(SecureStoreKey.USER_DISPLAYED_THEME, theme.DARK);
    }

    setIsDarkMode(!isDarkMode);
  };

  const getIcon = (name: string | undefined): ImageSourcePropType => {
    let found = icons.find((icon) => icon.name === name);

    if (!found) {
      found = isDarkMode
        ? iconsDarkMode.find((icon) => icon.name === name)
        : iconsLightMode.find((icon) => icon.name === name);
    }

    if (!found) {
      throw `${name} icon is not provided`;
    }

    return found.image;
  };

  const contextValue: ThemeProps = {
    theme: displayedTheme,
    toggleDarkMode: toggleDarkMode,
    isDarkMode: isDarkMode,
    getIcon: getIcon,
  };

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
