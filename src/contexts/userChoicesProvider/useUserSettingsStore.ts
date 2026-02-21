import { Hike } from "@/src/models/hike";
import { MeasurementUnit } from "@/src/models/measurementUnit";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { createLocationSlice, LocationSlice } from "./slices/locationSlice";

const initialState = {
  selectedHike: undefined,
  selectedHikeId: undefined,
  selectedHikeTotalDistance: 0,
  isReverse: false,
  isCalibratePositionOpen: false,
  backgroundImage: undefined,
  measurementUnit: MeasurementUnit.KILOMETER,
  isStickerSelectedPremium: false,
  showLogo: true,
  showShareMenu: false,
  substractSkippedSections: true,
};

export type FullStoreState = LocationSlice & {
  selectedHike: Hike | undefined;
  selectedHikeId: string | undefined;
  selectedHikeTotalDistance: number;
  isReverse: boolean;
  backgroundImage: string | undefined;
  measurementUnit: MeasurementUnit;
  isStickerSelectedPremium: boolean;
  isCalibratePositionOpen: boolean;
  showLogo: boolean;
  showShareMenu: boolean;
  substractSkippedSections: boolean;

  // Actions
  setSelectedHike: (hike: Hike) => void;
  setBackgroundImage: (image: string | undefined) => void;
  setMeasurementUnit: (unit: MeasurementUnit) => void;
  setIsStickerSelectedPremium: (flag: boolean) => void;
  setSelectedHikeTotalDistance: (newValue: number) => void;
  setIsReverse: (flag: boolean) => void;
  setIsCalibratePositionOpen: (flag: boolean) => void;
  setShowLogo: (flag: boolean) => void;
  setShowShareMenu: (flag: boolean) => void;
  setSubstractSkippedSections: (flag: boolean) => void;
  resetStore: () => void;
};

export const useUserSettingsStore = create<FullStoreState>()(
  persist(
    (set, get, store) => ({
      ...createLocationSlice(set, get, store),
      ...initialState,

      resetStore: () => {
        set({
          ...initialState,
          location: { displayedLocation: 0, pathLocation: 0 },
          skippedSections: [],
        });
      },

      setSelectedHike: (hike) => {
        const currentId = get().selectedHikeId;
        if (currentId === hike.id) {
          set({ selectedHike: hike });
          return;
        }

        set({
          selectedHike: hike,
          selectedHikeId: hike.id,
          selectedHikeTotalDistance: hike.totalDistance,
          backgroundImage: undefined,
          isReverse: false,
          location: { displayedLocation: 0, pathLocation: 0 },
        });
      },

      setBackgroundImage: (image) => set({ backgroundImage: image }),
      setMeasurementUnit: (unit) => set({ measurementUnit: unit }),
      setIsStickerSelectedPremium: (flag) => set({ isStickerSelectedPremium: flag }),
      setSelectedHikeTotalDistance: (newValue) => set({ selectedHikeTotalDistance: newValue }),
      setIsReverse: (flag) => set({ isReverse: flag }),
      setShowLogo: (flag) => set({ showLogo: flag }),
      setIsCalibratePositionOpen: (flag) => set({ isCalibratePositionOpen: flag }),
      setShowShareMenu: (flag) => set({ showShareMenu: flag }),
      setSubstractSkippedSections: (flag) => set({ substractSkippedSections: flag }),
    }),
    {
      name: "user-settings-storage",
      storage: createJSONStorage(() => AsyncStorage),
      partialize: (state) => ({
        measurementUnit: state.measurementUnit,
        selectedHikeId: state.selectedHikeId,
        selectedHikeTotalDistance: state.selectedHikeTotalDistance,
        substractSkippedSections: state.substractSkippedSections,
        skippedSections: state.skippedSections,
        location: state.location,
        isReverse: state.isReverse,
      }),
    }
  )
);
