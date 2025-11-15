import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalDistanceHikedInput } from "./ModalDistanceHikedInput";

type DistanceHikedInputProps = {};

export const DistanceHikedInput: React.FC<DistanceHikedInputProps> = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const { getIcon } = useTheme();

  return (
    <>
      <View>
        <TouchableOpacity
          style={styles.container}
          onPress={() => setIsModalVisible(true)}
        >
          <Image style={styles.image} source={getIcon("shoePrints")} />
        </TouchableOpacity>
      </View>
      <ModalDistanceHikedInput
        onClose={() => setIsModalVisible(false)}
        isVisible={isModalVisible}
      />
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
