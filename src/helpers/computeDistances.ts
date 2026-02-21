const MILE_KM_RATIO = 0.621371;

export const mileToKilometer = (distance: number) => {
  return Math.round(distance / MILE_KM_RATIO);
};

export const kilometerToMile = (distance: number) => {
  return Math.round(distance * MILE_KM_RATIO);
};
