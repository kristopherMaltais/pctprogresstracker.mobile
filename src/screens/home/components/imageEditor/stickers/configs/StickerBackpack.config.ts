import { StickerConfig, StickerVariant } from "./types";

export type CardMode = "none" | "dark" | "white";

export type ColorScheme = "white" | "black";

export interface StickerBackpackVariant extends StickerVariant {
  cardMode: CardMode;
  colorScheme: ColorScheme;
}

export const backpackVariants: StickerBackpackVariant[] = [
  { colorScheme: "white", cardMode: "none" },
  { colorScheme: "white", cardMode: "dark" },
  { colorScheme: "black", cardMode: "white" },
];

export const StickerBackpackConfig: StickerConfig<StickerBackpackVariant> = {
  id: "stickerBackpack",
  variants: backpackVariants,
};
