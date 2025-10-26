import React, { createContext, useContext, useState } from "react";

interface ScrollProps {
  scrollEnabled: boolean;
  setScrollEnabled: (flag: boolean) => void;
}

interface ScrollProviderProps {
  children: React.ReactNode;
}

export const ScrollContext = createContext<ScrollProps | undefined>(undefined);

export const useScroll = (): ScrollProps => {
  const context = useContext(ScrollContext);
  if (!context) {
    throw new Error("useScroll must be used within a ScrollProvider");
  }
  return context;
};

export const ScrollContextProvider = ({ children }: ScrollProviderProps) => {
  const [scrollEnabled, setScrollEnabled] = useState<boolean>(true);

  const contextValue: ScrollProps = {
    scrollEnabled: scrollEnabled,
    setScrollEnabled: setScrollEnabled,
  };

  return (
    <ScrollContext.Provider value={contextValue}>
      {children}
    </ScrollContext.Provider>
  );
};
