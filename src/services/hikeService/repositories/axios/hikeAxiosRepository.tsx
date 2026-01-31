import { Hike } from "@/src/models/hike";
import { HikeWithItinary } from "@/src/models/hikeWithItinary";
import { HttpService } from "../../../httpService/httpService";
import { HikeRepository } from "../hikeRepository";

export class HikeAxiosRepository implements HikeRepository {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getHikes(): Promise<Hike[] | HikeWithItinary[]> {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kristopherMaltais/hike-data/refs/heads/main/hikes.json"
      );
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("FETCH ERROR:", error);
      throw error;
    }
  }
}
