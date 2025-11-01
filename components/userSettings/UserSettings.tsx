import { useUserChoices } from "@/contexts/userChoicesProvider/UserChoicesContextProvider";
import { StyleSheet, View } from "react-native";
import { DistanceHikedInput } from "./DistanceHikedInput";
import { Download } from "./Download";
import { MeasurementUnitSwitch } from "./MeasurementUnitSwitch";
import { Share } from "./Share";
import { ShowBordersSwitch } from "./ShowBordersSwitch";
import { UploadBackgroundImage } from "./UploadBackgroundImage";

export const UserSettings: React.FC = () => {
  const { selectedProgressType } = useUserChoices();

  return (
    <View style={styles.container}>
      <UploadBackgroundImage />
      <ShowBordersSwitch />
      <MeasurementUnitSwitch />
      <DistanceHikedInput />
      <View style={styles.exporting}>
        <Download />
        <Share />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 32,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    borderRadius: 20,
    backgroundColor: "white", // 👈 Add this
    marginHorizontal: 16,
    padding: 16,
  },
  measurementUnit: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  exporting: {
    marginTop: 8,
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
