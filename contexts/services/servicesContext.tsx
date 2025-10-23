import React from "react";
import { AxiosService } from "../../services/httpService/axiosService";
import { SecureStoreServiceImpl } from "../../services/secureStoreService/secureStoreServiceImpl";
import { HikeSnapServices } from "./models/hikeSnapServices";
import { initializeHikeModule } from "./modules/hikeModule";

const initialize = () => {
  const services: HikeSnapServices = {};

  initializeCommonServices(services);
  initializeHikeModule(services);

  return services;
};

const initializeCommonServices = (services: HikeSnapServices): void => {
  services["Common.SecureStoreService"] = new SecureStoreServiceImpl();
  services["Common.HttpService"] = new AxiosService();
};

export const ServicesContext = React.createContext<HikeSnapServices>(
  initialize()
);
