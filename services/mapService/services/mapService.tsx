import { Map } from "@/models/map";

export interface MapService {
  getMaps: () => Promise<Map[]>;
}
