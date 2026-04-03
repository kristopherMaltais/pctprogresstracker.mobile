import { StickerConfig, StickerVariant } from "./types";

export interface StickerFreeVariant extends StickerVariant {
  hideDecorations: boolean;
  color: string;
}

export const StickerFreeConfig: StickerConfig<StickerFreeVariant> = {
  id: "stickerFree",
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
