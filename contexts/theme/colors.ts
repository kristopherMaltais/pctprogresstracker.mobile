import { Theme } from "./models/theme";

const PALETTE = {
  midGrey: "#E8E8EE",
  grey: "#D5D5D5",
  red: "#F74850",
  darkBlack: "#18191A",
  lightBlack: "#242526",
  white: "#F2F2F2",
  primary: "#FFCD3C",
  darkWhite: "#E2E4E6",
  orange: "#FC5200",
};

export const LIGHT_THEME: Theme = {
  header: PALETTE.primary,
  primary: PALETTE.primary,
  background: PALETTE.white,
  secondaryBackground: PALETTE.white,
  tertiaryBackground: PALETTE.midGrey,
  text: PALETTE.lightBlack,
  pathColored: PALETTE.orange,
  path: PALETTE.grey,
  borders: PALETTE.white,
  error: PALETTE.red,
};

export const DARK_THEME: Theme = {
  header: PALETTE.lightBlack,
  primary: PALETTE.primary,
  background: PALETTE.darkBlack,
  secondaryBackground: PALETTE.lightBlack,
  tertiaryBackground: PALETTE.midGrey,
  text: PALETTE.darkWhite,
  pathColored: PALETTE.orange,
  path: PALETTE.grey,
  borders: PALETTE.white,
  error: PALETTE.red,
};
