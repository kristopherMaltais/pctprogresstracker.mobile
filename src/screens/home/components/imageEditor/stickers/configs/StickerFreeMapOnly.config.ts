import { StickerConfig, StickerVariant } from "./types";

export interface StickerFreeMapOnlyVariant extends StickerVariant {
  hideDecorations: boolean;
}

export const StickerFreeMapOnlyConfig: StickerConfig<StickerFreeMapOnlyVariant> = {
  id: "stickerFreeMapOnly",
  variants: [
    {
      hideDecorations: false,
    },
    {
      hideDecorations: true,
    },
  ],
};
