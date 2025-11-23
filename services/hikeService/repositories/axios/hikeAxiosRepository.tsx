import { Hike } from "@/models/hike";
import { HttpService } from "../../../httpService/httpService";
import { HikeRepository } from "../hikeRepository";

export class HikeAxiosRepository implements HikeRepository {
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getHikes(): Promise<Hike[]> {
    try {
      const response = await fetch(
        "https://raw.githubusercontent.com/kristopherMaltais/hike-data/refs/heads/main/hikes.json"
      );
      const data = await response.json();
      console.log(data[0].id);
      console.log("testttt");
      return data;
    } catch (error) {
      console.log("FETCH ERROR:", error);
      throw error;
    }
  }
}
