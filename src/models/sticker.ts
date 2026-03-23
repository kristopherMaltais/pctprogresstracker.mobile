import { Orientation } from "./orientation";

export type Sticker = {
  id: string;
  path: string;
  distance: number;
  width: number;
  height: number;
  orientation: Orientation;
  decorations: string[];
};
