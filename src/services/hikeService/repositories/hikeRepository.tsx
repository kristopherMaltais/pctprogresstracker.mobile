import { Hike } from "@/src/models/hike";
import { HikeWithItinary } from "@/src/models/hikeWithItinary";

export interface HikeRepository {
  getHikes: () => Promise<Hike[] | HikeWithItinary[]>;
}
