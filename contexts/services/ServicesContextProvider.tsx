import React, { FunctionComponent, useContext } from "react";
import { HikeSnapServices } from "./models/hikeSnapServices";
import { ServicesContext } from "./servicesContext";

type ServicesContextProviderProps = {
  children: React.ReactNode;
};

export const ServicesContextProvider: FunctionComponent<
  ServicesContextProviderProps
> = (props: ServicesContextProviderProps) => {
  const Services = useContext(ServicesContext) as HikeSnapServices;

  return (
    <ServicesContext.Provider value={Services}>
      {props.children}
    </ServicesContext.Provider>
  );
};
