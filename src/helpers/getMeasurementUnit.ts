import { MeasurementUnit } from "@/src/models/measurementUnit";

export const getMeasurementUnit = (measurementUnit: MeasurementUnit) => {
  return measurementUnit == MeasurementUnit.KILOMETER ? "km" : "mi";
};
