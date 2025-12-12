import { Direction } from "./direction";

export type StickerMetadata = {
  viewbox: string;
  direction: Direction;
  pathLength: number;
  width: number;
  height: number;
  largeStickerRatio: number;
  isRoundTrip: boolean;
};
