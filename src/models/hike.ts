import { StickerMetadata } from "./stickerMetaData";

export type Hike = {
  id: string;
  name: string;
  path: string;
  isPremium: boolean;
  stickerMetadata: StickerMetadata;
  regions: string[];
  border: string;
  totalDistance: number;
};
