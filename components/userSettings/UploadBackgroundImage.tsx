import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type UploadBackgroundImageProps = {};

export const UploadBackgroundImage: React.FC<
  UploadBackgroundImageProps
> = () => {
  const { setBackgroundImage } = useUserChoices();
  const { getIcon } = useTheme();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
      exif: true,
      base64: false,
    });

    if (!result.canceled) {
      // @ts-ignore
      setBackgroundImage(result.assets[0].uri);
    }
  };

  return (
    <TouchableOpacity style={styles.container} onPress={pickImage}>
      <Image style={styles.image} source={getIcon("image")} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  image: { width: 35, height: 35 },
});
