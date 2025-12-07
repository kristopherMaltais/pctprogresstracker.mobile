import React, { FunctionComponent, useContext } from "react";
import { ShareMyHikeServices } from "./models/shareMyHikeServices";
import { ServicesContext } from "./servicesContext";

type ServicesContextProviderProps = {
  children: React.ReactNode;
};

export const ServicesContextProvider: FunctionComponent<
  ServicesContextProviderProps
> = (props: ServicesContextProviderProps) => {
  const Services = useContext(ServicesContext) as ShareMyHikeServices;

  return (
    <ServicesContext.Provider value={Services}>
      {props.children}
    </ServicesContext.Provider>
  );
};
