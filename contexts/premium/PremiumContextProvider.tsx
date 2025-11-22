import React, { createContext, useContext, useState } from "react";
import { PurchasesOffering } from "react-native-purchases";

interface PremiumProps {
  isPremiumUnlocked: boolean;
  buyPremiumSticker: () => void;
}

interface PremiumProviderProps {
  children: React.ReactNode;
}

const APIKeys = {
  apple: "your_revenuecat_apple_api_key",
  google: "your_revenuecat_google_api_key",
};

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

  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);

  const premiumStickerId = "premium_sticker_1";

  // To be initialize when Apple will review my in app purchase
  //   useEffect(() => {
  //     const setup = async () => {
  //       if (Platform.OS == "android") {
  //         await Purchases.configure({ apiKey: APIKeys.google });
  //       } else {
  //         await Purchases.configure({ apiKey: APIKeys.apple });
  //       }

  //       const offerings = await Purchases.getOfferings();
  //       setCurrentOffering(offerings.current);

  //       // Vérifier si l’utilisateur possède déjà le sticker
  //       const customerInfo = await Purchases.getCustomerInfo();
  //       setIsPremiumUnlocked(
  //         !!customerInfo.entitlements.active[premiumStickerId]
  //       );
  //     };

  //     setup().catch(console.log);
  //   }, []);

  //   const buyPremiumSticker = async () => {
  //     if (!currentOffering) {
  //       console.log("No offering available");
  //       return;
  //     }

  //     const premiumPackage: PurchasesPackage | undefined =
  //       currentOffering.availablePackages.find(
  //         (p) => p.product.identifier === premiumStickerId
  //       );

  //     if (!premiumPackage) {
  //       console.log("Premium sticker package not found in offering");
  //       return;
  //     }

  //     try {
  //       await Purchases.purchasePackage(premiumPackage);
  //       const customerInfo = await Purchases.getCustomerInfo();
  //       setIsPremiumUnlocked(
  //         !!customerInfo.entitlements.active[premiumStickerId]
  //       );
  //     } catch (e) {
  //       console.log("Purchase failed or canceled", e);
  //     }
  //   };

  const buyPremiumSticker = () => {
    setIsPremiumUnlocked(true);
  };

  const contextValue: PremiumProps = {
    isPremiumUnlocked,
    buyPremiumSticker,
  };

  return (
    <PremiumContext.Provider value={contextValue}>
      {children}
    </PremiumContext.Provider>
  );
};
