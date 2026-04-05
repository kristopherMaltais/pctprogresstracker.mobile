import { HikeRepository } from "../repositories/hikeRepository";
import { HikeService } from "./hikeService";

export class HikeServiceImpl implements HikeService {
  private hikeRepository: HikeRepository;

  constructor(hikeRepository: HikeRepository) {
    this.hikeRepository = hikeRepository;
  }

  async getHikes(page: number, pageSize: number): Promise<any[]> {
    return this.hikeRepository.getHikes(page, pageSize);
  }

  async getHikeById(id: string): Promise<any[]> {
    return this.hikeRepository.getHikeById(id);
  }

  async searchHikes(keyword: string): Promise<any[]> {
    return this.hikeRepository.searchHikes(keyword);
  }
}
