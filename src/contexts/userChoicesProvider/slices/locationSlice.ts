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
  editSkippedSection: (oldSection: LocationInterval, newSection: LocationInterval) => void;
  deleteSkippedSection: (skippedSection: LocationInterval) => void;
};

export const createLocationSlice: StateCreator<FullStoreState, [], [], LocationSlice> = (set) => ({
  location: { displayedLocation: 0, pathLocation: 0 },
  skippedSections: [],
  addSkippedSection(skippedSection: LocationInterval) {
    set((state) => ({
      skippedSections: [...state.skippedSections, skippedSection],
    }));
  },
  editSkippedSection: (oldSection: LocationInterval, newSection: LocationInterval) => {
    set((state) => ({
      skippedSections: state.skippedSections.map(
        (section) =>
          // On cherche la section qui match exactement l'ancienne
          section.start.displayedLocation === oldSection.start.displayedLocation &&
          section.end.displayedLocation === oldSection.end.displayedLocation
            ? newSection // On remplace par la nouvelle
            : section // On garde l'originale
      ),
    }));
  },
  deleteSkippedSection: (skippedSection: LocationInterval) => {
    set((state) => ({
      skippedSections: state.skippedSections.filter(
        (section) =>
          section.start.displayedLocation !== skippedSection.start.displayedLocation ||
          section.end.displayedLocation !== skippedSection.end.displayedLocation
      ),
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
