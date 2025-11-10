import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type UploadBackgroundImageProps = {
  show: boolean;
};

export const UploadBackgroundImage: React.FC<UploadBackgroundImageProps> = ({
  show,
}) => {
  const { setBackgroundImage } = useUserChoices();

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // @ts-ignore
      setBackgroundImage(result.assets[0].uri);
    }
  };

  return (
    <>
      {show && (
        <TouchableOpacity style={styles.container} onPress={pickImage}>
          <Image
            style={styles.image}
            source={require("../../assets/images/pictures.png")}
          />
        </TouchableOpacity>
      )}
    </>
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
