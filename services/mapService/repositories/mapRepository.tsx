import { Map } from "@/models/map";
export interface MapRepository {
  getMaps: () => Promise<Map[]>;
}
