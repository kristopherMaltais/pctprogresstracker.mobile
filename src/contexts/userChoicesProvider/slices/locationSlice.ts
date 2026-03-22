import { Location } from "@/src/models/location";
import { LocationInterval } from "@/src/models/locationInterval";
import { StateCreator } from "zustand";
import { FullStoreState } from "../useUserSettingsStore";

export type LocationSlice = {
  location: Location;
  distanceHiked: number;
  skippedSections: LocationInterval[];

  setLocation: (distance: number) => void;
  setDistanceHiked: (distance: number) => void;
  setPathLocation: (location: number) => void;
  addSkippedSection: (skippedSection: LocationInterval) => void;
  editSkippedSection: (oldSection: LocationInterval, newSection: LocationInterval) => void;
  deleteSkippedSection: (skippedSection: LocationInterval) => void;
};

export const createLocationSlice: StateCreator<FullStoreState, [], [], LocationSlice> = (set) => ({
  location: { displayedLocation: 0, pathLocation: 0 },
  distanceHiked: 0,
  skippedSections: [],

  addSkippedSection(skippedSection: LocationInterval) {
    set((state) => ({
      skippedSections: [...state.skippedSections, skippedSection],
      location: { displayedLocation: 0, pathLocation: 0 },
      distanceHiked: 0,
    }));
  },

  editSkippedSection: (oldSection: LocationInterval, newSection: LocationInterval) => {
    set((state) => ({
      skippedSections: state.skippedSections.map((section) =>
        section.start.displayedLocation === oldSection.start.displayedLocation &&
        section.end.displayedLocation === oldSection.end.displayedLocation
          ? newSection
          : section
      ),
      location: { displayedLocation: 0, pathLocation: 0 },
      distanceHiked: 0,
    }));
  },

  deleteSkippedSection: (skippedSection: LocationInterval) => {
    set((state) => ({
      skippedSections: state.skippedSections.filter(
        (section) =>
          section.start.displayedLocation !== skippedSection.start.displayedLocation ||
          section.end.displayedLocation !== skippedSection.end.displayedLocation
      ),
      location: { displayedLocation: 0, pathLocation: 0 },
      distanceHiked: 0,
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
  setDistanceHiked: (distance: number) =>
    set(() => ({
      distanceHiked: distance,
    })),
});
