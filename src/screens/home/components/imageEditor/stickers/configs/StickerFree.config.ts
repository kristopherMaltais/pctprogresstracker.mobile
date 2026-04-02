import { StickerConfig, StickerVariant } from "./types";

export interface StickerFreeVariant extends StickerVariant {
  hideDecorations: boolean;
}

export const StickerFreeConfig: StickerConfig<StickerFreeVariant> = {
  id: "stickerFree",
  variants: [
    {
      hideDecorations: false,
    },
    {
      hideDecorations: true,
    },
  ],
};
