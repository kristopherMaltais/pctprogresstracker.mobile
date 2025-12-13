import { Hike } from "@/models/hike";
import { MeasurementUnit } from "@/models/measurementUnit";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePremium } from "../premium/PremiumContextProvider";

interface UserChoicesProps {
  selectedHike: Hike | undefined;
  setSelectedHike: (hike: Hike) => void;
  selectedProgressType: number;
  setSelectedProgressType: (index: number) => void;
  showBorders: boolean;
  setShowBorders: (flag: boolean) => void;
  backgroundImage: string | undefined;
  setBackgroundImage: (image: string) => void;
  displayedDistanceHiked: number;
  setDistanceHiked: (distance: number) => void;
  pathDistanceHiked: number;
  calibratePathDistanceHiked: (adjustment: number) => void;
  measurementUnit: MeasurementUnit;
  setMeasurementUnit: (measurementUnit: MeasurementUnit) => void;
  selectedHikeTotalDistance: number;
  isStickerSelectedPremium: boolean;
  setIsStickerSelectedPremium: (flag: boolean) => void;
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
  const [isStickerSelectedPremium, setIsStickerSelectedPremium] =
    useState<boolean>(false);
  const [selectedProgressType, setSelectedProgressType] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [selectedHikeTotalDistance, setSelectecHikeTotalDistance] =
    useState<number>(0);
  const [displayedDistanceHiked, setDisplayedDistanceHiked] =
    useState<number>(0);
  const [pathDistanceHiked, setPathDistanceHiked] = useState<number>(0);
  const [showBorders, setShowBorders] = useState<boolean>(true);
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(
    MeasurementUnit.KILOMETER
  );

  const { isPremiumUnlocked } = usePremium();

  useEffect(() => {
    if (measurementUnit == MeasurementUnit.KILOMETER) {
      setSelectecHikeTotalDistance(selectedHike?.totalDistanceKilometer!);
    } else {
      setSelectecHikeTotalDistance(selectedHike?.totalDistanceMile!);
    }
  }, [measurementUnit, selectedHike]);

  useEffect(() => {
    setBackgroundImage(undefined);
    setDisplayedDistanceHiked(0);
    setPathDistanceHiked(0);
    setShowBorders(true);
    setMeasurementUnit(MeasurementUnit.KILOMETER);
  }, [selectedHike]);

  const setDistanceHiked = (distance: number) => {
    setDisplayedDistanceHiked(distance);
    setPathDistanceHiked(distance);
  };

  const calibratePathDistanceHiked = (adjustment: number) => {
    setPathDistanceHiked(adjustment);
  };

  const contextValue: UserChoicesProps = {
    selectedHike: selectedHike,
    setSelectedHike: setSelectedHike,
    showBorders:
      !isPremiumUnlocked && isStickerSelectedPremium ? true : showBorders,
    setShowBorders: setShowBorders,
    selectedProgressType: selectedProgressType,
    setSelectedProgressType: setSelectedProgressType,
    backgroundImage:
      !isPremiumUnlocked && isStickerSelectedPremium
        ? undefined
        : backgroundImage,
    setBackgroundImage: setBackgroundImage,
    displayedDistanceHiked:
      !isPremiumUnlocked && isStickerSelectedPremium
        ? 0
        : displayedDistanceHiked,
    calibratePathDistanceHiked: calibratePathDistanceHiked,
    pathDistanceHiked:
      !isPremiumUnlocked && isStickerSelectedPremium ? 0 : pathDistanceHiked,
    setDistanceHiked: setDistanceHiked,
    measurementUnit: measurementUnit,
    setMeasurementUnit: setMeasurementUnit,
    selectedHikeTotalDistance: selectedHikeTotalDistance,
    isStickerSelectedPremium: isStickerSelectedPremium,
    setIsStickerSelectedPremium: setIsStickerSelectedPremium,
  };

  return (
    <UserChoicesContext.Provider value={contextValue}>
      {children}
    </UserChoicesContext.Provider>
  );
};
