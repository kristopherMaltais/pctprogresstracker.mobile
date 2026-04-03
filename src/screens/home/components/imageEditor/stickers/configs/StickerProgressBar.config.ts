import { StickerConfig, StickerVariant } from "./types";

export interface StickerProgressBarVariant extends StickerVariant {
  showProgressBar: boolean;
}

export const StickerStatsWithProgressBarConfig: StickerConfig<StickerProgressBarVariant> = {
  id: "stickerProgressBar",
  variants: [{ showProgressBar: true }, { showProgressBar: false }],
};
