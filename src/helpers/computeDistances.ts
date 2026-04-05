export const MILE_KM_RATIO = 0.621371;

export const roundDistance = (distance: number, decimals = 2) => {
  const factor = Math.pow(10, decimals);
  return Math.round(distance * factor) / factor;
};

export const mileToKilometer = (distance: number) => distance / MILE_KM_RATIO;

export const kilometerToMile = (distance: number) => distance * MILE_KM_RATIO;
