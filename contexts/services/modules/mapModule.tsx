import { MapAxiosRepository } from "@/services/mapService/repositories/axios/mapAxiosRepository";
import { MapServiceImpl } from "@/services/mapService/services/mapServiceImpl";
import { HikeSnapServices } from "../models/hikeSnapServices";

export const initializeMapModule = (services: HikeSnapServices): void => {
  services["Map.MapRepository"] = new MapAxiosRepository(
    services["Common.HttpService"]
  );
  services["Map.MapService"] = new MapServiceImpl(
    services["Map.MapRepository"]
  );
};
