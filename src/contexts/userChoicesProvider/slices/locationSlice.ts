import { Location } from "@/src/models/location";
import { LocationInterval } from "@/src/models/locationInterval";
import { StateCreator } from "zustand";
import { FullStoreState } from "../useUserSettingsStore";

export type LocationSlice = {
  location: Location;
  skippedSections: LocationInterval[];

  setLocation: (distance: number) => void;
  setPathLocation: (location: number) => void;
  addSkippedSection: (skippedSection: LocationInterval) => void;
};

export const createLocationSlice: StateCreator<FullStoreState, [], [], LocationSlice> = (set) => ({
  location: { displayedLocation: 0, pathLocation: 0 },
  skippedSections: [],
  addSkippedSection(skippedSection) {
    set((state) => ({
      skippedSections: [...state.skippedSections, skippedSection],
    }));
  },
  setLocation: (location: number) =>
    set((state) => ({
      location: { ...state.location, displayedLocation: location, pathLocation: location },
    })),
  setPathLocation: (location: number) =>
    set((state) => ({
      location: { ...state.location, pathLocation: location },
    })),
});
