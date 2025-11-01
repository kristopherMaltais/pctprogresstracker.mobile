import React, { createContext, useContext, useState } from "react";
import { ImageSourcePropType } from "react-native";
import { LIGHT_THEME } from "./colors";
import { icons } from "./icons/icons";
import { Theme } from "./models/theme";

interface ThemeProps {
  theme: Theme;
  getIcon: (iconName: string) => ImageSourcePropType;
}

interface ThemeContextProviderProps {
  children: React.ReactNode;
}

export const ThemeContext = createContext<ThemeProps | undefined>(undefined);

export const useTheme = (): ThemeProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
};

export const ThemeContextProvider = ({
  children,
}: ThemeContextProviderProps) => {
  const [displayedTheme] = useState<Theme>(LIGHT_THEME);

  const getIcon = (name: string | undefined): ImageSourcePropType => {
    let found = icons.find((icon) => icon.name === name);

    if (!found) {
      throw `${name} icon is not provided`;
    }

    return found.image;
  };

  const contextValue: ThemeProps = {
    theme: displayedTheme,
    getIcon: getIcon,
  };

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
