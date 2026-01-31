import { Hike } from "@/src/models/hike";
import { HikeWithItinary } from "@/src/models/hikeWithItinary";

export interface HikeService {
  getHikes: () => Promise<Hike[] | HikeWithItinary[]>;
}
