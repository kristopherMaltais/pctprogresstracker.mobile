import React, { createContext, useContext, useEffect, useState } from "react";
import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";

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
  const premiumStickerId = "premium_sticker";

  useEffect(() => {
    if (!isPremiumModalVisible) {
      setPremiumState(PremiumState.PENDING);
    }
  }, [isPremiumModalVisible]);

  useEffect(() => {
    const setup = async () => {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      const iosApiKey = "appl_UKeJQmzuWxMrqCWHCQznUmTJwXe";
      // const iosApiKey = "test_BhUMjJVhCzCqQYwysjvdZSiznmF";
      const androidApiKey = "test_BhUMjJVhCzCqQYwysjvdZSiznmF";

      if (Platform.OS === "ios") {
        Purchases.configure({ apiKey: iosApiKey });
      } else if (Platform.OS === "android") {
        Purchases.configure({ apiKey: androidApiKey });
      }

      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);

      const customerInfo = await Purchases.getCustomerInfo();
      const premiumEntitlement = customerInfo.entitlements.active["premium"];
      setIsPremiumUnlocked(!!premiumEntitlement?.isActive);
    };

    setup().catch(console.log);
  }, []);

  const buyPremiumSticker = async () => {
    setPremiumState(PremiumState.PROCESSING);
    if (!currentOffering) {
      console.log("No offering available");
      return;
    }

    const premiumPackage: PurchasesPackage | undefined =
      currentOffering.availablePackages.find(
        (p) => p.product.identifier === premiumStickerId
      );

    if (!premiumPackage) {
      console.log("Premium sticker package not found in offering");
      return;
    }

    Purchases.purchasePackage(premiumPackage)
      .then(() => Purchases.getCustomerInfo())
      .then((customerInfo) => {
        setPremiumState(PremiumState.SUCCESS);
        const premiumEntitlement = customerInfo.entitlements.active["premium"];
        setIsPremiumUnlocked(!!premiumEntitlement?.isActive);
      })
      .catch((e) => {
        setPremiumState(PremiumState.ERROR);
        console.log("Purchase failed or canceled", e);
      });
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
