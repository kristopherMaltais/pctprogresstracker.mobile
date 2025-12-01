import { Hike } from "@/models/hike";
import { HikeWithItinary } from "@/models/hikeWithItinary";

export interface HikeService {
  getHikes: () => Promise<Hike[] | HikeWithItinary[]>;
}
