import { Hike } from "@/models/hike";
import { HttpService } from "../../../httpService/httpService";
import { HikeRepository } from "../hikeRepository";

export class HikeAxiosRepository implements HikeRepository {
  private readonly controllerPath: string = "hikes/";
  private httpService: HttpService;

  constructor(httpService: HttpService) {
    this.httpService = httpService;
  }

  async getHikes(): Promise<Hike[]> {
    // mock data
    const mockData: Hike[] = [
      {
        id: "1",
        totalDistanceKilometer: 4250,
        totalDistanceMile: 2650,
        name: "Pacific Crest Trail",
        pathLength: 495.98,
        path: "M218.368 956.5C219.592 958.158 201.868 949.5 201.868 927C201.867 904.5 202.754 899.35 200.368 891C197.982 882.65 197.367 881 192.367 876C187.367 871 185.231 870.738 173.367 867C161.504 863.262 126.867 848 127.867 830C127.729 818.702 130.322 818.248 139.867 813C149.413 807.752 157.367 795 154.867 771C150.276 714.717 137.72 691.083 129.867 669C108.923 610.563 92.1242 560.177 74.3673 528C56.6104 495.823 83.8673 457.5 57.3673 437C40.4005 427.862 36.3357 445.913 13.3673 419C1.48057 405.821 5.4644 370.62 6.36731 364.5C41.8475 370.762 55.1559 367.533 68.3673 351C118.74 277.979 127.048 241.9 133.867 179.5C135.003 168.731 147.021 160.68 155.867 147C164.714 133.32 156.051 124.892 165.867 112C196.472 84.739 193.413 83.7091 194.867 77C199.942 52.3633 197.519 47.4051 189.367 45C181.777 41.526 208.867 23 212.367 1",
      },
    ];

    // simuler un délai comme un vrai HTTP
    return new Promise((resolve) => {
      setTimeout(() => resolve(mockData), 2000);
    });
  }
}
