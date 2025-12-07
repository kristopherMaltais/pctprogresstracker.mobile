import { ShareMyHikeServices } from "@/contexts/services/models/shareMyHikeServices";
import { useContext } from "react";
import { ServicesContext } from "../contexts/services/servicesContext";

export const useService = (serviceName: string): any => {
  const services = useContext(ServicesContext) as ShareMyHikeServices;

  if (services[serviceName] === undefined) {
    throw `${serviceName} is not provided`;
  }

  return services[serviceName];
};
