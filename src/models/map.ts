import { Orientation } from "./orientation";

export type Map = {
  id: string;
  path: string;
  totalDistance: number;
  name: string;
  width: number;
  height: number;
  orientation: Orientation;
  decorations: string[];
  description: string;
};
