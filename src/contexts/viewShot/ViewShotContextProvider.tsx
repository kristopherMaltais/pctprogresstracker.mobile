import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import { View } from "react-native";
import ViewShot from "react-native-view-shot";

interface ViewShotProps {
  setViewShotTransparentBackgroud: (viewShot: ViewShot) => void;
  viewShotTransparentBackground: ViewShot | undefined;

  // ✅ Skia
  setSkiaViewRef: (ref: React.RefObject<View>) => void;
  skiaViewRef: React.RefObject<View> | undefined;
}

interface ViewShotProviderProps {
  children: React.ReactNode;
}

export const ViewShotContext = createContext<ViewShotProps | undefined>(undefined);

export const useViewShot = (): ViewShotProps => {
  const context = useContext(ViewShotContext);
  if (!context) throw new Error("useViewShot must be used within a ViewShotProvider");
  return context;
};

export const ViewShotContextProvider = ({ children }: ViewShotProviderProps) => {
  const [viewShotTransparentBackground, setViewShotTransparentBackgroundState] = useState<ViewShot>();
  const [skiaViewRef, setSkiaViewRefState] = useState<React.RefObject<View>>();

  const setViewShotTransparentBackgroud = useCallback(
    (ref: ViewShot) => setViewShotTransparentBackgroundState(ref),
    []
  );
  const setSkiaViewRef = useCallback((ref: React.RefObject<View>) => setSkiaViewRefState(ref), []);

  const contextValue: ViewShotProps = useMemo(
    () => ({
      setViewShotTransparentBackgroud,
      viewShotTransparentBackground,
      setSkiaViewRef,
      skiaViewRef,
    }),
    [viewShotTransparentBackground, skiaViewRef, setViewShotTransparentBackgroud, setSkiaViewRef]
  );

  return <ViewShotContext.Provider value={contextValue}>{children}</ViewShotContext.Provider>;
};
