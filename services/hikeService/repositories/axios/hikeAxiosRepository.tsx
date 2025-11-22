import { Hike } from "@/models/hike";
import { HttpService } from "../../../httpService/httpService";
import { HikeRepository } from "../hikeRepository";

export class HikeAxiosRepository implements HikeRepository {
  // private readonly controllerPath: string = "hikes/";
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getHikes(): Promise<Hike[]> {
    return await this.httpService
      .get(
        `https://raw.githubusercontent.com/kristopherMaltais/hike-data/refs/heads/main/hikes.json`
      )
      .then((response) => {
        console.log(response.data[0].id);
        return response.data;
      })
      .catch((error) => {
        throw error;
      });
  }
}
