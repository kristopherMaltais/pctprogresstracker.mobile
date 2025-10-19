import { useContext } from "react";
import { ServicesContext } from "../contexts/services/servicesContext";
import { HikeSnapServices } from "../services/models/hikeSnapServices";

export const useService = (serviceName: string): any => {
  const services = useContext(ServicesContext) as HikeSnapServices;

  if (services[serviceName] === undefined) {
    throw `${serviceName} is not provided`;
  }

  return services[serviceName];
};
