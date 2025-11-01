import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { ImageBackground, StyleSheet } from "react-native";

type HikingProgressStickerProps = {
  children: React.ReactNode;
};

export const ImageBuilderSticker: React.FC<HikingProgressStickerProps> = ({
  children,
}) => {
  const { backgroundImage } = useUserChoices();

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.container}
      imageStyle={{ borderRadius: 20 }}
      resizeMode="cover"
    >
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
    overflow: "hidden",
    backgroundColor: "#E0E0E0",
  },
});
