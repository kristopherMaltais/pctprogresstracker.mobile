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
  darkWhite: "#E2E4E6",
};

export const PRIMARY_COLOR = {
  yellow: "#FFCD3C",
  orange: "#FF8D24",
  blue: "#4AACFF",
  purple: "#C492FF",
  green: "#49FFA0",
};

export const LIGHT_THEME: Theme = {
  primary: PRIMARY_COLOR.yellow,
  secondary: PALETTE.darkGrey,
  textPrimary: PALETTE.darkBlack,
  textSecondary: PALETTE.darkGrey,
  backgroundPrimary: PALETTE.white,
  backgroundSecondary: PALETTE.lightGrey,
  header: PRIMARY_COLOR.yellow,
  danger: PALETTE.red,
  info: PALETTE.blue,
  border: PALETTE.midGrey,
};

export const DARK_THEME: Theme = {
  primary: PRIMARY_COLOR.yellow,
  secondary: PALETTE.darkGrey,
  textPrimary: PALETTE.darkWhite,
  textSecondary: PALETTE.darkWhite,
  backgroundPrimary: PALETTE.darkBlack,
  backgroundSecondary: PALETTE.lightBlack,
  header: PALETTE.lightBlack,
  danger: PALETTE.red,
  info: PALETTE.blue,
  border: PALETTE.midGrey,
};
