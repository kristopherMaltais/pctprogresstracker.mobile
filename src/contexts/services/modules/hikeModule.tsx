import { HikeAxiosRepository } from "@/src/services/hikeService/repositories/axios/hikeAxiosRepository";
import { HikeServiceImpl } from "@/src/services/hikeService/services/hikeServiceImpl";
import { ShareMyHikeServices } from "../models/shareMyHikeServices";

export const initializeHikeModule = (services: ShareMyHikeServices): void => {
  services["Hike.HikeRepository"] = new HikeAxiosRepository(services["Common.HttpService"]);
  services["Hike.HikeService"] = new HikeServiceImpl(services["Hike.HikeRepository"]);
};
