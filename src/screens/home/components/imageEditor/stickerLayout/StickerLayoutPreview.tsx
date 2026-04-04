import React from "react";
import { View } from "react-native";
import { Block } from "./Block";

interface StickerLayoutPreviewProps {
  stickerId: string;
  color: string;
}

export const StickerLayoutPreview: React.FC<StickerLayoutPreviewProps> = ({ stickerId, color }) => {
  switch (stickerId) {
    case "stickerFreeMapOnly":
      return (
        <View style={{ gap: 4, alignItems: "center" }}>
          <Block width={20} height={4} color={color} />
          <Block width={20} height={20} color={color} />
        </View>
      );

    case "stickerFree":
      return (
        <View style={{ flexDirection: "row", gap: 4, alignItems: "center" }}>
          <View style={{ gap: 4 }}>
            <Block width={10} height={4} color={color} />
            <Block width={10} height={4} color={color} />
            <Block width={10} height={4} color={color} />
          </View>
          <Block width={18} height={22} color={color} />
        </View>
      );

    case "stickerStats3":
      return (
        <View style={{ flexDirection: "column", gap: 4, alignItems: "center" }}>
          <Block width={20} height={4} color={color} />
          <View style={{ gap: 4, flexDirection: "row" }}>
            <Block width={12} height={12} color={color} />
            <Block width={12} height={12} color={color} />
            <Block width={12} height={12} color={color} />
          </View>
        </View>
      );

    case "stickerStats4":
      return (
        <View style={{ gap: 3 }}>
          <Block width={23} height={4} color={color} />
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
          </View>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
          </View>
        </View>
      );

    case "stickerStats6":
      return (
        <View style={{ gap: 3 }}>
          <View style={{ alignItems: "center" }}>
            <Block width={26} height={4} color={color} />
          </View>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
          </View>
          <View style={{ flexDirection: "row", gap: 3 }}>
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
            <Block width={10} height={10} color={color} />
          </View>
        </View>
      );

    case "stickerStats3Vertical":
      return (
        <View style={{ gap: 4 }}>
          <Block width={10} height={3} color={color} />
          <Block width={10} height={10} color={color} />
          <Block width={10} height={10} color={color} />
          <Block width={10} height={10} color={color} />
        </View>
      );

    case "stickerProgressBar":
      return (
        <View style={{ gap: 5, alignItems: "center" }}>
          <Block width={28} height={4} color={color} />
          <Block width={28} height={18} color={color} />
        </View>
      );

    default:
      return null;
  }
};
