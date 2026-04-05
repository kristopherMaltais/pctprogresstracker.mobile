import React from "react";
import { View } from "react-native";

interface BlockProps {
  width: number;
  height: number;
  color: string;
}

export const Block: React.FC<BlockProps> = ({ width, height, color }) => (
  <View style={{ width, height, borderRadius: 2, backgroundColor: color }} />
);
