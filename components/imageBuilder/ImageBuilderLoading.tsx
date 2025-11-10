import { Image, StyleSheet, View } from "react-native";

export const ImageBuilderLoading: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/hikingProgressPlaceholder.gif")}
        style={styles.image}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: "90%",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "white",
  },
  image: {
    width: 150,
    height: 150,
  },
});
