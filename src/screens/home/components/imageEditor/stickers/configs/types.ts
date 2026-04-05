export interface StickerVariant {
  [key: string]: unknown;
}

export interface StickerConfig<T extends StickerVariant = StickerVariant> {
  id: string;
  variants: T[];
}
