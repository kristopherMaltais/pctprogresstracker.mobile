import { SecureStoreServiceImpl } from "@/src/services/secureStoreService/secureStoreServiceImpl";
import React from "react";
import { AxiosService } from "../../services/httpService/axiosService";
import { ShareMyHikeServices } from "./models/shareMyHikeServices";
import { initializeHikeModule } from "./modules/hikeModule";

const initialize = () => {
  const services: ShareMyHikeServices = {};

  initializeCommonServices(services);
  initializeHikeModule(services);

  return services;
};

const initializeCommonServices = (services: ShareMyHikeServices): void => {
  services["Common.HttpService"] = new AxiosService();
  services["Common.SecureStoreService"] = new SecureStoreServiceImpl();
};

export const ServicesContext = React.createContext<ShareMyHikeServices>(initialize());
