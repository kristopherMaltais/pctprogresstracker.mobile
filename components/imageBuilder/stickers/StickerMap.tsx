import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Direction } from "@/models/direction";
import React from "react";
import { View } from "react-native";
import { StickerMapVertical } from "./StickerMapVertical";
import { StickerMapHorizontal } from "./StikerMapHorizontal";

export const StickerMap: React.FC = () => {
  const { selectedHike } = useUserChoices();
  return (
    <View>
      {selectedHike?.stickerMetadata.direction == Direction.VERTICAL ? (
        <StickerMapVertical />
      ) : (
        <StickerMapHorizontal />
      )}
    </View>
  );
};
