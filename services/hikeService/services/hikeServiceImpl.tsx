import { Hike } from "@/models/hike";
import { HikeRepository } from "../repositories/hikeRepository";
import { HikeService } from "./hikeService";

export class HikeServiceImpl implements HikeService {
  private hikeRepository: HikeRepository;

  constructor(hikeRepository: HikeRepository) {
    this.hikeRepository = hikeRepository;
  }

  async getHikes(): Promise<Hike[]> {
    return this.hikeRepository.getHikes();
  }
}
