import { SecureStoreServiceImpl } from "@/src/services/secureStoreService/secureStoreServiceImpl";
import React from "react";
import { ShareMyHikeServices } from "./models/shareMyHikeServices";
import { initializeHikeModule } from "./modules/hikeModule";
import { initializeStatisticModule } from "./modules/statisticModule";

const initialize = () => {
  const services: ShareMyHikeServices = {};

  initializeCommonServices(services);
  initializeHikeModule(services);
  initializeStatisticModule(services);

  return services;
};

const initializeCommonServices = (services: ShareMyHikeServices): void => {
  services["Common.SecureStoreService"] = new SecureStoreServiceImpl();
};

export const ServicesContext = React.createContext<ShareMyHikeServices>(initialize());
