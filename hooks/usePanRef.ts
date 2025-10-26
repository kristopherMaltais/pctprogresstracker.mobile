import React from "react";
import { Gesture, GestureType } from "react-native-gesture-handler";

export const usePanRef = () => {
  return React.useRef<GestureType>(Gesture.Pan());
};
