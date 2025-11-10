import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import React from "react";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type ShowBordersSwitchProps = {
  show: boolean;
};

export const ShowBordersSwitch: React.FC<ShowBordersSwitchProps> = ({
  show,
}) => {
  const { showBorders, setShowBorders } = useUserChoices();
  const handleToggle = () => {
    setShowBorders(!showBorders);
  };

  return (
    <>
      {show && (
        <TouchableOpacity style={styles.container} onPress={handleToggle}>
          <Image
            style={styles.image}
            source={require("../../assets/images/map.png")}
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
