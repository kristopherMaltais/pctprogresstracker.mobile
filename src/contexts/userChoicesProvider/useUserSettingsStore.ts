import { Hike } from "@/src/models/hike";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { create } from "zustand";
import { createLocationSlice, LocationSlice } from "./slices/locationSlice";

export type FullStoreState = LocationSlice & {
  selectedHike: Hike | undefined;
  selectedHikeTotalDistance: number;
  isReverse: boolean;
  backgroundImage: string | undefined;
  measurementUnit: MeasurementUnit;
  isStickerSelectedPremium: boolean;
  isCalibratePositionOpen: boolean;
  showLogo: boolean;
  showShareMenu: boolean;
  substractSkippedSections: boolean;

  setSelectedHike: (hike: Hike) => void;
  setBackgroundImage: (image: string | undefined) => void;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  setIsStickerSelectedPremium: (flag: boolean) => void;
  changeSelectedHikeTotalDistance: (newValue: number) => void;
  setIsReverse: (flag: boolean) => void;
  setIsCalibratePositionOpen: (flag: boolean) => void;
  setShowLogo: (flag: boolean) => void;
  setShowShareMenu: (flag: boolean) => void;
  setSubstractSkippedSections: (flag: boolean) => void;
};

export const useUserSettingsStore = create<FullStoreState>((...a) => ({
  ...createLocationSlice(...a),
  selectedHike: undefined,
  selectedHikeTotalDistance: 0,
  isReverse: false,
  isCalibratePositionOpen: false,
  backgroundImage: undefined,
  measurementUnit: MeasurementUnit.KILOMETER,
  isStickerSelectedPremium: false,
  showLogo: true,
  showShareMenu: false,
  substractSkippedSections: true,

  setSelectedHike: (hike) =>
    a[0]({
      selectedHike: hike,
      selectedHikeTotalDistance: hike.totalDistanceKilometer,
      backgroundImage: undefined,
      measurementUnit: MeasurementUnit.KILOMETER,
      isReverse: false,
      location: { displayedLocation: 0, pathLocation: 0 },
    }),

  setBackgroundImage: (image) => a[0]({ backgroundImage: image }),
  setMeasurementUnit: (unit) => a[0]({ measurementUnit: unit }),
  setIsStickerSelectedPremium: (flag) => a[0]({ isStickerSelectedPremium: flag }),
  changeSelectedHikeTotalDistance: (newValue) => a[0]({ selectedHikeTotalDistance: newValue }),
  setIsReverse: (flag) => a[0]({ isReverse: flag }),
  setShowLogo: (flag) => a[0]({ showLogo: flag }),
  setIsCalibratePositionOpen: (flag) => a[0]({ isCalibratePositionOpen: flag }),
  setShowShareMenu: (flag) => a[0]({ showShareMenu: flag }),
  setSubstractSkippedSections: (flag) => a[0]({ substractSkippedSections: flag }),
}));
