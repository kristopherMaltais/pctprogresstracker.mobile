import { Hike } from "@/src/models/hike";
import React, { createContext, useContext, useState } from "react";

interface HikesProps {
  hike: Hike | undefined;
  setHike: (hike: Hike | undefined) => void;
}

interface HikesProviderProps {
  children: React.ReactNode;
}

export const HikesContext = createContext<HikesProps | undefined>(undefined);

export const useHikes = (): HikesProps => {
  const context = useContext(HikesContext);
  if (!context) {
    throw new Error("useHikes must be used within a HikesProvider");
  }
  return context;
};

export const HikesContextProvider = ({ children }: HikesProviderProps) => {
  const [hike, setHike] = useState<Hike>();

  const contextValue: HikesProps = {
    hike: hike,
    setHike: setHike,
  };

  return <HikesContext.Provider value={contextValue}>{children}</HikesContext.Provider>;
};
