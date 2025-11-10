import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as Sharing from "expo-sharing";
import { Alert, Image, StyleSheet, TouchableOpacity } from "react-native";

type ShareProps = {
  show: boolean;
};

export const Share: React.FC<ShareProps> = ({ show }) => {
  const { viewShot } = useViewShot();

  const share = async () => {
    if (!viewShot) {
      Alert.alert("Error", "No image available to share.");
      return;
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert("Sharing not available on this device");
        return;
      }

      await Sharing.shareAsync(await viewShot.capture!(), {
        dialogTitle: "Share your hiking progress",
      });
    } catch (err) {
      console.error("Share failed:", err);
      Alert.alert("Error", "Failed to share image");
    }
  };
  return (
    <>
      {show && (
        <TouchableOpacity style={styles.container} onPress={share}>
          <Image
            style={styles.image}
            source={require("../../assets/images/sendTest.png")}
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
