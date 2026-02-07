import * as StoreReview from "expo-store-review";

export const requestAppReview = async () => {
  try {
    const isAvailable = await StoreReview.isAvailableAsync();
    const hasAction = await StoreReview.hasAction();

    if (isAvailable && hasAction) {
      await StoreReview.requestReview();
    }
  } catch (error) {
    console.log("StoreReview Error:", error);
  }
};
