import Constants from "expo-constants";
import * as SplashScreen from "expo-splash-screen";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { Platform } from "react-native";
import Purchases, {
  LOG_LEVEL,
  PurchasesOffering,
  PurchasesPackage,
} from "react-native-purchases";
import { useValidation } from "../validation/ValidationContextProvider";

interface PremiumProps {
  isPremiumUnlocked: boolean;
  unlockPremium: () => void;
  restorePremium: () => void;
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

const isDev = __DEV__;

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
  const { t } = useTranslation();
  const [currentOffering, setCurrentOffering] =
    useState<PurchasesOffering | null>(null);

  const [premimumState, setPremiumState] = useState<PremiumState>(
    PremiumState.PENDING
  );
  const [isPremiumModalVisible, setIsPremiumModalVisible] =
    useState<boolean>(false);
  const [isPremiumUnlocked, setIsPremiumUnlocked] = useState(false);
  const premiumStickerId = "premium_sticker";
  const { showSuccessModal, showErrorModal } = useValidation();

  useEffect(() => {
    if (!isPremiumModalVisible) {
      setPremiumState(PremiumState.PENDING);
    } else if (premimumState == PremiumState.SUCCESS) {
      setTimeout(() => {
        setIsPremiumModalVisible(false);
      }, 2000);
    }
  }, [isPremiumModalVisible, premimumState]);

  useEffect(() => {
    const setup = async () => {
      Purchases.setLogLevel(LOG_LEVEL.VERBOSE);

      const apiKey =
        Platform.OS === "ios"
          ? isDev
            ? Constants.expoConfig?.extra?.REVENUECAT_IOS_DEV
            : process.env.REVENUECAT_IOS_PROD
          : Constants.expoConfig?.extra?.REVENUECAT_ANDROID_DEV;

      if (apiKey) {
        Purchases.configure({ apiKey: apiKey });
      }

      const offerings = await Purchases.getOfferings();
      setCurrentOffering(offerings.current);

      const customerInfo = await Purchases.getCustomerInfo();
      await SplashScreen.hideAsync();
      const premiumEntitlement = customerInfo.entitlements.active["premium"];
      setIsPremiumUnlocked(!!premiumEntitlement?.isActive);
    };

    setup().catch(console.log);
  }, []);

  const unlockPremium = async () => {
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

  const restorePremium = async () => {
    try {
      const customerInfo = await Purchases.restorePurchases();
      const premiumEntitlement = customerInfo.entitlements.active["premium"];

      if (premiumEntitlement?.isActive) {
        setIsPremiumUnlocked(true);
        showSuccessModal(t("index:premium.restoreSuccess"));
      } else {
        showErrorModal(t("index:premium.restoreNoUserFound"));
      }
    } catch (e) {
      showErrorModal(t("index:premium.restoreError"));
    }
  };

  const contextValue: PremiumProps = {
    isPremiumUnlocked: isPremiumUnlocked,
    unlockPremium: unlockPremium,
    restorePremium: restorePremium,
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
