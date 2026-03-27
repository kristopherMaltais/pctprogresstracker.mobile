import { Map } from "./map";

export type Hike = {
  id: string;
  name: string;
  isPremium: boolean;
  isRoundtrip: boolean;
  maps: Map[];
  selectedMapIndex: number;
};
