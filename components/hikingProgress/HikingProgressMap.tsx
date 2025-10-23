import { ImageBackground, StyleSheet } from "react-native";

export const HikingProgressMap: React.FC = () => {
  return (
    <ImageBackground
      source={require("@/assets/images/pctBackground.jpeg")} // your image here
      style={styles.container}
      imageStyle={{ borderRadius: 20 }}
      resizeMode="cover"
    ></ImageBackground>
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
  },
});
