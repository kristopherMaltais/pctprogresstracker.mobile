import { StickerConfig, StickerVariant } from "./types";

export interface StickerFreeMapOnlyVariant extends StickerVariant {
  hideDecorations: boolean;
  color: string;
}

export const StickerFreeMapOnlyConfig: StickerConfig<StickerFreeMapOnlyVariant> = {
  id: "stickerFreeMapOnly",
  variants: [
    {
      hideDecorations: false,
      color: "white",
    },
    {
      hideDecorations: true,
      color: "white",
    },
  ],
};
