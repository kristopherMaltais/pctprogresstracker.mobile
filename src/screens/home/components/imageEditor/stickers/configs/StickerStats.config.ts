import { StickerConfig, StickerVariant } from "./types";

export type CardMode = "none" | "dark" | "white";

export interface StickerStatsVariant extends StickerVariant {
  showAnimation: boolean;
  cardMode: CardMode;
  showProgressBar: boolean;
}

const statsVariants: StickerStatsVariant[] = [
  { showAnimation: false, cardMode: "none",  showProgressBar: false },
  { showAnimation: true,  cardMode: "none",  showProgressBar: false },
  { showAnimation: false, cardMode: "dark",  showProgressBar: false },
  { showAnimation: true,  cardMode: "dark",  showProgressBar: false },
  { showAnimation: false, cardMode: "dark",  showProgressBar: true  },
  { showAnimation: false, cardMode: "white", showProgressBar: false },
  { showAnimation: false, cardMode: "white", showProgressBar: true  },
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

export interface StickerStatsWithProgressBarVariant extends StickerVariant {
  showProgressBar: boolean;
}

export const StickerStatsWithProgressBarConfig: StickerConfig<StickerStatsWithProgressBarVariant> = {
  id: "stickerStatsWithProgressBar",
  variants: [
    { showProgressBar: true },
    { showProgressBar: false },
  ],
};

export interface StickerStats3VerticalVariant extends StickerVariant {
  cardMode: CardMode;
}

export const StickerStats3VerticalConfig: StickerConfig<StickerStats3VerticalVariant> = {
  id: "stickerStats3Vertical",
  variants: [
    { cardMode: "none" },
    { cardMode: "dark" },
    { cardMode: "white" },
  ],
};
