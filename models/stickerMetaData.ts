import { Direction } from "./direction";

export type StickerMetadata = {
  viewbox: string;
  direction: Direction;
  pathLength: number;
  width: number;
  height: number;
  isRoundTrip: boolean;
};
