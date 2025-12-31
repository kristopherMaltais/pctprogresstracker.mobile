import { StickerMetadata } from "./stickerMetaData";

export type Itinary = {
  name: string;
  path: string;
  iosPathLength: number;
  androidPathLength: number;
  totalDistanceKilometer: number;
  totalDistanceMile: number;
  stickerMetadata: StickerMetadata;
  regions: string[];
  border: string;
};
