import { Hike } from "@/src/models/hike";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import React, { createContext, useContext, useEffect, useState } from "react";
import { usePremium } from "../premium/PremiumContextProvider";

interface UserChoicesProps {
  selectedHike: Hike | undefined;
  setSelectedHike: (hike: Hike) => void;
  selectedProgressType: number;
  setSelectedProgressType: (index: number) => void;
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
  changeSelectedHikeTotalDistance: (newValue: number) => void;
  isReverse: boolean;
  setIsReverse: (flag: boolean) => void;
  showLogo: boolean;
  setShowLogo: (flag: boolean) => void;
}

interface UserChoicesProviderProps {
  children: React.ReactNode;
}

export const UserChoicesContext = createContext<UserChoicesProps | undefined>(undefined);

export const useUserChoices = (): UserChoicesProps => {
  const context = useContext(UserChoicesContext);
  if (!context) {
    throw new Error("useUserChoices must be used within a UserChoicesProvider");
  }
  return context;
};

export const UserChoicesContextProvider = ({ children }: UserChoicesProviderProps) => {
  const [selectedHike, setSelectedHike] = useState<Hike>();
  const [showLogo, setShowLogo] = useState<boolean>(true);
  const [isStickerSelectedPremium, setIsStickerSelectedPremium] = useState<boolean>(false);
  const [selectedProgressType, setSelectedProgressType] = useState<number>(0);
  const [backgroundImage, setBackgroundImage] = useState<string>();
  const [selectedHikeTotalDistance, setSelectecHikeTotalDistance] = useState<number>(0);
  const [isReverse, setIsReverse] = useState<boolean>(false);
  const [displayedDistanceHiked, setDisplayedDistanceHiked] = useState<number>(0);
  const [pathDistanceHiked, setPathDistanceHiked] = useState<number>(0);
  const [measurementUnit, setMeasurementUnit] = useState<MeasurementUnit>(MeasurementUnit.KILOMETER);

  const { isPremiumUnlocked } = usePremium();

  useEffect(() => {
    setBackgroundImage(undefined);
    setDisplayedDistanceHiked(0);
    setPathDistanceHiked(0);
    setMeasurementUnit(MeasurementUnit.KILOMETER);
    setSelectecHikeTotalDistance(selectedHike?.totalDistanceKilometer!);
  }, [selectedHike]);

  const setDistanceHiked = (distance: number) => {
    setDisplayedDistanceHiked(distance);
    setPathDistanceHiked(distance);
  };

  const calibratePathDistanceHiked = (adjustment: number) => {
    setPathDistanceHiked(adjustment);
  };

  const changeSelectedHikeTotalDistance = (newValue: number) => {
    setSelectecHikeTotalDistance(newValue);
  };

  const contextValue: UserChoicesProps = {
    selectedHike: selectedHike,
    setSelectedHike: setSelectedHike,
    selectedProgressType: selectedProgressType,
    setSelectedProgressType: setSelectedProgressType,
    backgroundImage: !isPremiumUnlocked && isStickerSelectedPremium ? undefined : backgroundImage,
    setBackgroundImage: setBackgroundImage,
    displayedDistanceHiked: !isPremiumUnlocked && isStickerSelectedPremium ? 0 : displayedDistanceHiked,
    calibratePathDistanceHiked: calibratePathDistanceHiked,
    pathDistanceHiked: !isPremiumUnlocked && isStickerSelectedPremium ? 0 : pathDistanceHiked,
    setDistanceHiked: setDistanceHiked,
    measurementUnit: measurementUnit,
    setMeasurementUnit: setMeasurementUnit,
    selectedHikeTotalDistance: selectedHikeTotalDistance,
    isStickerSelectedPremium: isStickerSelectedPremium,
    setIsStickerSelectedPremium: setIsStickerSelectedPremium,
    changeSelectedHikeTotalDistance: changeSelectedHikeTotalDistance,
    isReverse: isReverse,
    setIsReverse: setIsReverse,
    showLogo: showLogo,
    setShowLogo: setShowLogo,
  };

  return <UserChoicesContext.Provider value={contextValue}>{children}</UserChoicesContext.Provider>;
};
