import { Theme } from "./models/theme";

const PALETTE = {
  lightGrey: "#F9FBFC",
  midGrey: "#E8E8EE",
  darkGrey: "grey",
  darkBlue: "#051C60",
  red: "#F74850",
  blue: "#3B71F3",
  darkBlack: "#18191A",
  lightBlack: "#242526",
  white: "#F2F2F2",
  primary: "#FFCD3C",
  darkWhite: "#E2E4E6",
};

export const LIGHT_THEME: Theme = {
  header: PALETTE.primary,
  primary: PALETTE.primary,
  background: PALETTE.white,
  secondaryBackground: PALETTE.white,
  text: PALETTE.lightBlack,
};

export const DARK_THEME: Theme = {
  header: PALETTE.lightBlack,
  primary: PALETTE.primary,
  background: PALETTE.darkBlack,
  secondaryBackground: PALETTE.lightBlack,
  text: PALETTE.darkWhite,
};
