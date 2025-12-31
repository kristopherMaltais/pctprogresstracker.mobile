import { Direction } from "./direction";

export type StickerMetadata = {
  direction: Direction;
  iosPathLength: number;
  androidPathLength: number;
  isRoundTrip: boolean;
  stickerLargeViewBox: string;
};
