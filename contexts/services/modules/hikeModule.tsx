import { HikeAxiosRepository } from "@/services/hikeService/repositories/axios/hikeAxiosRepository";
import { HikeServiceImpl } from "@/services/hikeService/services/hikeServiceImpl";
import { HikeSnapServices } from "../models/hikeSnapServices";

export const initializeHikeModule = (services: HikeSnapServices): void => {
  services["Hike.HikeRepository"] = new HikeAxiosRepository(
    services["Common.HttpService"]
  );
  services["Hike.HikeService"] = new HikeServiceImpl(
    services["Hike.HikeRepository"]
  );
};
