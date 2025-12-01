import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useEffect, useState } from "react";
import {
  Dimensions,
  Image,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { ImageBuilderPlaceholder } from "../ImageBuilderPlaceholder";
import { ImageBuilderSticker } from "../ImageBuilderSticker";
import { StickerLargeNoStats } from "../stickers/StickerLargeNoStats";
import { StickerMap } from "../stickers/StickerMap";
import { StickerStats } from "../stickers/StickerStats";
import { IndexIndicator } from "./IndexIndicator";

export const ImageBuilderSlider: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const { selectedHike, setIsStickerSelectedPremium } = useUserChoices();
  const { getIcon } = useTheme();

  const { height } = Dimensions.get("window");

  const stickers = [
    { isPremium: false, sticker: <StickerMap key="small" /> },
    { isPremium: true, sticker: <StickerStats key="stats" /> },
    { isPremium: true, sticker: <StickerLargeNoStats key="large" /> },
  ];

  useEffect(() => {
    setIsStickerSelectedPremium(stickers[activeIndex].isPremium);
  }, [activeIndex]);

  const handleSwipe = (direction: "left" | "right") => {
    setActiveIndex((prev) => {
      if (direction === "right") {
        return prev === stickers.length - 1 ? 0 : prev + 1;
      } else {
        return prev === 0 ? stickers.length - 1 : prev - 1;
      }
    });
  };

  return (
    <View style={{ ...styles.container, height: height * 0.8 }}>
      {selectedHike ? (
        <ImageBuilderSticker>
          {stickers[activeIndex].sticker}
        </ImageBuilderSticker>
      ) : (
        <ImageBuilderPlaceholder />
      )}
      {selectedHike && (
        <>
          <TouchableOpacity
            onPress={() => handleSwipe("left")}
            style={styles.left}
          >
            <Image
              style={{
                width: 10,
                height: 10,
                transform: [{ rotate: "180deg" }],
              }}
              source={getIcon("rightChevron")}
            />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => handleSwipe("right")}
            style={styles.right}
          >
            <Image
              style={{ width: 10, height: 10 }}
              source={getIcon("rightChevron")}
            />
          </TouchableOpacity>
        </>
      )}

      {selectedHike && (
        <IndexIndicator
          indexCount={stickers.length}
          activeIndex={activeIndex}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "relative",
    marginTop: -16,
    width: "100%",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    paddingHorizontal: 24,
  },
  left: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    left: 5,
    top: 300,
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
  right: {
    position: "absolute",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    right: 5,
    top: 300,
    backgroundColor: "white",
    height: 40,
    width: 40,
    borderRadius: 20,
  },
});
