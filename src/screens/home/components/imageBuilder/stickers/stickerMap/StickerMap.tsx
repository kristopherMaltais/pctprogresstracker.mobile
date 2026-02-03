import { GestureWrapper } from "@/src/common/components/GestureWrapper";
import { useUserChoices } from "@/src/contexts/userChoicesProvider/UserChoicesContextProvider";
import { Direction } from "@/src/models/direction";
import React from "react";
import { View } from "react-native";
import { StickerMapVertical } from "./StickerMapVertical";
import { StickerMapHorizontal } from "./StikerMapHorizontal";

type StickerMapProps = {};
export const StickerMap: React.FC<StickerMapProps> = () => {
  console.log("sm");

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
