import React, { createContext, useContext, useEffect, useState } from "react";
import { PurchasesOffering } from "react-native-purchases";

interface PremiumProps {
  isPremiumUnlocked: boolean;
  buyPremiumSticker: () => void;
  premiumState: PremiumState;
  isPremiumModalVisible: boolean;
  setIsPremiumModalVisible: (flag: boolean) => void;
}

interface PremiumProviderProps {
  children: React.ReactNode;
}

const APIKeys = {
  apple: "your_revenuecat_apple_api_key",
  google: "your_revenuecat_google_api_key",
};

export enum PremiumState {
  PROCESSING = "processing",
  SUCCESS = "success",
  ERROR = "error",
  PENDING = "pending",
}

export const PremiumContext = createContext<PremiumProps | undefined>(
  undefined
);

export const usePremium = (): PremiumProps => {
  const context = useContext(PremiumContext);
  if (!context) {
    throw new Error("usePremium must be used within a PremiumProvider");
  }
  return context;
};

export const PremiumContextProvider = ({ children }: PremiumProviderProps) => {
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);

  const [premimumState, setPremiumState] = useState<PremiumState>(
    PremiumState.PENDING
  );
  const [isPremiumModalVisible, setIsPremiumModalVisible] =
    useState<boolean>(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const premiumStickerId = "premium_sticker_1";

  useEffect(() => {
    if (!isPremiumModalVisible) {
      setPremiumState(PremiumState.PENDING);
    }
  }, [isPremiumModalVisible]);

  // useEffect(() => {
  //   const setup = async () => {
  //     if (Platform.OS == "android") {
  //       await Purchases.configure({ apiKey: APIKeys.google });
  //     } else {
  //       await Purchases.configure({ apiKey: APIKeys.apple });
  //     }

  //     const offerings = await Purchases.getOfferings();
  //     setCurrentOffering(offerings.current);

  //     const customerInfo = await Purchases.getCustomerInfo();
  //     setIsPremiumUnlocked(
  //       !!customerInfo.entitlements.active[premiumStickerId]
  //     );
  //   };

  //   setup().catch(console.log);
  // }, []);

  // const buyPremiumSticker = async () => {
  //   setIsProcessing(true);
  //   if (!currentOffering) {
  //     console.log("No offering available");
  //     return;
  //   }

  //   const premiumPackage: PurchasesPackage | undefined =
  //     currentOffering.availablePackages.find(
  //       (p) => p.product.identifier === premiumStickerId
  //     );

  //   if (!premiumPackage) {
  //     console.log("Premium sticker package not found in offering");
  //     return;
  //   }

  //   Purchases.purchasePackage(premiumPackage)
  //     .then(() => Purchases.getCustomerInfo())
  //     .then((customerInfo) => {
  //       setIsPremiumUnlocked(
  //         !!customerInfo.entitlements.active[premiumStickerId]
  //       );

  //       showSuccessModal("Achat reussi");
  //     })
  //     .catch((e) => {
  //       console.log("Purchase failed or canceled", e);
  //       showErrorModal("erreur lors de l'achat");
  //     });
  // };

  const buyPremiumSticker = () => {
    setPremiumState(PremiumState.PROCESSING);

    setTimeout(() => {
      setPremiumState(PremiumState.SUCCESS);
      setIsPremiumUnlocked(true);
    }, 1000);
  };

  const contextValue: PremiumProps = {
    isPremiumUnlocked: isPremiumUnlocked,
    buyPremiumSticker: buyPremiumSticker,
    premiumState: premimumState,
    isPremiumModalVisible: isPremiumModalVisible,
    setIsPremiumModalVisible: setIsPremiumModalVisible,
  };

  return (
    <PremiumContext.Provider value={contextValue}>
      {children}
    </PremiumContext.Provider>
  );
};
