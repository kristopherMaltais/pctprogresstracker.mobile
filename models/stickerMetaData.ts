import { Direction } from "./direction";

export type StickerMetadata = {
  direction: Direction;
  pathLength: number;
  isRoundTrip: boolean;
  stickerLargeViewBox: string;
};
