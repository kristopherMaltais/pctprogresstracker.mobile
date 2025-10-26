import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import * as ImagePicker from "expo-image-picker";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

type Props = {};

export const UploadBackgroundImage: React.FC<Props> = () => {
  const { setBackgroundImage, selectedProgressType } = useUserChoices();

  // Open image picker
  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled) {
      // @ts-ignore
      setBackgroundImage(result.assets[0].uri); // Expo SDK 49+ returns assets
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Upload background</Text>
      <TouchableOpacity
        disabled={selectedProgressType != 0}
        style={styles.button}
        onPress={pickImage}
      >
        <Image
          style={{ width: 20, height: 20 }}
          source={require("../../assets/images/upload.png")}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 8,
  },
  button: {
    // backgroundColor: "#FFCD3C",
    borderColor: "#ccc",
    borderWidth: 1,
    width: 120,
    height: 44,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  label: {
    fontSize: 18,
  },
  inputRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  input: {
    width: 120,
    height: 44,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    textAlign: "center",
    fontSize: 18,
    fontWeight: "500",
    backgroundColor: "#fff",
  },
  maxText: {
    fontSize: 16,
    marginLeft: 8,
    color: "#666",
  },
});
