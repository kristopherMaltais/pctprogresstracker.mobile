import { useUserSettingsStore } from "@/src/contexts/userChoicesProvider/useUserSettingsStore";
import React, { createContext, useContext, useEffect, useRef, useState } from "react";
import { SharedValue, useSharedValue } from "react-native-reanimated";

type CalibrationContextType = {
  calibrationProgress: SharedValue<number>;
  isRoundtrip: SharedValue<boolean>;
  halfTotalDistance: SharedValue<number>;
  isCalibratePositionOpen: boolean;
  openCalibration: () => void;
  saveCalibration: () => void;
  cancelCalibration: () => void;
  onSliderChange: (rawValue: number) => void;
};

const CalibrationContext = createContext<CalibrationContextType | null>(null);

export const CalibrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const calibrationProgress = useSharedValue(0);
  const isRoundtrip = useSharedValue(false);
  const halfTotalDistance = useSharedValue(0);

  const [isCalibratePositionOpen, setIsCalibratePositionOpen] = useState(false);
  const lastRawValue = useRef(0);

  const selectedHike = useUserSettingsStore((s) => s.selectedHike);
  const selectedHikeTotalDistance = useUserSettingsStore((s) => s.selectedHikeTotalDistance);
  const location = useUserSettingsStore((s) => s.location);
  const setPathLocation = useUserSettingsStore((s) => s.setPathLocation);

  useEffect(() => {
    isRoundtrip.value = selectedHike?.isRoundtrip ?? false;
    halfTotalDistance.value = selectedHikeTotalDistance / 2;
  }, [selectedHike, selectedHikeTotalDistance]);

  const openCalibration = () => {
    const half = selectedHikeTotalDistance / 2;
    const rawLoc = location.pathLocation;
    lastRawValue.current = rawLoc;
    const adjusted = (selectedHike?.isRoundtrip ?? false) && rawLoc > half ? rawLoc - half : rawLoc;
    calibrationProgress.value = adjusted;
    setIsCalibratePositionOpen(true);
  };

  const saveCalibration = () => {
    setPathLocation(lastRawValue.current);
    setIsCalibratePositionOpen(false);
  };

  const cancelCalibration = () => {
    setIsCalibratePositionOpen(false);
  };

  const onSliderChange = (rawValue: number) => {
    lastRawValue.current = rawValue;
  };

  return (
    <CalibrationContext.Provider
      value={{
        calibrationProgress,
        isRoundtrip,
        halfTotalDistance,
        isCalibratePositionOpen,
        openCalibration,
        saveCalibration,
        cancelCalibration,
        onSliderChange,
      }}
    >
      {children}
    </CalibrationContext.Provider>
  );
};

export const useCalibrationContext = (): CalibrationContextType => {
  const ctx = useContext(CalibrationContext);
  if (!ctx) throw new Error("useCalibrationContext must be used within CalibrationProvider");
  return ctx;
};
