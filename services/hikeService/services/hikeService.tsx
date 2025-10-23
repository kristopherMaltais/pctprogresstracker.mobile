import { Hike } from "@/models/hike";

export interface HikeService {
  getHikes: () => Promise<Hike[]>;
}
