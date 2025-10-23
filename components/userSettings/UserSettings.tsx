import { StyleSheet, Text, View } from "react-native";

export const UserSettings: React.FC = () => {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 300,
    marginBottom: 32,
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
