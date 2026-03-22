import * as Sharing from "expo-sharing";
import ViewShot from "react-native-view-shot";

export const openNativeShareViewShot = async (viewShot: ViewShot | undefined) => {
  if (!viewShot) {
    return;
  }

  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      return;
    }

    await Sharing.shareAsync(await viewShot.capture!(), {
      dialogTitle: "Share your hiking progress",
    });
  } catch (err) {
    console.error("Share failed:", err);
  }
};

export const openNativeShareUri = async (uri: string) => {
  try {
    const isAvailable = await Sharing.isAvailableAsync();
    if (!isAvailable) {
      return;
    }

    await Sharing.shareAsync(uri, {
      dialogTitle: "Share your hiking progress",
    });
  } catch (err) {
    console.error("Share failed:", err);
  }
};
