import { useTheme } from "@/contexts/theme/ThemeContextProvider";
import { useValidation } from "@/contexts/validation/ValidationContextProvider";
import { useViewShot } from "@/contexts/viewShot/ViewShotContextProvider";
import * as Sharing from "expo-sharing";
import { t } from "i18next";
import { Image, StyleSheet, TouchableOpacity } from "react-native";

type ShareProps = {};

export const Share: React.FC<ShareProps> = () => {
  const { viewShot } = useViewShot();
  const { getIcon } = useTheme();
  const { showErrorModal } = useValidation();

  const share = async () => {
    if (!viewShot) {
      showErrorModal(t("index:errors.share"));
      return;
    }

    try {
      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        showErrorModal(t("index:errors.share"));
        return;
      }

      await Sharing.shareAsync(await viewShot.capture!(), {
        dialogTitle: "Share your hiking progress",
      });
    } catch (err) {
      console.error("Share failed:", err);
      showErrorModal(t("index:errors.share"));
    }
  };
  return (
    <TouchableOpacity style={styles.container} onPress={share}>
      <Image style={styles.image} source={getIcon("share")} />
    </TouchableOpacity>
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
