import * as IntentLauncher from "expo-intent-launcher";
import * as Sharing from "expo-sharing";
import { Alert, Platform } from "react-native";

export async function shareToInstagramStory(imageUri: string) {
  try {
    if (Platform.OS === "ios") {
      // iOS: fallback using system share sheet (Instagram Story will appear as option)
      //   const canOpen = await Linking.canOpenURL("instagram-stories://share");
      //   if (!canOpen) {
      //     Alert.alert("Instagram not available", "Install Instagram to share.");
      //     return;
      //   }

      const isAvailable = await Sharing.isAvailableAsync();
      if (!isAvailable) {
        Alert.alert(
          "Sharing not available",
          "Cannot share images on this device."
        );
        return;
      }

      await Sharing.shareAsync(imageUri, {
        mimeType: "image/png",
        UTI: "public.png",
      });
    } else {
      // Android: share as STICKER to Instagram Story composer
      const stickerAssetUri = imageUri.replace("file://", "");

      await IntentLauncher.startActivityAsync(
        "com.instagram.share.ADD_TO_STORY",
        {
          type: "image/*",
          extras: {
            // send as sticker instead of background
            "com.instagram.sharedSticker.stickerImage": stickerAssetUri,
          },
        }
      );
    }
  } catch (error) {
    console.error("Error sharing to Instagram Story:", error);
    Alert.alert("Error", "Could not share to Instagram Story.");
  }
}
