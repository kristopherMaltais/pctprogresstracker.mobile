import { StickerMetadata } from "./stickerMetaData";

export type Itinary = {
  name: string;
  path: string;
  iosPathLength: number;
  androidPathLength: number;
  totalDistance: number;
  stickerMetadata: StickerMetadata;
  regions: string[];
  border: string;
};
