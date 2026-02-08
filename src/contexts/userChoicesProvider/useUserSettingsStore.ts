import { Hike } from "@/src/models/hike";
import { Location } from "@/src/models/location";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import { create } from "zustand";

interface UserSettingsState {
  // --- Données (State) ---
  selectedHike: Hike | undefined;
  selectedHikeTotalDistance: number;
  location: Location;
  isReverse: boolean;
  backgroundImage: string | undefined;
  measurementUnit: MeasurementUnit;
  isStickerSelectedPremium: boolean;
  showLogo: boolean;
  showShareMenu: boolean;

  // --- Actions ---
  setSelectedHike: (hike: Hike) => void;
  setBackgroundImage: (image: string | undefined) => void;
  setLocation: (location: number) => void;
  setPathLocation: (location: number) => void;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  setIsStickerSelectedPremium: (flag: boolean) => void;
  changeSelectedHikeTotalDistance: (newValue: number) => void;
  setIsReverse: (flag: boolean) => void;
  setShowLogo: (flag: boolean) => void;
  setShowShareMenu: (flag: boolean) => void;
}

export const useUserSettingsStore = create<UserSettingsState>((set) => ({
  // --- État Initial ---
  selectedHike: undefined,
  selectedHikeTotalDistance: 0,
  location: {
    displayLocation: 0,
    pathLocation: 0,
  },
  isReverse: false,
  backgroundImage: undefined,
  measurementUnit: MeasurementUnit.KILOMETER,
  isStickerSelectedPremium: false,
  showLogo: true,
  showShareMenu: false,

  // --- Actions ---
  setSelectedHike: (hike) =>
    set({
      selectedHike: hike,
      selectedHikeTotalDistance: hike.totalDistanceKilometer,
      backgroundImage: undefined,
      location: {
        displayLocation: 0,
        pathLocation: 0,
      },
      measurementUnit: MeasurementUnit.KILOMETER,
      isReverse: false,
    }),

  setBackgroundImage: (image) => set({ backgroundImage: image }),

  setLocation: (distance) =>
    set((state) => ({
      location: {
        ...state.location,
        displayLocation: distance,
        pathLocation: distance,
      },
    })),

  setPathLocation: (adjustment) =>
    set((state) => ({
      location: {
        ...state.location,
        pathLocation: adjustment,
      },
    })),

  setMeasurementUnit: (unit) => set({ measurementUnit: unit }),

  setIsStickerSelectedPremium: (flag) => set({ isStickerSelectedPremium: flag }),

  changeSelectedHikeTotalDistance: (newValue) => set({ selectedHikeTotalDistance: newValue }),

  setIsReverse: (flag) => set({ isReverse: flag }),

  setShowLogo: (flag) => set({ showLogo: flag }),

  setShowShareMenu: (flag) => set({ showShareMenu: flag }),
}));
