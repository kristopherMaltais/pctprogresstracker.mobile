import { Sticker } from "./sticker";

export type Hike = {
  id: string;
  name: string;
  totalDistance: number;
  isPremium: boolean;
  isRoundtrip: boolean;
  stickers: Sticker[];
};
