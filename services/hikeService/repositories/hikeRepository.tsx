import { Hike } from "@/models/hike";
import { HikeWithItinary } from "@/models/hikeWithItinary";

export interface HikeRepository {
  getHikes: () => Promise<Hike[] | HikeWithItinary[]>;
}
