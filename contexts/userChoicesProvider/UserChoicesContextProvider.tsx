import { Hike } from "@/models/hike";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { createContext, useContext, useState } from "react";

interface UserChoicesProps {
  selectedHike: Hike | undefined;
  setSelectedHike: (hike: Hike) => void;
  distanceHiked: number;
  setDistanceHiked: (distance: number) => void;
  displayHikeLogo: boolean;
  setDisplayHikeLogo: (flag: boolean) => void;
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (measurementUnit: MeasurementUnit) => void;
  displayPercentage: boolean;
  setDisplayPercentage: (flag: boolean) => void;
}

interface UserChoicesProviderProps {
  children: React.ReactNode;
}

export const UserChoicesContext = createContext<UserChoicesProps | undefined>(
  undefined
);

export const useUserChoices = (): UserChoicesProps => {
  const context = useContext(UserChoicesContext);
  if (!context) {
    throw new Error("useUserChoices must be used within a UserChoicesProvider");
  }
  return context;
};

export const UserChoicesContextProvider = ({
  children,
}: UserChoicesProviderProps) => {
  const [selectedHike, setSelectedHike] = useState<Hike>();
  const [distanceHiked, setDistanceHiked] = useState<number>(0);
  const [displayHikeLogo, setDisplayHikeLogo] = useState<boolean>(true);
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(
    MeasurementUnit.KILOMETER
  );
  const [displayPercentage, setDisplayPercentage] = useState<boolean>(true);

  const contextValue: UserChoicesProps = {
    selectedHike: selectedHike,
    setSelectedHike: setSelectedHike,
    distanceHiked: distanceHiked,
    setDistanceHiked: setDistanceHiked,
    displayHikeLogo: displayHikeLogo,
    setDisplayHikeLogo: setDisplayHikeLogo,
    measurementUnit: measurementUnit,
    setMeasurementUnit: setMeasurementUnit,
    displayPercentage: displayPercentage,
    setDisplayPercentage: setDisplayPercentage,
  };

  return (
    <UserChoicesContext.Provider value={contextValue}>
      {children}
    </UserChoicesContext.Provider>
  );
};
