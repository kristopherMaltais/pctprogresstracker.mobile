import { Hike } from "@/src/models/hike";
import { HikeWithItinary } from "@/src/models/hikeWithItinary";
import { HikeRepository } from "../repositories/hikeRepository";
import { HikeService } from "./hikeService";

export class HikeServiceImpl implements HikeService {
  private hikeRepository: HikeRepository;

  constructor(hikeRepository: HikeRepository) {
    this.hikeRepository = hikeRepository;
  }

  async getHikes(): Promise<Hike[] | HikeWithItinary[]> {
    return this.hikeRepository.getHikes();
  }
}
