import { Image, StyleSheet, View } from "react-native";

export const HikingProgressPlaceholder: React.FC = () => {
  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/images/hikingProgressPlaceholder.gif")}
        style={{ width: 150, height: 150 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 500,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // backgroundColor: "black",
    borderRadius: 20,
    backgroundColor: "white", // 👈 Add this
    marginHorizontal: 16,
  },
});
