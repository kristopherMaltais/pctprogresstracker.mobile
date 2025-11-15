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
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (measurementUnit: MeasurementUnit) => void;
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
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(
    MeasurementUnit.KILOMETER
  );

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
    measurementUnit: measurementUnit,
    setMeasurementUnit: setMeasurementUnit,
    selectedHikeTotalDistance: selectedHikeTotalDistance,
  };

  return (
    <UserChoicesContext.Provider value={contextValue}>
      {children}
    </UserChoicesContext.Provider>
  );
};
