import { Hike } from "@/models/hike";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { createContext, useContext, useEffect, useState } from "react";

interface UserChoicesProps {
  selectedHike: Hike | undefined;
  setSelectedHike: (hike: Hike) => void;
  selectedProgressType: number;
  setSelectedProgressType: (index: number) => void;
  showBorders: boolean;
  setShowBorders: (flag: boolean) => void;
  backgroundImage: string | undefined;
  setBackgroundImage: (image: string) => void;
  distanceHiked: number;
  setDistanceHiked: (distance: number) => void;
  displayHikeLogo: boolean;
  setDisplayHikeLogo: (flag: boolean) => void;
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (measurementUnit: MeasurementUnit) => void;
  displayPercentage: boolean;
  setDisplayPercentage: (flag: boolean) => void;
  selectedHikeTotalDistance: number;
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
  const [selectedProgressType, setSelectedProgressType] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [selectedHikeTotalDistance, setSelectecHikeTotalDistance] =
    useState<number>(0);
  const [distanceHiked, setDistanceHiked] = useState<number>(0);
  const [displayHikeLogo, setDisplayHikeLogo] = useState<boolean>(true);
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(
    MeasurementUnit.KILOMETER
  );
  const [displayPercentage, setDisplayPercentage] = useState<boolean>(true);

  useEffect(() => {
    if (measurementUnit == MeasurementUnit.KILOMETER) {
      setSelectecHikeTotalDistance(selectedHike?.totalDistanceKilometer!);
    } else {
      setSelectecHikeTotalDistance(selectedHike?.totalDistanceMile!);
    }
  }, [measurementUnit, selectedHike]);

  const contextValue: UserChoicesProps = {
    selectedHike: selectedHike,
    setSelectedHike: setSelectedHike,
    showBorders: showBorders,
    setShowBorders: setShowBorders,
    selectedProgressType: selectedProgressType,
    setSelectedProgressType: setSelectedProgressType,
    backgroundImage: backgroundImage,
    setBackgroundImage: setBackgroundImage,
    distanceHiked: distanceHiked,
    setDistanceHiked: setDistanceHiked,
    displayHikeLogo: displayHikeLogo,
    setDisplayHikeLogo: setDisplayHikeLogo,
    measurementUnit: measurementUnit,
    setMeasurementUnit: setMeasurementUnit,
    displayPercentage: displayPercentage,
    setDisplayPercentage: setDisplayPercentage,
    selectedHikeTotalDistance: selectedHikeTotalDistance,
  };

  return (
    <UserChoicesContext.Provider value={contextValue}>
      {children}
    </UserChoicesContext.Provider>
  );
};
