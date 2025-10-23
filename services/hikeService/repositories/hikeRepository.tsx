import { Hike } from "@/models/hike";

export interface HikeRepository {
  getHikes: () => Promise<Hike[]>;
}
