import React, { createContext, useContext, useState } from "react";
import ViewShot from "react-native-view-shot";

interface ViewShotProps {
  setViewShot: (viewShot: ViewShot) => Promise<void>;
  viewShot: string;
}

interface ViewShotProviderProps {
  children: React.ReactNode;
}

export const ViewShotContext = createContext<ViewShotProps | undefined>(
  undefined
);

export const useViewShot = (): ViewShotProps => {
  const context = useContext(ViewShotContext);
  if (!context) {
    throw new Error("useViewShot must be used within a ViewShotProvider");
  }
  return context;
};

export const ViewShotContextProvider = ({
  children,
}: ViewShotProviderProps) => {
  const [viewShot, _setViewShot] = useState<string>("");

  const setViewShot = async (viewShot: ViewShot) => {
    if (viewShot.capture) {
      const uri = await viewShot.capture();
      _setViewShot(uri);
    }
  };

  const contextValue: ViewShotProps = {
    setViewShot: setViewShot,
    viewShot: viewShot,
  };

  return (
    <ViewShotContext.Provider value={contextValue}>
      {children}
    </ViewShotContext.Provider>
  );
};
