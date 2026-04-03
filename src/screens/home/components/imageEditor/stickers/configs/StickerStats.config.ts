import { StickerConfig, StickerVariant } from "./types";

export type CardMode = "none" | "dark" | "white";

export type ColorScheme = "white" | "black";

export interface StickerStatsVariant extends StickerVariant {
  showAnimation: boolean;
  cardMode: CardMode;
  showProgressBar: boolean;
  colorScheme: ColorScheme;
}

const statsVariants: StickerStatsVariant[] = [
  // No card
  { colorScheme: "white", cardMode: "none", showProgressBar: false, showAnimation: false },
  { colorScheme: "white", cardMode: "none", showProgressBar: true, showAnimation: false },
  { colorScheme: "white", cardMode: "none", showProgressBar: false, showAnimation: true },

  // White card
  { colorScheme: "black", cardMode: "white", showProgressBar: false, showAnimation: false },
  { colorScheme: "black", cardMode: "white", showProgressBar: true, showAnimation: false },
  { colorScheme: "black", cardMode: "white", showProgressBar: false, showAnimation: true },

  // Dark card
  { colorScheme: "white", cardMode: "dark", showProgressBar: false, showAnimation: false },
  { colorScheme: "white", cardMode: "dark", showProgressBar: true, showAnimation: false },
  { colorScheme: "white", cardMode: "dark", showProgressBar: false, showAnimation: true },
];

export const StickerStats3Config: StickerConfig<StickerStatsVariant> = {
  id: "stickerStats3",
  variants: statsVariants,
};

export const StickerStats4Config: StickerConfig<StickerStatsVariant> = {
  id: "stickerStats4",
  variants: statsVariants,
};

export const StickerStats6Config: StickerConfig<StickerStatsVariant> = {
  id: "stickerStats6",
  variants: statsVariants,
};

export interface StickerStats3VerticalVariant extends StickerVariant {
  cardMode: CardMode;
}

export const StickerStats3VerticalConfig: StickerConfig<StickerStats3VerticalVariant> = {
  id: "stickerStats3Vertical",
  variants: [{ cardMode: "none" }, { cardMode: "dark" }, { cardMode: "white" }],
};
