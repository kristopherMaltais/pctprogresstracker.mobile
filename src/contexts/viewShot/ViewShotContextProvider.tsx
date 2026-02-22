import React, { createContext, useCallback, useContext, useMemo, useState } from "react";
import ViewShot from "react-native-view-shot";

interface ViewShotProps {
  setViewShot: (viewShot: ViewShot) => void;
  viewShot: ViewShot | undefined;
  setViewShotTransparentBackgroud: (viewShot: ViewShot) => void;
  viewShotTransparentBackground: ViewShot | undefined;
}

interface ViewShotProviderProps {
  children: React.ReactNode;
}

export const ViewShotContext = createContext<ViewShotProps | undefined>(undefined);

export const useViewShot = (): ViewShotProps => {
  const context = useContext(ViewShotContext);
  if (!context) {
    throw new Error("useViewShot must be used within a ViewShotProvider");
  }
  return context;
};

export const ViewShotContextProvider = ({ children }: ViewShotProviderProps) => {
  const [viewShot, setViewShotState] = useState<ViewShot>();
  const [viewShotTransparentBackground, setViewShotTransparentBackgroundState] = useState<ViewShot>();

  const setViewShot = useCallback((ref: ViewShot) => {
    setViewShotState(ref);
  }, []);

  const setViewShotTransparentBackgroud = useCallback((ref: ViewShot) => {
    setViewShotTransparentBackgroundState(ref);
  }, []);

  const contextValue: ViewShotProps = useMemo(
    () => ({
      setViewShot,
      viewShot,
      setViewShotTransparentBackgroud,
      viewShotTransparentBackground,
    }),
    [viewShot, viewShotTransparentBackground, setViewShot, setViewShotTransparentBackgroud]
  );

  return <ViewShotContext.Provider value={contextValue}>{children}</ViewShotContext.Provider>;
};
