import { Itinary } from "./itinary";

export type HikeWithItinary = {
  id: string;
  name: string;
  itinaries: Itinary[];
};
