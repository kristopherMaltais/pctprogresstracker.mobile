import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React, { useState } from "react";
import { Image, StyleSheet, TouchableOpacity, View } from "react-native";
import { ModalDistanceHikedInput } from "./ModalDistanceHikedInput";

type DistanceHikedInputProps = {
  show: boolean;
};

export const DistanceHikedInput: React.FC<DistanceHikedInputProps> = ({
  show,
}) => {
  const { distanceHiked, setDistanceHiked } = useUserChoices();
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [_distanceHiked, _setDistanceHiked] = useState(distanceHiked);

  return (
    <>
      {show && (
        <View>
          <TouchableOpacity
            style={styles.container}
            onPress={() => setIsModalVisible(true)}
          >
            <Image
              style={styles.image}
              source={require("../../../assets/images/shoe-prints.png")}
            />
          </TouchableOpacity>
        </View>
      )}
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
