import { useService } from "@/hooks/useService";
import { Hike } from "@/models/hike";
import { HikeService } from "@/services/hikeService/services/hikeService";
import React, { createContext, useContext, useEffect, useState } from "react";

interface HikesProps {
  hikes: Hike[];
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
  const [hikes, setHikes] = useState<Hike[]>([]);

  const hikeService: HikeService = useService("Hike.HikeService");

  useEffect(() => {
    hikeService
      .getHikes()
      .then((hikes: Hike[]) => {
        setHikes(hikes);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const contextValue: HikesProps = {
    hikes: hikes,
  };

  return (
    <HikesContext.Provider value={contextValue}>
      {children}
    </HikesContext.Provider>
  );
};
