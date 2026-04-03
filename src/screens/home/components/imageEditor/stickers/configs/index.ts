import { StickerFreeConfig } from "./StickerFree.config";
import { StickerFreeMapOnlyConfig } from "./StickerFreeMapOnly.config";
import { StickerStatsWithProgressBarConfig } from "./StickerProgressBar.config";
import { StickerStats3Config, StickerStats4Config, StickerStats6Config, StickerStats3VerticalConfig } from "./StickerStats.config";
import { StickerConfig } from "./types";

export const STICKER_CONFIGS: Record<string, StickerConfig> = {
  stickerFree: StickerFreeConfig,
  stickerFreeMapOnly: StickerFreeMapOnlyConfig,
  stickerStats3: StickerStats3Config,
  stickerStats4: StickerStats4Config,
  stickerStats6: StickerStats6Config,
  stickerStats3Vertical: StickerStats3VerticalConfig,
  stickerProgressBar: StickerStatsWithProgressBarConfig,
};
