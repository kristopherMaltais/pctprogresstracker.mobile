import { GestureWrapper } from "@/components/common/GestureWrapper";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Direction } from "@/models/direction";
import React from "react";
import { View } from "react-native";
import { StickerMapVertical } from "./StickerMapVertical";
import { StickerMapHorizontal } from "./StikerMapHorizontal";

type StickerMapProps = {};
export const StickerMap: React.FC<StickerMapProps> = () => {
  const { selectedHike } = useUserChoices();
  return (
    <View>
      <GestureWrapper>
        {selectedHike?.stickerMetadata.direction == Direction.VERTICAL ? (
          <StickerMapVertical />
        ) : (
          <StickerMapHorizontal />
        )}
      </GestureWrapper>
    </View>
  );
};
